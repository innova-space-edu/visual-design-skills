import { visual } from "/packages/sdk/index.js";

const $=id=>document.getElementById(id);
let currentPlan=null;

function renderPlan(plan){
  currentPlan=plan;
  $("confidence").textContent=Math.round((plan.routing?.confidence??0)*100)+"%";
  $("calls").textContent=plan.cost?.planning_external_calls??0;
  $("generation").textContent=plan.cost?.generation_external_calls??0;
  $("skills").innerHTML=(plan.routing?.selected_skills??[]).map(x=>'<span class="pill">'+x+'</span>').join("");
  $("json").textContent=JSON.stringify(plan,null,2);
  $("status").textContent="Plan local listo · "+(plan.backend?.strategy??"sin backend");
}
function localPlan(){
  const plan=visual.plan($("prompt").value);
  renderPlan(plan);
  return plan;
}
function showResult(payload){
  const output=(payload.outputs??[])[0]?.result;
  const preview=$("preview");
  if(output?.data_url||output?.url){
    const src=output.data_url||output.url;
    preview.innerHTML="";
    const img=document.createElement("img");img.src=src;img.alt="Resultado generado";preview.appendChild(img);
  }else if(output?.svg){
    preview.innerHTML=output.svg;
  }else if(payload.pending?.length){
    preview.innerHTML='<div class="placeholder">Backend no configurado en el servidor: '+payload.pending.map(x=>x.backend).join(", ")+'</div>';
  }else{
    preview.innerHTML='<div class="placeholder">No llegó un artefacto visual.</div>';
  }
}
$("plan").onclick=()=>localPlan();
$("execute").onclick=async()=>{
  const plan=currentPlan??localPlan();
  $("status").textContent="Ejecutando…";
  const headers={"content-type":"application/json"};
  if($("token").value)headers.authorization="Bearer "+$("token").value;
  const backend=$("backend").value||undefined;
  try{
    const response=await fetch("/api/visual",{method:"POST",headers,body:JSON.stringify({action:"execute",plan,backend,cache:true})});
    const data=await response.json();
    if(!response.ok)throw new Error(data.message||data.error||"Error de ejecución");
    showResult(data);
    $("status").textContent=(data.cache_hit?"Resultado desde caché":"Ejecución completada")+" · "+(backend||plan.backend?.primary||plan.backend?.image_backend||"auto");
  }catch(error){
    $("status").textContent="Error: "+error.message;
  }
};
localPlan();
