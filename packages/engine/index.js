import { compileV4Scene } from "./v4.js";
const COLORS={
  ink:"#0f172a",muted:"#64748b",line:"#cbd5e1",blue:"#2563eb",blueSoft:"#dbeafe",
  violet:"#7c3aed",violetSoft:"#ede9fe",green:"#059669",greenSoft:"#d1fae5",orange:"#ea580c",orangeSoft:"#ffedd5"
};

function text(id,x,y,value,size,weight,fill){
  return {id:id,type:"text",x:x,y:y,text:String(value||""),style:{family:"Inter,Arial,sans-serif",size:size||22,weight:weight||400},paint:{fill:fill||COLORS.ink}};
}
function rect(id,x,y,w,h,fill,stroke,rx){
  return {id:id,type:"rect",x:x,y:y,width:w,height:h,rx:rx===undefined?18:rx,paint:{fill:fill||"#ffffff",stroke:stroke||COLORS.line,strokeWidth:1.5}};
}
function line(id,x1,y1,x2,y2,arrow){
  return {id:id,type:"line",x1:x1,y1:y1,x2:x2,y2:y2,markerEnd:!!arrow,paint:{stroke:COLORS.ink,strokeWidth:2,lineCap:"round"}};
}
function sceneBase(brief){
  const out=brief.output||{};
  return {
    version:"1.0",
    id:"skill-"+String(brief.visual_type||"visual"),
    width:Number(out.width)||1200,
    height:Number(out.height)||800,
    background:"#f8fafc",
    title:brief.purpose||brief.visual_type||"Visual",
    description:"Compiled deterministically from VisualBrief",
    metadata:{
      source:"visual-design-skills",
      visual_type:brief.visual_type,
      selected_skills:brief.selected_skills||[],
      render_strategy:brief.render_strategy
    },
    nodes:[]
  };
}
function exactText(brief){
  return (brief.text_blocks||[]).map(function(x){return x&&x.text?String(x.text):"";}).filter(Boolean);
}
function titleFrom(brief){
  const t=exactText(brief);
  return t[0]||brief.purpose||brief.visual_type||"Visual";
}
function compileMath(brief){
  const s=sceneBase(brief),w=s.width,h=s.height;
  s.nodes.push(text("title",64,72,titleFrom(brief),40,750));
  const gx=72,gy=130,gw=Math.round(w*.56),gh=Math.round(h*.68);
  for(let x=gx;x<=gx+gw;x+=50)s.nodes.push({id:"grid-x-"+x,type:"line",x1:x,y1:gy,x2:x,y2:gy+gh,paint:{stroke:"#e2e8f0",strokeWidth:1}});
  for(let y=gy;y<=gy+gh;y+=50)s.nodes.push({id:"grid-y-"+y,type:"line",x1:gx,y1:y,x2:gx+gw,y2:y,paint:{stroke:"#e2e8f0",strokeWidth:1}});
  s.nodes.push(line("axis-x",gx,gy+gh/2,gx+gw,gy+gh/2,true));
  s.nodes.push(line("axis-y",gx+gw/2,gy+gh,gx+gw/2,gy,true));
  const formulas=(brief.data&&Array.isArray(brief.data.formulas)?brief.data.formulas:exactText(brief).slice(1));
  const sideX=gx+gw+48;
  s.nodes.push(rect("formula-card",sideX,130,w-sideX-60,Math.max(180,h-190),"#ffffff","#cbd5e1",22));
  s.nodes.push(text("formula-title",sideX+24,172,"Formula / datos",20,700,COLORS.blue));
  (formulas.length?formulas:["Scene geometry is editable"]).slice(0,7).forEach(function(f,i){
    s.nodes.push({id:"math-"+i,type:"math",x:sideX+24,y:220+i*54,latex:String(f),paint:{fill:COLORS.ink}});
  });
  return s;
}
function compileChemistry(brief){
  const s=sceneBase(brief),w=s.width;
  s.nodes.push(text("title",64,72,titleFrom(brief),40,750));
  const data=brief.data||{};
  const atoms=Array.isArray(data.atoms)?data.atoms:[
    {symbol:"H",x:310,y:330,color:"#dbeafe"},{symbol:"O",x:430,y:330,color:"#fee2e2"},{symbol:"H",x:550,y:330,color:"#dbeafe"}
  ];
  const bonds=Array.isArray(data.bonds)?data.bonds:[[0,1],[1,2]];
  bonds.forEach(function(b,i){
    const a=atoms[b[0]],c=atoms[b[1]];
    if(a&&c)s.nodes.push({id:"bond-"+i,type:"line",x1:a.x,y1:a.y,x2:c.x,y2:c.y,paint:{stroke:"#475569",strokeWidth:8,lineCap:"round"}});
  });
  atoms.forEach(function(a,i){
    s.nodes.push({id:"atom-"+i,type:"circle",cx:Number(a.x),cy:Number(a.y),r:Number(a.radius)||34,paint:{fill:a.color||"#e2e8f0",stroke:"#334155",strokeWidth:2}});
    s.nodes.push(text("atom-label-"+i,Number(a.x)-12,Number(a.y)+8,a.symbol||"?",22,750));
  });
  const equation=data.equation||exactText(brief)[1];
  if(equation)s.nodes.push({id:"equation",type:"math",x:80,y:620,latex:String(equation),paint:{fill:COLORS.ink}});
  s.nodes.push(rect("legend",w-330,145,270,210,"#ffffff","#cbd5e1",20));
  s.nodes.push(text("legend-title",w-306,184,"Deterministic chemistry",18,700,COLORS.green));
  s.nodes.push(text("legend-copy",w-306,225,"Atoms, bonds, labels and\nchemical notation remain\neditable scene elements.",17,450,COLORS.muted));
  return s;
}
function compileFlowchart(brief){
  const s=sceneBase(brief),w=s.width;
  s.nodes.push(text("title",64,72,titleFrom(brief),40,750));
  const data=brief.data||{};
  const nodes=Array.isArray(data.nodes)&&data.nodes.length?data.nodes:[
    {id:"start",label:"Start"},{id:"process",label:"Process"},{id:"check",label:"Validate"},{id:"end",label:"Result"}
  ];
  const edges=Array.isArray(data.edges)&&data.edges.length?data.edges:nodes.slice(0,-1).map(function(n,i){return [n.id,nodes[i+1].id];});
  const pos={};
  const cardW=Math.min(220,Math.max(150,(w-120)/nodes.length-30)),y=300;
  nodes.forEach(function(n,i){
    const x=60+i*((w-120)/Math.max(1,nodes.length));
    pos[n.id]={x:x,y:y};
    s.nodes.push(rect("node-"+n.id,x,y,cardW,96,i===0?COLORS.greenSoft:i===nodes.length-1?COLORS.violetSoft:"#ffffff","#94a3b8",18));
    s.nodes.push(text("label-"+n.id,x+18,y+56,n.label||n.id,19,650));
  });
  edges.forEach(function(e,i){
    const a=pos[e[0]],b=pos[e[1]];
    if(a&&b)s.nodes.push(line("edge-"+i,a.x+cardW,a.y+48,b.x-10,b.y+48,true));
  });
  return s;
}
function compileInfographic(brief){
  const s=sceneBase(brief),w=s.width,h=s.height;
  s.nodes.push(text("title",64,72,titleFrom(brief),42,780));
  const sections=brief.data&&Array.isArray(brief.data.sections)&&brief.data.sections.length?brief.data.sections:[
    {title:"Structure",body:"Deterministic text and layout"},{title:"Visual",body:"Editable shapes and diagrams"},{title:"Quality",body:"Automatic validation before export"}
  ];
  const cols=Math.min(3,sections.length),gap=24,margin=64;
  const cw=(w-margin*2-gap*(cols-1))/cols;
  sections.forEach(function(sec,i){
    const row=Math.floor(i/cols),col=i%cols,x=margin+col*(cw+gap),y=145+row*230;
    const fills=[COLORS.blueSoft,COLORS.violetSoft,COLORS.greenSoft,COLORS.orangeSoft];
    s.nodes.push(rect("section-"+i,x,y,cw,190,fills[i%fills.length],"#cbd5e1",24));
    s.nodes.push(text("section-title-"+i,x+22,y+48,sec.title||("Section "+(i+1)),21,750));
    s.nodes.push(text("section-body-"+i,x+22,y+88,sec.body||"",17,450,COLORS.muted));
  });
  s.nodes.push(text("footer",64,h-36,"Visual Engine structured render",14,500,COLORS.muted));
  return s;
}
function compileDataVisualization(brief){
  const s=sceneBase(brief),w=s.width,h=s.height,data=brief.data||{};
  s.nodes.push(text("title",64,72,titleFrom(brief),40,750));
  const values=Array.isArray(data.values)&&data.values.length?data.values.map(Number):[12,28,19,36,24];
  const labels=Array.isArray(data.labels)?data.labels:values.map(function(_,i){return "D"+(i+1);});
  const left=90,top=150,cw=w-170,ch=h-260,max=Math.max.apply(null,[1].concat(values));
  s.nodes.push(line("axis-y",left,top,left,top+ch,false));
  s.nodes.push(line("axis-x",left,top+ch,left+cw,top+ch,false));
  const gap=18,bw=(cw-gap*(values.length+1))/values.length;
  values.forEach(function(v,i){
    const bh=ch*(v/max),x=left+gap+i*(bw+gap),y=top+ch-bh;
    s.nodes.push(rect("bar-"+i,x,y,bw,bh,COLORS.blueSoft,COLORS.blue,8));
    s.nodes.push(text("value-"+i,x+bw/2-10,y-10,String(v),15,700,COLORS.blue));
    s.nodes.push(text("label-"+i,x+bw/2-12,top+ch+30,String(labels[i]||""),14,500,COLORS.muted));
  });
  return s;
}
function compilePhysics(brief){
  const s=sceneBase(brief),w=s.width,h=s.height,data=brief.data||{};
  s.nodes.push(text("title",64,72,titleFrom(brief),40,750));
  const optics=String(data.mode||brief.purpose||"").toLowerCase().includes("optic");
  if(optics){
    const cy=h/2,lx=w/2;
    s.nodes.push(line("principal-axis",70,cy,w-70,cy,false));
    s.nodes.push({id:"lens",type:"path",d:"M "+(lx-26)+" "+(cy-150)+" Q "+(lx+25)+" "+cy+" "+(lx-26)+" "+(cy+150)+" Q "+(lx-75)+" "+cy+" "+(lx-26)+" "+(cy-150),paint:{fill:"#dbeafe",stroke:"#2563eb",strokeWidth:3}});
    s.nodes.push(line("ray-1",130,cy-90,lx-26,cy-40,false));
    s.nodes.push(line("ray-2",lx-26,cy-40,w-130,cy+70,true));
    s.nodes.push(line("ray-3",130,cy-90,w-130,cy+90,true));
    s.nodes.push(text("lens-label",lx-58,cy+190,"Lente / sistema óptico",16,650,COLORS.blue));
  }else{
    const x=w/2-90,y=h/2-70;
    s.nodes.push(rect("body",x,y,180,140,"#ffffff","#334155",18));
    s.nodes.push(text("body-label",x+58,y+78,String(data.object||"Objeto"),19,700));
    const forces=Array.isArray(data.forces)&&data.forces.length?data.forces:[
      {label:"N",dx:0,dy:-170},{label:"P",dx:0,dy:170},{label:"F",dx:190,dy:0}
    ];
    forces.forEach(function(force,i){
      const cx=x+90,cy=y+70,ex=cx+Number(force.dx||0),ey=cy+Number(force.dy||0);
      s.nodes.push(line("force-"+i,cx,cy,ex,ey,true));
      s.nodes.push(text("force-label-"+i,ex+8,ey-8,String(force.label||"F"),18,750,COLORS.orange));
    });
  }
  return s;
}
function compileTechnical(brief){
  const s=sceneBase(brief),w=s.width,h=s.height,data=brief.data||{};
  s.nodes.push(text("title",50,58,titleFrom(brief),32,750));
  const x=130,y=150,rw=Number(data.width)||Math.round(w*.55),rh=Number(data.height)||Math.round(h*.52);
  s.nodes.push(rect("plan",x,y,rw,rh,"#ffffff","#111827",0));
  if(Array.isArray(data.divisions)){
    data.divisions.forEach(function(d,i){
      if(d.orientation==="v")s.nodes.push(line("division-"+i,x+Number(d.at||0),y,x+Number(d.at||0),y+rh,false));
      else s.nodes.push(line("division-"+i,x,y+Number(d.at||0),x+rw,y+Number(d.at||0),false));
    });
  }else{
    s.nodes.push(line("division-a",x+rw*.58,y,x+rw*.58,y+rh,false));
    s.nodes.push(line("division-b",x,y+rh*.55,x+rw*.58,y+rh*.55,false));
  }
  s.nodes.push(line("dim-top",x,y-38,x+rw,y-38,true));
  s.nodes.push(text("dim-top-label",x+rw/2-35,y-52,String(data.widthLabel||rw+" u"),14,650,COLORS.muted));
  s.nodes.push(line("dim-left",x-38,y,x-38,y+rh,true));
  s.nodes.push(text("dim-left-label",x-80,y+rh/2,String(data.heightLabel||rh+" u"),14,650,COLORS.muted));
  s.nodes.push(text("note",x+rw+55,y+30,"Cotas y geometría\neditables / medibles",16,600,COLORS.blue));
  return s;
}
function compileTimeline(brief){
  const s=sceneBase(brief),w=s.width,data=brief.data||{};
  s.nodes.push(text("title",64,72,titleFrom(brief),40,750));
  const events=Array.isArray(data.events)&&data.events.length?data.events:[
    {date:"Fase 1",label:"Definir"},{date:"Fase 2",label:"Construir"},{date:"Fase 3",label:"Validar"},{date:"Fase 4",label:"Publicar"}
  ];
  const y=360,left=100,right=w-100;
  s.nodes.push(line("timeline",left,y,right,y,true));
  events.forEach(function(e,i){
    const x=events.length===1?w/2:left+i*(right-left)/(events.length-1);
    s.nodes.push({id:"dot-"+i,type:"circle",cx:x,cy:y,r:10,paint:{fill:COLORS.violet,stroke:"#ffffff",strokeWidth:3}});
    s.nodes.push(text("date-"+i,x-32,y-35,String(e.date||""),14,750,COLORS.violet));
    s.nodes.push(text("event-"+i,x-48,y+48,String(e.label||""),16,600));
  });
  return s;
}
function compileWorksheet(brief){
  const s=sceneBase(brief),w=s.width,h=s.height,data=brief.data||{};
  s.background="#ffffff";
  s.nodes.push(text("title",56,64,titleFrom(brief),34,780));
  s.nodes.push(line("header-line",56,88,w-56,88,false));
  const items=Array.isArray(data.items)&&data.items.length?data.items:[
    "1. Identifica los datos relevantes.","2. Representa el problema.","3. Calcula y justifica el resultado.","4. Verifica tu respuesta."
  ];
  items.forEach(function(item,i){
    const y=150+i*125;
    s.nodes.push(text("q-"+i,68,y,String(item),18,600));
    for(let j=0;j<3;j++)s.nodes.push({id:"rule-"+i+"-"+j,type:"line",x1:80,y1:y+34+j*25,x2:w-80,y2:y+34+j*25,paint:{stroke:"#cbd5e1",strokeWidth:1}});
  });
  s.nodes.push(text("footer",56,h-35,"Visual Engine worksheet",12,500,COLORS.muted));
  return s;
}
function compileVectorMark(brief){
  const s=sceneBase(brief),w=s.width,h=s.height;
  s.nodes.push(text("title",64,72,titleFrom(brief),32,700));
  const cx=w/2,cy=h/2;
  s.nodes.push({id:"mark-a",type:"circle",cx:cx-55,cy:cy,r:105,paint:{fill:COLORS.blueSoft,stroke:COLORS.blue,strokeWidth:8}});
  s.nodes.push({id:"mark-b",type:"polygon",points:[[cx+5,cy-110],[cx+120,cy],[cx+5,cy+110]],paint:{fill:COLORS.violetSoft,stroke:COLORS.violet,strokeWidth:8}});
  s.nodes.push(text("mark-label",cx-125,cy+185,String((brief.data&&brief.data.label)||"VECTOR MARK"),24,800));
  return s;
}
function compileGeneric(brief){
  const s=sceneBase(brief),w=s.width;
  s.nodes.push(text("title",64,78,titleFrom(brief),42,780));
  s.nodes.push(rect("main",64,130,w-128,520,"#ffffff","#cbd5e1",28));
  s.nodes.push(text("kind",96,182,String(brief.visual_type||"visual"),18,700,COLORS.blue));
  s.nodes.push(text("purpose",96,230,String(brief.purpose||""),22,500));
  const constraints=Array.isArray(brief.constraints)?brief.constraints:[];
  constraints.slice(0,8).forEach(function(c,i){s.nodes.push(text("constraint-"+i,100,300+i*38,"- "+c,16,450,COLORS.muted));});
  return s;
}

export function compileBriefToScene(brief){
  if(!brief||typeof brief!=="object")throw new Error("VisualBrief is required");
  if(brief.context&&brief.context.engine_scene)return structuredClone(brief.context.engine_scene);
  const selected=brief.selected_skills||[];
  const type=String(brief.visual_type||"");
  const v4=compileV4Scene(brief); if(v4)return v4;
  if(selected.includes("math-diagram")||type==="math-diagram")return compileMath(brief);
  if(selected.includes("chemistry-diagram")||type==="chemistry-diagram")return compileChemistry(brief);
  if(selected.includes("flowchart-diagram")||type==="flowchart-diagram")return compileFlowchart(brief);
  if(selected.includes("data-visualization")||type==="data-visualization")return compileDataVisualization(brief);
  if(selected.includes("physics-diagram")||type==="physics-diagram")return compilePhysics(brief);
  if(selected.includes("technical-drawing")||selected.includes("technical-floorplan")||type==="technical-drawing"||type==="technical-floorplan")return compileTechnical(brief);
  if(selected.includes("timeline-design")||type==="timeline")return compileTimeline(brief);
  if(selected.includes("worksheet-design")||type==="worksheet")return compileWorksheet(brief);
  if(selected.includes("logo-design")||selected.includes("icon-design")||selected.includes("vector-illustration"))return compileVectorMark(brief);
  if(selected.includes("infographic")||type==="infographic"||selected.includes("educational-image"))return compileInfographic(brief);
  return compileGeneric(brief);
}

export function compilePlanToScene(plan){
  if(!plan||!plan.visual_brief)throw new Error("VisualPlan with visual_brief is required");
  return compileBriefToScene(plan.visual_brief);
}

export const ENGINE_CAPABILITIES={
  contract:"visual-scene/1.0",
  local_first:true,
  external_calls:0,
  deterministic_skills:["math-diagram","chemistry-diagram","flowchart-diagram","data-visualization","technical-drawing","technical-floorplan","worksheet-design","logo-design","icon-design","vector-illustration"],
  initial_compilers:["math-diagram","chemistry-diagram","flowchart-diagram","data-visualization","physics-diagram","biology-diagram","map-design","technical-drawing","technical-floorplan","timeline-design","worksheet-design","textbook-page","presentation-visual","ui-visual-design","poster-design","logo-design","icon-design","vector-illustration","infographic","educational-image"]
};
