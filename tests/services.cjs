// Executes the actual compiled Firebase bundle. All API responses are synthetic.
const {JSDOM,VirtualConsole}=require('jsdom');
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const consoleSink=new VirtualConsole();
const dom=new JSDOM('<!doctype html><body></body>',{url:'https://integration-test.invalid',runScripts:'outside-only',virtualConsole:consoleSink});
const w=dom.window,ctx=dom.getInternalVMContext();
const seen=[];let passed=0,mode='success',lookupVerified=true;
const jwt=(payload)=>[Buffer.from('{"alg":"none"}').toString('base64url'),Buffer.from(JSON.stringify(payload)).toString('base64url'),'test-signature'].join('.');
const now=Math.floor(Date.now()/1000);
const idToken=jwt({sub:'test-admin',user_id:'test-admin',aud:'demo-mpp-tests',iss:'https://securetoken.google.com/demo-mpp-tests',iat:now,exp:now+3600,auth_time:now,email:'admin@example.test'});
const checkToken=jwt({sub:'test-app',iat:now,exp:now+3600});
Object.assign(w,{Headers,Request,Response,TextEncoder,TextDecoder});
// Test-only token; never registered with or sent to a real Firebase project.
w.FIREBASE_APPCHECK_DEBUG_TOKEN='synthetic-test-token';
w.fetch=async(url,options={})=>{
  url=String(url);seen.push({url,options});
  if(url.includes(':exchangeDebugToken'))return Response.json({token:checkToken,ttl:'3600s'});
  if(url.includes('accounts:signInWithPassword'))return Response.json({idToken,refreshToken:'synthetic-refresh',expiresIn:'3600',localId:'test-admin',email:'admin@example.test',registered:true});
  if(url.includes('accounts:lookup'))return Response.json({users:[{localId:'test-admin',email:'admin@example.test',emailVerified:lookupVerified,createdAt:String(Date.now()),lastLoginAt:String(Date.now()),providerUserInfo:[{providerId:'password',email:'admin@example.test'}]}]});
  if(url.includes('accounts:sendOobCode'))return Response.json({email:'admin@example.test'});
  if(url.includes('accounts:update'))return Response.json({localId:'test-admin',email:'admin@example.test',displayName:JSON.parse(options.body).displayName});
  if(url.includes('securetoken.googleapis.com'))return Response.json({access_token:idToken,expires_in:'3600',refresh_token:'synthetic-refresh',token_type:'Bearer',user_id:'test-admin',project_id:'demo-mpp-tests'});
  if(url.includes(':generateContent')){
    if(mode==='quota')return Response.json({error:{code:429,message:'quota exhausted',status:'RESOURCE_EXHAUSTED'}},{status:429});
    const text=mode==='invalid'?'not JSON':JSON.stringify(['Caption one','Caption two','Caption three']);
    return Response.json({candidates:[{content:{role:'model',parts:[{text}]},finishReason:'STOP'}]});
  }
  throw new Error('Unexpected network request blocked: '+url);
};
function check(label,fn){fn();passed++;console.log('PASS',label)}
async function main(){
 vm.runInContext(fs.readFileSync('public/vendor/firebase-services.js','utf8'),ctx);
 w.KIDSWEAR_INTEGRATIONS={appCheckSiteKey:'synthetic-site-key',ai:{enabled:true,model:'gemini-3.5-flash-lite'}};
 w.firebase.initializeApp({apiKey:'synthetic-api-key',projectId:'demo-mpp-tests',appId:'1:123456789:web:synthetic',authDomain:'demo-mpp-tests.firebaseapp.com'});
 w.KidsWearServices.configure();
 const auth=w.firebase.auth();
 await auth.signInWithEmailAndPassword('admin@example.test','synthetic-password');
 check('bundled Auth signs in through mocked endpoint',()=>assert.equal(auth.currentUser.uid,'test-admin'));
 check('Auth and Firestore share the default app',()=>assert.equal(auth.app,w.firebase.firestore().app));
 lookupVerified=false;await auth.currentUser.reload();
 check('bundled user reload reads unverified status',()=>assert.equal(auth.currentUser.emailVerified,false));
 await auth.currentUser.sendEmailVerification();
 check('bundled SDK sends a verification-email request',()=>{const request=seen.find(x=>x.url.includes('accounts:sendOobCode'));assert.equal(JSON.parse(request.options.body).requestType,'VERIFY_EMAIL');assert.equal(JSON.parse(request.options.body).idToken,idToken)});
 lookupVerified=true;await auth.currentUser.reload();
 check('bundled user reload reads completed verification',()=>assert.equal(auth.currentUser.emailVerified,true));
 await auth.currentUser.getIdToken(true);
 check('bundled SDK can force a fresh authentication token',()=>assert(seen.some(x=>x.url.includes('securetoken.googleapis.com'))));
 await auth.currentUser.updateProfile({displayName:'Owner'});
 check('bundled SDK saves the owner display name',()=>assert.equal(auth.currentUser.displayName,'Owner'));
 const captions=await w.KidsWearServices.generateCaptions({name:'Test collection'},new w.AbortController().signal);
 check('real AI SDK parses three captions',()=>assert.equal(JSON.stringify(captions),'["Caption one","Caption two","Caption three"]'));
 const request=seen.find(x=>x.url.includes(':generateContent'));
 check('AI request carries the same Auth and App Check tokens',()=>{
   assert.equal(request.options.headers.get('Authorization'),'Firebase '+idToken);
   assert.equal(request.options.headers.get('X-Firebase-AppCheck'),checkToken);
 });
 check('AI uses Google Developer backend and JSON schema',()=>{
   assert.equal(new URL(request.url).pathname,'/v1beta/projects/demo-mpp-tests/models/gemini-3.5-flash-lite:generateContent');
   const body=JSON.parse(request.options.body);assert.equal(body.generationConfig.responseMimeType,'application/json');assert.equal(body.generationConfig.responseSchema.minItems,3);
 });
 mode='invalid';await assert.rejects(()=>w.KidsWearServices.generateCaptions({name:'Test'}),/usable captions/);check('malformed model output rejected',()=>{});
 mode='quota';await assert.rejects(()=>w.KidsWearServices.generateCaptions({name:'Test'}),/quota|429/i);check('provider quota errors propagate without paid fallback',()=>{});
 await auth.signOut();await assert.rejects(()=>w.KidsWearServices.generateCaptions({name:'Test'}),/Sign in/);check('signed-out AI use rejected before request',()=>{});
 console.log('TOTAL',passed,'bundled SDK checks passed');
}
const timeout=setTimeout(()=>{console.error('SDK test timed out');dom.window.close();process.exit(1)},15000);
main().then(()=>{clearTimeout(timeout);dom.window.close()}).catch(e=>{console.error(e);clearTimeout(timeout);dom.window.close();process.exitCode=1});
