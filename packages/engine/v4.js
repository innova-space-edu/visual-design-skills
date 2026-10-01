const COLORS={
  ink:"#0f172a",muted:"#64748b",line:"#cbd5e1",blue:"#2563eb",blueSoft:"#dbeafe",
  violet:"#7c3aed",violetSoft:"#ede9fe",green:"#059669",greenSoft:"#d1fae5",orange:"#ea580c",orangeSoft:"#ffedd5"
};
function text(id,x,y,value,size=20,weight=400,fill=COLORS.ink){
  return {id,type:"text",x,y,text:String(value??""),style:{family:"Inter,Arial,sans-serif",size,weight},paint:{fill}};
}
function rect(id,x,y,width,height,fill="#ffffff",stroke=COLORS.line,rx=18){
  return {id,type:"rect",x,y,width,height,rx,paint:{fill,stroke,strokeWidth:1.5}};
}
function line(id,x1,y1,x2,y2,arrow=false){
  return {id,type:"line",x1,y1,x2,y2,markerEnd:arrow,paint:{stroke:COLORS.ink,strokeWidth:2,lineCap:"round"}};
}
function base(brief){
  const output=brief.output||{};
  return {
    version:"1.0",
    id:"skill-"+String(brief.visual_type||"visual"),
    width:Number(output.width)||1200,
    height:Number(output.height)||800,
    background:"#f8fafc",
    title:brief.purpose||brief.visual_type||"Visual",
    description:"Compiled deterministically from Visual Platform V4",
    metadata:{source:"visual-design-skills/v4",visual_type:brief.visual_type,selected_skills:brief.selected_skills||[],render_strategy:brief.render_strategy},
    nodes:[]
  };
}
function titleFrom(brief){
  const texts=(brief.text_blocks||[]).map(x=>x?.text?String(x.text):"").filter(Boolean);
  return texts[0]||brief.purpose||brief.visual_type||"Visual";
}
function biology(brief){
  const s=base(brief),w=s.width,h=s.height,data=brief.data||{};
  s.nodes.push(text("title",64,72,titleFrom(brief),40,750));
  const cx=Math.round(w*.42),cy=Math.round(h*.48),r=Math.min(180,Math.round(h*.26));
  s.nodes.push({id:"cell-membrane",type:"ellipse",cx,cy,rx:r*1.28,ry:r,paint:{fill:"#ecfdf5",stroke:"#059669",strokeWidth:4}});
  s.nodes.push({id:"nucleus",type:"circle",cx:cx+20,cy:cy-5,r:r*.34,paint:{fill:"#ede9fe",stroke:"#7c3aed",strokeWidth:3}});
  s.nodes.push({id:"mitochondria",type:"ellipse",cx:cx-r*.45,cy:cy+r*.18,rx:r*.22,ry:r*.11,paint:{fill:"#ffedd5",stroke:"#ea580c",strokeWidth:2}});
  s.nodes.push(text("label-nucleus",cx+r*.45,cy-r*.18,String(data.nucleusLabel||"Núcleo"),17,700,COLORS.violet));
  s.nodes.push(line("leader-nucleus",cx+r*.38,cy-r*.15,cx+r*.14,cy-r*.05));
  s.nodes.push(text("label-membrane",cx-r*1.25,cy-r-25,String(data.membraneLabel||"Membrana celular"),17,700,COLORS.green));
  return s;
}
function mapDesign(brief){
  const s=base(brief),w=s.width,h=s.height,data=brief.data||{};
  s.nodes.push(text("title",64,72,titleFrom(brief),40,750));
  const x=70,y=130,mw=w-140,mh=h-230;
  s.nodes.push(rect("map-frame",x,y,mw,mh,"#f8fafc","#94a3b8",18));
  for(let gx=x;gx<=x+mw;gx+=80)s.nodes.push({id:"map-gx-"+gx,type:"line",x1:gx,y1:y,x2:gx,y2:y+mh,paint:{stroke:"#e2e8f0",strokeWidth:1}});
  for(let gy=y;gy<=y+mh;gy+=80)s.nodes.push({id:"map-gy-"+gy,type:"line",x1:x,y1:gy,x2:x+mw,y2:gy,paint:{stroke:"#e2e8f0",strokeWidth:1}});
  const points=Array.isArray(data.points)&&data.points.length?data.points:[
    {label:"Punto A",x:.25,y:.35},{label:"Punto B",x:.65,y:.55},{label:"Punto C",x:.45,y:.72}
  ];
  points.forEach((p,i)=>{
    const px=x+mw*Math.max(0,Math.min(1,Number(p.x??.5))),py=y+mh*Math.max(0,Math.min(1,Number(p.y??.5)));
    s.nodes.push({id:"map-pin-"+i,type:"circle",cx:px,cy:py,r:10,paint:{fill:"#2563eb",stroke:"#ffffff",strokeWidth:3}});
    s.nodes.push(text("map-label-"+i,px+14,py+5,String(p.label||("P"+(i+1))),15,700,COLORS.ink));
  });
  return s;
}
function presentation(brief){
  const s=base(brief),w=s.width,h=s.height,data=brief.data||{};
  s.background="#ffffff";
  s.nodes.push(text("title",72,86,titleFrom(brief),44,800));
  const subtitle=String(data.subtitle||"");
  if(subtitle)s.nodes.push(text("subtitle",72,128,subtitle,22,500,COLORS.muted));
  s.nodes.push(rect("visual-card",72,185,Math.round(w*.5),h-260,"#eef2ff","#c7d2fe",28));
  s.nodes.push(text("visual-label",104,235,String(data.visualLabel||"Visual principal"),22,750,COLORS.blue));
  const bullets=Array.isArray(data.bullets)&&data.bullets.length?data.bullets:["Idea principal","Dato o evidencia","Conclusión"];
  bullets.slice(0,6).forEach((item,i)=>{
    s.nodes.push({id:"bullet-dot-"+i,type:"circle",cx:Math.round(w*.62),cy:230+i*68,r:5,paint:{fill:COLORS.violet}});
    s.nodes.push(text("bullet-"+i,Math.round(w*.62)+18,236+i*68,String(item),20,550,COLORS.ink));
  });
  return s;
}
function uiVisual(brief){
  const s=base(brief),w=s.width,h=s.height,data=brief.data||{};
  s.background="#f1f5f9";
  s.nodes.push(rect("app-shell",40,40,w-80,h-80,"#ffffff","#cbd5e1",24));
  s.nodes.push(rect("sidebar",40,40,220,h-80,"#0f172a","#0f172a",24));
  s.nodes.push(text("brand",70,92,String(data.brand||"APP"),24,800,"#ffffff"));
  const items=Array.isArray(data.nav)?data.nav:["Dashboard","Datos","Reportes","Ajustes"];
  items.forEach((item,i)=>s.nodes.push(text("nav-"+i,72,155+i*48,String(item),17,600,"#cbd5e1")));
  s.nodes.push(text("title",300,92,titleFrom(brief),34,780));
  for(let i=0;i<3;i++){
    const x=300+i*245;
    s.nodes.push(rect("metric-card-"+i,x,135,210,120,"#ffffff","#e2e8f0",18));
    s.nodes.push(text("metric-label-"+i,x+20,172,String((data.metrics&&data.metrics[i]?.label)||["Usuarios","Sesiones","Tareas"][i]),14,600,COLORS.muted));
    s.nodes.push(text("metric-value-"+i,x+20,222,String((data.metrics&&data.metrics[i]?.value)||[128,342,57][i]),30,800,COLORS.ink));
  }
  s.nodes.push(rect("content-panel",300,290,w-350,h-350,"#ffffff","#e2e8f0",20));
  s.nodes.push(text("content-label",326,330,String(data.panelTitle||"Contenido principal"),20,750,COLORS.ink));
  return s;
}
function poster(brief){
  const s=base(brief),w=s.width,h=s.height,data=brief.data||{};
  const accent=String(data.accent||COLORS.violet);
  s.background=String(data.background||"#0f172a");
  s.nodes.push({id:"poster-orb-a",type:"circle",cx:w*.78,cy:h*.22,r:150,paint:{fill:"#312e81",opacity:.75}});
  s.nodes.push({id:"poster-orb-b",type:"circle",cx:w*.12,cy:h*.88,r:180,paint:{fill:"#1e3a8a",opacity:.55}});
  s.nodes.push(text("title",70,150,titleFrom(brief),58,850,"#ffffff"));
  const body=String(data.body||"");
  if(body)s.nodes.push(text("body",74,250,body,24,500,"#cbd5e1"));
  s.nodes.push(rect("cta",74,h-170,240,64,accent,accent,18));
  s.nodes.push(text("cta-label",108,h-129,String(data.cta||"Más información"),20,750,"#ffffff"));
  return s;
}
function textbook(brief){
  const s=base(brief),w=s.width,h=s.height,data=brief.data||{};
  s.background="#ffffff";
  s.nodes.push(text("title",56,70,titleFrom(brief),34,800));
  s.nodes.push(line("rule",56,92,w-56,92));
  const sections=Array.isArray(data.sections)&&data.sections.length?data.sections:[
    {title:"Concepto",body:"Explicación breve y estructurada."},
    {title:"Ejemplo",body:"Ejemplo desarrollado paso a paso."},
    {title:"Actividad",body:"Aplicación del contenido."}
  ];
  let y=130;
  sections.slice(0,5).forEach((sec,i)=>{
    s.nodes.push(text("section-title-"+i,64,y,String(sec.title||("Sección "+(i+1))),22,750,COLORS.blue));
    s.nodes.push(text("section-body-"+i,64,y+38,String(sec.body||""),18,450,COLORS.ink));
    y+=145;
  });
  s.nodes.push(text("page-footer",w-180,h-32,String(data.pageLabel||"Visual Textbook"),12,500,COLORS.muted));
  return s;
}
export function compileV4Scene(brief){
  const selected=brief.selected_skills||[];
  const type=String(brief.visual_type||"");
  if(selected.includes("biology-diagram")||type==="biology-diagram")return biology(brief);
  if(selected.includes("map-design")||type==="map-design")return mapDesign(brief);
  if(selected.includes("presentation-visual")||type==="presentation-visual")return presentation(brief);
  if(selected.includes("ui-visual-design")||type==="ui-visual-design")return uiVisual(brief);
  if(selected.includes("poster-design")||type==="poster-design")return poster(brief);
  if(selected.includes("textbook-page")||type==="textbook-page")return textbook(brief);
  return null;
}
