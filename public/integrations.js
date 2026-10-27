/* Image uploads use Cloudinary's unsigned REST endpoint. No API secret is shipped. */
const imageUploads = new Map();
let integrationEpoch = 0, captionJob = null;
const IMAGE_ROLES = ['admin','designer','documenter','coordinator','marketer'];
const CAPTION_ROLES = ['admin','designer','documenter','marketer'];

function hasImageUpload(form) {
  return [...imageUploads.keys()].some(input => form.contains(input));
}
function cancelImageUploads(root = document) {
  for (const [input, job] of imageUploads) {
    if (root.contains(input)) {
      job.controller.abort();
      job.finish();
      job.note.textContent = 'Upload cancelled. A file already received by Cloudinary may remain there.';
    }
  }
}
function resetIntegrations() {
  integrationEpoch++;
  cancelImageUploads();
  captionJob?.controller.abort();
  captionJob = null;
  for (const id of ['generateAiCaptions','templateCaptions']) setBtnLoading($('#'+id),false);
  const status = $('#captionStatus');
  if (status) { status.textContent = ''; status.classList.remove('is-error'); }
  $('#mediaUrlForm')?.reset();
  document.querySelectorAll('.upload-note').forEach(n => {n.textContent = 'JPG, PNG or WebP · up to 5 MB'; n.classList.remove('upload-error');});
}
function enhanceImageUploads(root = document) {
  root.querySelectorAll('input[data-cloud-image]').forEach(input => {
    if (input.dataset.uploadReady) return;
    input.dataset.uploadReady = 'true';
    const controls = document.createElement('div');
    controls.className = 'upload-controls';
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'btn btn-t btn-sm'; button.textContent = 'Upload image';
    const cancel = document.createElement('button');
    cancel.type = 'button'; cancel.className = 'btn btn-g btn-sm'; cancel.textContent = 'Cancel upload'; cancel.hidden = true;
    const picker = document.createElement('input');
    picker.type = 'file'; picker.accept = '.jpg,.jpeg,.png,.webp'; picker.hidden = true;
    const note = document.createElement('span');
    note.className = 'upload-note'; note.setAttribute('role','status');
    note.textContent = 'JPG, PNG or WebP · up to 5 MB';
    controls.append(button,cancel,picker,note); input.after(controls);
    button.addEventListener('click', () => {
      if (!IMAGE_ROLES.includes(user?.role)) return toast('Your role cannot upload images.','⚠️');
      if (input.form?.querySelector('button[type=submit]')?.disabled) return toast('Wait for the current save to finish.','⚠️');
      picker.click();
    });
    cancel.addEventListener('click', () => imageUploads.get(input)?.controller.abort());
    picker.addEventListener('change', () => {
      const file = picker.files?.[0]; picker.value = '';
      if (file) uploadImageFile(file,input,{button,cancel,note});
    });
  });
}
async function uploadImageFile(file,input,ui) {
  const {button,cancel,note} = ui;
  note.classList.remove('upload-error');
  if (!IMAGE_ROLES.includes(user?.role) || !input.isConnected || imageUploads.has(input) || input.form?.querySelector('button[type=submit]')?.disabled) return;
  const config = window.KIDSWEAR_INTEGRATIONS?.cloudinary;
  if (!config?.cloudName || !config.uploadPreset) {note.textContent='Cloudinary upload configuration is missing.';return;}
  if (!/\.(jpe?g|png|webp)$/i.test(file.name) || (file.type && !['image/jpeg','image/png','image/webp'].includes(file.type))) {
    note.textContent='Choose a JPG, PNG or WebP image.'; note.classList.add('upload-error'); return;
  }
  if (!file.size || file.size > config.maxImageBytes) {
    note.textContent='Choose a non-empty image no larger than 5 MB.'; note.classList.add('upload-error'); return;
  }
  const uid = user.uid, epoch = integrationEpoch, controller = new AbortController();
  const previousReadOnly = input.readOnly;
  let timeout = false, timer;
  const current = () => epoch === integrationEpoch && user?.uid === uid && input.isConnected && imageUploads.get(input)?.controller === controller;
  const finish = () => {
    clearTimeout(timer);
    if (imageUploads.get(input)?.controller !== controller) return;
    imageUploads.delete(input); input.readOnly = previousReadOnly;
    setBtnLoading(button,false); cancel.hidden = true;
  };
  imageUploads.set(input,{controller,finish,note});
  input.readOnly = true; setBtnLoading(button,true); cancel.hidden = false; note.textContent='Uploading image…';
  timer = setTimeout(() => {timeout=true;controller.abort();},60000);
  try {
    const body = new FormData(); body.append('file',file); body.append('upload_preset',config.uploadPreset);
    const response = await fetch('https://api.cloudinary.com/v1_1/'+encodeURIComponent(config.cloudName)+'/image/upload', {
      method:'POST',body,signal:controller.signal,credentials:'omit'
    });
    const result = await response.json();
    if (!response.ok) {
      if (response.status===429) throw new Error('Cloudinary usage limit reached. Try later or use an existing image URL.');
      if (/preset|unsigned/i.test(result.error?.message||'')) throw new Error('Cloudinary rejected the preset. Save kidswear_uploads as an unsigned upload preset.');
      throw new Error(result.error?.message || 'Cloudinary rejected the image. Check its format and your account limits.');
    }
    const url = new URL(result.secure_url);
    if (url.protocol!=='https:' || url.username || url.password || url.hostname!=='res.cloudinary.com' || !url.pathname.startsWith('/'+config.cloudName+'/image/upload/') || result.resource_type!=='image' || url.href.length>2048) {
      throw new Error('Cloudinary returned an unexpected image URL.');
    }
    if (!current() || controller.signal.aborted) return;
    input.value = url.href;
    input.dispatchEvent(new Event('input',{bubbles:true}));
    if (input.id==='mediaUrl' && !$('#mediaName').value.trim()) $('#mediaName').value=file.name.replace(/\.[^.]+$/,'').slice(0,200);
    note.textContent='Uploaded. Select Save to store this image link with your record.';
  } catch (err) {
    if (!current()) return;
    note.textContent=controller.signal.aborted ? (timeout ? 'Upload timed out. Check Cloudinary before retrying; it may have received the file.' : 'Upload cancelled. A file already received by Cloudinary may remain there.') : 'Upload failed: '+(err.message||'Check your connection and try again.');
    note.classList.add('upload-error');
  } finally {finish();}
}
function aiErrorMessage(err) {
  const text=String(err?.message||err||'');
  if (/429|quota|resource.exhausted|rate.limit/i.test(text)) return 'Gemini’s free quota is currently unavailable. Try later or select Use templates.';
  if (/app.?check|attestation|recaptcha/i.test(text)) return 'App Check verification failed. Use the deployed website and confirm its domain and site key in Firebase App Check.';
  if (/403|permission|API.*enabled|API_KEY/i.test(text)) return 'Gemini access was denied. Check AI Logic → Gemini Developer API and App Check in Firebase Console.';
  if (/404|model.*not.*found|model.*not.*available/i.test(text)) return 'The configured Gemini model is unavailable. Check the model in integrations-config.js, or use templates.';
  if (/abort|timeout|timed.out/i.test(text)) return 'The caption request timed out or was cancelled. Try again or use templates.';
  return 'Could not generate captions. '+text.slice(0,240)+' Use templates if needed.';
}
async function generateAiCaptions() {
  if (captionJob || !CAPTION_ROLES.includes(user?.role)) return;
  const name=clean($('#capName').value), context=clean($('#capContext').value);
  const status=$('#captionStatus'); status.classList.remove('is-error');
  if (!name || name.length>150 || context.length>1000) {status.textContent='Enter an outfit or collection name (up to 150 characters) and context up to 1,000 characters.';return;}
  if (!window.KidsWearServices) {status.textContent='The AI library did not load. Refresh the website.';return;}
  const job={controller:new AbortController(),epoch:integrationEpoch,uid:user.uid}; captionJob=job;
  const current=()=>captionJob===job && job.epoch===integrationEpoch && user?.uid===job.uid;
  const btn=$('#generateAiCaptions'); setBtnLoading(btn,true); $('#templateCaptions').disabled=true;
  status.textContent='Writing three Gemini captions…'; lastCaps=[]; $('#capOut').innerHTML='';
  let timer=setTimeout(()=>job.controller.abort(),45000);
  try {
    // Also bound App Check setup time. The signal cancels the model request when possible.
    const aborted=new Promise((_,reject)=>job.controller.signal.addEventListener('abort',()=>reject(new DOMException('Request timed out','AbortError')),{once:true}));
    const caps=await Promise.race([window.KidsWearServices.generateCaptions({name,category:$('#capCat').value,tone:$('#capTone').value,context},job.controller.signal),aborted]);
    if (!current() || job.controller.signal.aborted) return;
    if (!Array.isArray(caps)||caps.length!==3||caps.some(x=>typeof x!=='string'||!x.trim()||x.length>2000)) throw new Error('Unexpected caption response.');
    lastCaps=caps; showCaptions(); status.textContent='Generated by Gemini. Review the wording and facts before sharing.';
  } catch(err) {
    if (current()) {status.textContent=aiErrorMessage(err);status.classList.add('is-error');}
  } finally {
    clearTimeout(timer);
    if (current()) {captionJob=null;setBtnLoading(btn,false);$('#templateCaptions').disabled=false;}
  }
}
document.addEventListener('submit',event=>{
  if (hasImageUpload(event.target)) {event.preventDefault();event.stopImmediatePropagation();toast('Wait for the image upload, or cancel it before saving.','⚠️');}
},true);
enhanceImageUploads();
