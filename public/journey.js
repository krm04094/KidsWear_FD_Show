/* Collection workspaces: shared by activated studio members. */
const STAGES=['Inspiration','Boards','Sketches','Rendering','Fabric sourcing','Final collection','Ramp walk'];
const JKINDS=['Design evidence','Production log','Interview','Storyboard','Event coverage','Runway look'];
let journeyId='',journeyRows=[],journeyOff=null,journeyFilter='All',journeySearch='';
const jp=document.createElement('section');jp.id='page-journey';jp.className='page';
$('#page-dashboard').parentNode.appendChild(jp);
TITLES.journey='Kids Wear FD Show';RENDER.journey=renderJourney;
function journeyReset(){if(journeyOff)journeyOff();journeyOff=null;journeyId='';journeyRows=[];const p=$('#page-journey');if(p)p.innerHTML='';$('#journeyPrint')?.remove();}
const canProject=()=>['admin','designer','documenter','coordinator'].includes(user?.role);
const canReview=()=>['admin','faculty'].includes(user?.role);
const canEntry=()=>['admin','designer','documenter','coordinator'].includes(user?.role);
const projectCurrent=()=>S.projects?.find(p=>p.id===journeyId);
function deleteProjectButton(p){return isAdmin()?`<button class="btn jdanger" onclick="requestDeleteProject(${inlineId(p.id)})">${p.deleting?'Resume deletion':'Delete collection'}</button>`:'';}
function jbutton(label,fn){return `<button class="btn" onclick="${fn}">${esc(label)}</button>`;}
function jfield(label,name,value='',type='text',max=200,required=false){return `<label class="jf">${esc(label)}<input class="f-in" type="${type}" name="${name}" ${['cover','image'].includes(name)?'data-cloud-image':''} maxlength="${max}" ${required?'required':''} value="${esc(value)}"></label>`;}
function jarea(label,name,value='',max=5000){return `<label class="jf full">${esc(label)}<textarea class="f-in" name="${name}" maxlength="${max}" rows="4">${esc(value)}</textarea></label>`;}
function jselect(label,name,values,value){return `<label class="jf">${label}<select class="f-in" name="${name}">${values.map(v=>`<option ${v===value?'selected':''}>${esc(v)}</option>`).join('')}</select></label>`;}
function jurl(s){if(!s)return true;try{const u=new URL(s);return u.protocol==='https:'&&!u.username&&!u.password;}catch{return false;}}
function jmedia(r){return `${r.image?`<img class="jimage" loading="lazy" src="${esc(r.image)}" alt="${esc(r.title)}" onerror="this.hidden=true">`:''}${r.link?`<p><a href="${esc(r.link)}" target="_blank" rel="noopener noreferrer">Open video / source ↗</a></p>`:''}`;}
function journeyProgress(rows){return Math.round(STAGES.filter(stage=>rows.some(r=>r.stage===stage&&r.kind==='Design evidence'&&r.status==='approved')).length/STAGES.length*100);}
function renderJourney(){
 const projects=S.projects||[],p=projectCurrent();
 if(!journeyId){
 const list=projects.filter(p=>(p.title+' '+p.theme).toLowerCase().includes(journeySearch.toLowerCase()));
 jp.innerHTML=`<div class="jhero"><div><span class="jeyebrow">FD × BAJMC · SHARED STUDIO</span><h1>Small outfits.<br>Big creative journeys.</h1><p>Follow every collection from the first idea to the final walk.</p></div>${canProject()?jbutton('＋ New collection','editProject()'):''}</div><div class="jtoolbar"><label>Find a collection <input class="f-in" id="jsearch" value="${esc(journeySearch)}" placeholder="Title or theme"></label><span>${projects.length} collections · active members only</span></div><div class="jgrid">${list.map(p=>`<article class="jcard">${p.cover?`<img class="jcover" src="${esc(p.cover)}" alt="" loading="lazy" onerror="this.hidden=true">`:'<div class="jplaceholder">From idea to runway</div>'}<div class="jpad"><span class="jeyebrow">${esc(p.season)} · ${p.deleting?'DELETION PAUSED / IN PROGRESS':p.archived?'ARCHIVED':'IN PROGRESS'}</span><h2>${esc(p.title)}</h2><p>${esc(p.theme)}</p><p class="jmuted">${esc(p.team)}</p><div class="jactions">${jbutton('Open collection',`openJourney(${inlineId(p.id)})`)} ${deleteProjectButton(p)}</div></div></article>`).join('')||(canProject()?'<div class="jempty">No collections yet. Select New collection above to begin.</div>':'<div class="jempty">No collections to view yet. A Designer, BAJMC Documenter or Coordinator can create the first collection.</div>')}</div>`;
 $('#jsearch').onchange=e=>{journeySearch=e.target.value;renderJourney();};return;
 }
 if(!p){jp.innerHTML=`<div class="jempty"><p>This collection is no longer available.</p>${jbutton('All collections','closeJourney()')}</div>`;return;}
 const progress=journeyProgress(journeyRows),rows=journeyRows.filter(r=>journeyFilter==='All'||r.stage===journeyFilter).sort((a,b)=>a.kind==='Runway look'&&b.kind==='Runway look'?a.order-b.order:a.date.localeCompare(b.date));
 jp.innerHTML=`<div class="jtoolbar">${jbutton('← All collections','closeJourney()')}<div>${(!p.deleting&&canProject()&&(p.ownerId===user.uid||isAdmin()))?jbutton('Edit collection','editProject(journeyId)'):''} ${!p.deleting?jbutton('Print / save portfolio PDF','printJourney()'):''} ${deleteProjectButton(p)}</div></div><div class="jhero"><div><span class="jeyebrow">${esc(p.season)} · ${p.deleting?'DELETION PAUSED / IN PROGRESS':p.archived?'ARCHIVED':'COLLECTION JOURNEY'}</span><h1>${esc(p.title)}</h1><h3>${esc(p.theme)}</h3><p class="jprose">${esc(p.concept)}</p><p>Team: ${esc(p.team)}</p></div><div class="jprogress"><strong>${progress}%</strong><span>Approved design stages</span><progress value="${progress}" max="100"></progress></div></div><div class="jtoolbar"><p>Record the design. Tell its story. Prepare the show.</p>${canEntry()&&!p.archived&&!p.deleting?jbutton('＋ Add journey entry','editJourneyEntry()'):''}</div><div class="jstages">${['All',...STAGES].map(stage=>`<button class="${journeyFilter===stage?'selected':''}" onclick="journeyFilter=${inlineId(stage)};renderJourney()">${esc(stage)}${stage!=='All'&&journeyRows.some(r=>r.stage===stage&&r.kind==='Design evidence'&&r.status==='approved')?' ✓':''}</button>`).join('')}</div>${p.deleting?'<p class="jempty" role="status">Deletion has started. Editing is locked. The administrator can resume deletion if it was interrupted.</p>':''}<p class="jmuted">Progress counts stages with approved design evidence. Logs and runway assignments enrich the story without inflating completion.</p><div class="jgrid">${rows.map(r=>journeyCard(r)).join('')||'<div class="jempty">This chapter is waiting for its first entry. Add evidence, a production log, interview, storyboard or runway look.</div>'}</div>`;
}
function journeyCard(r){const editable=!projectCurrent()?.archived&&!projectCurrent()?.deleting&&canEntry()&&(isAdmin()||r.ownerId===user.uid)&&r.status!=='approved';return `<article class="jcard"><div class="jpad"><span class="jeyebrow">${esc(r.stage)} · ${esc(r.kind)}</span><h2>${esc(r.title)}</h2><p class="jmuted">${esc(r.date)} · ${esc(r.author)} · ${esc(r.status)}</p>${jmedia(r)}<p class="jprose">${esc(r.notes)}</p>${r.kind==='Runway look'?`<p><b>Walk ${r.order}:</b> ${esc(r.outfit)} · Model stage name: ${esc(r.model)}</p><p>Music / lighting: ${esc(r.cues)}</p>`:''}${r.feedback?`<blockquote>${esc(r.feedback)}<br><small>Reviewer: ${esc(r.reviewer)}</small></blockquote>`:''}<div class="jactions">${editable?jbutton('Edit',`editJourneyEntry(${inlineId(r.id)})`):''}${canReview()&&(isAdmin()||r.ownerId!==user.uid)&&!projectCurrent()?.archived&&!projectCurrent()?.deleting?jbutton('Review',`reviewJourneyEntry(${inlineId(r.id)})`):''}${editable?jbutton('Delete',`deleteJourneyEntry(${inlineId(r.id)})`):''}</div></div></article>`;}
function openJourney(id){if(modalBusy)return; if(journeyOff)journeyOff();journeyId=id;journeyRows=[];journeyFilter='All';const version=authVersion;journeyOff=fs.collection('projects').doc(id).collection('entries').onSnapshot(s=>{if(version!==authVersion||journeyId!==id)return;journeyRows=s.docs.map(d=>({...d.data(),id:d.id}));if(current==='journey')renderJourney();},e=>toast(errorText(e),'⚠️'));renderJourney();}
function closeJourney(){if(journeyOff)journeyOff();journeyOff=null;journeyId='';journeyRows=[];renderJourney();}
function editProject(id){const p=(S.projects||[]).find(x=>x.id===id);if(!canProject()||p?.deleting||(p&&p.ownerId!==user.uid&&!isAdmin()))return;
 openModal(p?'Edit collection':'Start a collection',`<div class="form-grid">${jfield('Collection title','title',p?.title,'text',120,true)}${jfield('Theme','theme',p?.theme,'text',200,true)}${jfield('Season / year','season',p?.season,'text',80)}${jfield('Team credits','team',p?.team,'text',500)}${jfield('Cover image HTTPS URL','cover',p?.cover,'url',2048)}${jarea('Concept and collection goals','concept',p?.concept)}${p?`<label><input type="checkbox" name="archived" ${p.archived?'checked':''}> Archive (locks entries until reopened)</label>`:''}</div>`,async(d,form)=>{
 const data={title:clean(d.title),theme:clean(d.theme),season:clean(d.season),team:clean(d.team),cover:clean(d.cover),concept:clean(d.concept),archived:!!form.querySelector('[name=archived]')?.checked};if(!data.title||!data.theme||!jurl(data.cover)){toast('Enter a title, theme and valid HTTPS cover URL','⚠️');return false;}
 if(p)await fs.doc('projects/'+p.id).update(data);else await fs.collection('projects').add({...data,ownerId:user.uid,createdAt:new Date().toISOString()});toast('Collection saved');return true;
 });
}
function editJourneyEntry(id){const p=projectCurrent(),r=journeyRows.find(x=>x.id===id);if(!p||p.archived||p.deleting||!canEntry()||(r&&(r.status==='approved'||(!isAdmin()&&r.ownerId!==user.uid))))return;
 openModal(r?'Edit journey entry':'Add to the collection story',`<div class="form-grid">${jfield('Entry title','title',r?.title,'text',150,true)}${jselect('Design stage','stage',STAGES,r?.stage)}${jselect('Entry type','kind',JKINDS,r?.kind)}${jfield('Date','date',r?.date||new Date().toISOString().slice(0,10),'date',10,true)}${jarea('Evidence / production log / interview / storyboard','notes',r?.notes)}${jfield('Image HTTPS URL','image',r?.image,'url',2048)}${jfield('Video or source HTTPS link','link',r?.link,'url',2048)}<p class="full jmuted">For runway looks, complete the fields below. Use a model’s stage name; keep guardian/contact details in restricted Events & Ops.</p>${jfield('Outfit name / reference','outfit',r?.outfit,'text',150)}${jfield('Model stage name','model',r?.model,'text',100)}${jfield('Walking order (1–999)','order',r?.order||1,'number',3)}${jfield('Music / lighting cues','cues',r?.cues,'text',500)}</div>`,async d=>{
 const data={};for(const k of ['title','stage','kind','date','notes','image','link','outfit','model','cues'])data[k]=clean(d[k]);data.order=Number(d.order);if(!data.title||!data.notes||!jurl(data.image)||!jurl(data.link)||!Number.isInteger(data.order)||data.order<1||data.order>999){toast('Add a title, notes, valid HTTPS links and walking order 1–999','⚠️');return false;}if(data.kind==='Runway look'&&(!data.outfit||!data.model||data.stage!=='Ramp walk')){toast('Runway looks need an outfit, model stage name and Ramp walk stage','⚠️');return false;}
 const ref=fs.collection('projects').doc(p.id).collection('entries');if(r)await ref.doc(r.id).update({...data,status:'pending',feedback:'',reviewer:''});else await ref.add({...data,ownerId:user.uid,author:user.name,createdAt:new Date().toISOString(),status:'pending',feedback:'',reviewer:''});toast('Entry submitted for review');return true;
 });
}
function reviewJourneyEntry(id){const r=journeyRows.find(x=>x.id===id);if(!r||!canReview()||(!isAdmin()&&r.ownerId===user.uid)||projectCurrent()?.archived||projectCurrent()?.deleting)return;
 openModal('Review — '+r.title,jselect('Decision','status',['pending','approved','rejected'],r.status)+jarea('Feedback','feedback',r.feedback,2000),async d=>{await fs.doc(`projects/${journeyId}/entries/${id}`).update({status:d.status,feedback:clean(d.feedback),reviewer:user.name});toast('Review saved');return true;});
}
async function deleteJourneyEntry(id){if(!confirm('Permanently delete this journey entry?'))return;try{await fs.doc(`projects/${journeyId}/entries/${id}`).delete();toast('Entry deleted');}catch(e){toast(errorText(e),'⚠️');}}
function portfolioHTML(p,rows){return `<h1>${esc(p.title)}</h1><h2>${esc(p.theme)}</h2><p>${esc(p.season)} · Team: ${esc(p.team)}</p><p class="jprose">${esc(p.concept)}</p><p>Approved design stages: ${journeyProgress(rows)}% · Generated ${new Date().toLocaleDateString()}</p>${STAGES.map(stage=>`<section><h2>${esc(stage)}</h2>${rows.filter(r=>r.stage===stage).sort((a,b)=>a.kind==='Runway look'&&b.kind==='Runway look'?a.order-b.order:a.date.localeCompare(b.date)).map(r=>`<article><h3>${esc(r.title)} — ${esc(r.kind)}</h3><p>${esc(r.date)} · ${esc(r.author)} · ${esc(r.status)}</p>${jmedia(r)}<p class="jprose">${esc(r.notes)}</p>${r.kind==='Runway look'?`<p>Walk ${r.order}: ${esc(r.outfit)} · ${esc(r.model)} · ${esc(r.cues)}</p>`:''}${r.feedback?`<p>Review (${esc(r.reviewer)}): ${esc(r.feedback)}</p>`:''}</article>`).join('')||'<p>No documentation recorded.</p>'}</section>`).join('')}`;}
function printJourney(){const p=projectCurrent();if(!p||p.deleting)return;let out=$('#journeyPrint');if(!out){out=document.createElement('div');out.id='journeyPrint';document.body.appendChild(out);}out.innerHTML=portfolioHTML(p,journeyRows);document.body.classList.add('printingJourney');window.print();document.body.classList.remove('printingJourney');}

function requestDeleteProject(id){
 const p=(S.projects||[]).find(x=>x.id===id);if(!p||!isAdmin()||modalBusy)return;
 openModal(p.deleting?'Resume collection deletion':'Delete collection',
  `<p>Permanently delete <strong>${esc(p.title)}</strong> and all its journey entries, including approved work and reviews? This cannot be undone.</p><p class="jmuted">Uploaded files remain in Cloudinary. Other collections and Design Inventory records are not deleted.</p><label class="jf">Type the collection name to confirm<input class="f-in" name="confirmation" required maxlength="120" autocomplete="off" spellcheck="false"></label><p class="delete-progress" id="deleteProjectProgress" role="status" aria-live="polite">${p.deleting?'This collection is already locked. Continue to finish removing its remaining entries.':''}</p>`,
  async data=>{
   if(data.confirmation!==p.title){toast('Type the collection name exactly to confirm deletion.','⚠️');return false;}
   await deleteProjectData(p);return true;
  },p.deleting?'Resume deletion':'Permanently delete');
}
async function deleteProjectData(project){
 if(!isAdmin())throw new Error('Only the configured administrator can delete collections.');
 const uid=user.uid,version=authVersion,parent=fs.doc('projects/'+project.id);
 const stillOwner=()=>isAdmin()&&user.uid===uid&&authVersion===version;
 const ensureOwner=()=>{if(!stillOwner())throw new Error('Deletion paused. Sign in as the owner and use Resume deletion.');};
 const progress=message=>{if(stillOwner()&&$('#deleteProjectProgress'))$('#deleteProjectProgress').textContent=message;};
 const beforeLeave=e=>{e.preventDefault();e.returnValue='';};
 let removed=0;
 window.addEventListener('beforeunload',beforeLeave);
 try{
  progress('Locking the collection before removing its entries…');
  const exists=await fs.runTransaction(async tx=>{
   ensureOwner();const snap=await tx.get(parent);ensureOwner();if(!snap.exists)return false;
   if(snap.data().title!==project.title)throw new Error('The collection name changed. Close this dialog and check the collection again.');
   tx.update(parent,{archived:true,deleting:true});return true;
  });
  ensureOwner();
  if(exists){
   const local=S.projects?.find(x=>x.id===project.id);if(local){local.archived=true;local.deleting=true;}
   // This application permits only the known entries subcollection; its rules lock
   // new entries and edits once deleting is true. Small batches can safely resume.
   for(;;){
    ensureOwner();const batchRows=await parent.collection('entries').limit(100).get({source:'server'});ensureOwner();
    if(batchRows.empty)break;
    const batch=fs.batch();for(const row of batchRows.docs)batch.delete(row.ref);
    await batch.commit();removed+=batchRows.docs.length;ensureOwner();
    progress(`Removed ${removed} entries. Keep this window open until deletion finishes.`);
   }
   progress('Removing the collection record…');ensureOwner();await parent.delete();
  }
  ensureOwner();S.projects=(S.projects||[]).filter(x=>x.id!==project.id);
  if(journeyId===project.id)closeJourney();else if(current==='journey')renderJourney();
  toast('Collection and its journey entries deleted.');
 }catch(e){
  progress('Deletion did not finish. The collection may be locked with some entries already removed. Retry here, or use Resume deletion after reconnecting. '+errorText(e));
  throw e;
 }finally{window.removeEventListener('beforeunload',beforeLeave);}
}
