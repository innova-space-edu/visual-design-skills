function esc(value="") {
  return String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;" }[ch]));
}
function lines(value, max=46, maxLines=6) {
  const words=String(value||"").trim().split(/\s+/).filter(Boolean);
  const out=[];let line="";
  for(const word of words){
    const next=line?line+" "+word:word;
    if(next.length>max&&line){out.push(line);line=word;}else line=next;
    if(out.length>=maxLines-1)break;
  }
  if(line&&out.length<maxLines)out.push(line);
  return out;
}
function hash(value="") {
  let h=2166136261;
  for(let i=0;i<value.length;i++){h^=value.charCodeAt(i);h=Math.imul(h,16777619);}
  return h>>>0;
}
function color(seed, offset=0) {
  const h=(seed+offset*137)%360;
  return "hsl("+h+" 68% 48%)";
}
function textBlock(items,x,y,{size=28,weight=600,lineHeight=1.22,fill="#111827"}={}) {
  return items.map((t,i)=>'<text x="'+x+'" y="'+(y+i*size*lineHeight)+'" font-size="'+size+'" font-family="Inter,Arial,sans-serif" font-weight="'+weight+'" fill="'+fill+'">'+esc(t)+'</text>').join("");
}
function genericSvg(brief) {
  const w=Number(brief?.output?.width)||1200,h=Number(brief?.output?.height)||800;
  const seed=hash(brief?.purpose||brief?.source_request||"visual");
  const title=(brief?.text_blocks??[]).find(x=>x?.exact)?.text || brief?.purpose || "Visual design";
  const titleLines=lines(title,48,4);
  const skills=(brief?.selected_skills??[]).slice(0,5);
  const constraints=(brief?.constraints??[]).slice(0,4);
  return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">'+
    '<rect width="100%" height="100%" fill="#f8fafc"/>'+
    '<circle cx="'+(w*.82)+'" cy="'+(h*.18)+'" r="'+(Math.min(w,h)*.2)+'" fill="'+color(seed,0)+'" opacity=".14"/>'+
    '<circle cx="'+(w*.92)+'" cy="'+(h*.74)+'" r="'+(Math.min(w,h)*.28)+'" fill="'+color(seed,1)+'" opacity=".12"/>'+
    '<rect x="'+(w*.07)+'" y="'+(h*.08)+'" width="'+(w*.86)+'" height="'+(h*.84)+'" rx="32" fill="white" stroke="#e2e8f0"/>'+
    '<rect x="'+(w*.1)+'" y="'+(h*.13)+'" width="88" height="88" rx="24" fill="'+color(seed,0)+'"/>'+
    '<path d="M '+(w*.115)+' '+(h*.185)+' L '+(w*.142)+' '+(h*.145)+' L '+(w*.17)+' '+(h*.185)+' L '+(w*.142)+' '+(h*.225)+' Z" fill="white" opacity=".95"/>'+
    textBlock(titleLines,w*.1,h*.34,{size:Math.max(30,Math.min(56,w/22)),weight:750})+
    '<text x="'+(w*.1)+'" y="'+(h*.63)+'" font-size="18" font-family="Inter,Arial,sans-serif" fill="#64748b">Deterministic SVG preview • editable vector</text>'+
    skills.map((s,i)=>'<g transform="translate('+(w*.1+i*160)+','+(h*.69)+')"><rect width="145" height="40" rx="20" fill="#eef2ff"/><text x="16" y="26" font-size="14" font-family="Inter,Arial,sans-serif" fill="#3730a3">'+esc(s)+'</text></g>').join("")+
    constraints.map((c,i)=>'<text x="'+(w*.1)+'" y="'+(h*.8+i*24)+'" font-size="14" font-family="Inter,Arial,sans-serif" fill="#475569">• '+esc(c)+'</text>').join("")+
    '</svg>';
}
function logoSvg(brief) {
  const w=Number(brief?.output?.width)||1024,h=Number(brief?.output?.height)||1024;
  const seed=hash(brief?.purpose||"logo");
  const text=(brief?.text_blocks??[]).find(x=>x?.exact)?.text;
  const cx=w/2,cy=text?h*.42:h/2,r=Math.min(w,h)*.22;
  return '<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'">'+
    '<rect width="100%" height="100%" fill="white"/>'+
    '<g transform="translate('+cx+' '+cy+')">'+
      '<circle r="'+r+'" fill="'+color(seed,0)+'" opacity=".12"/>'+
      '<path d="M 0 '+(-r)+' L '+(r*.86)+' '+(r*.5)+' L '+(-r*.86)+' '+(r*.5)+' Z" fill="'+color(seed,0)+'"/>'+
      '<circle r="'+(r*.34)+'" fill="white"/>'+
      '<circle r="'+(r*.18)+'" fill="'+color(seed,1)+'"/>'+
    '</g>'+
    (text?'<text x="'+cx+'" y="'+(h*.78)+'" text-anchor="middle" font-size="'+Math.max(28,w/16)+'" font-family="Inter,Arial,sans-serif" font-weight="700" fill="#0f172a">'+esc(text)+'</text>':'')+
    '</svg>';
}

export function renderSvgPreview(brief) {
  const skills=brief?.selected_skills??[];
  const svg=skills.includes("logo-design") ? logoSvg(brief) : genericSvg(brief);
  return {
    kind:"svg",
    provider:"svg",
    renderer:"deterministic-preview-v1",
    preview:true,
    mime_type:"image/svg+xml",
    svg,
    data_url:"data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg),
    editable:true
  };
}

export function createSvgExecutor() {
  return async ({ request, plan }) => {
    const brief=request?.visual_brief ?? plan?.visual_brief;
    if(!brief) throw new Error("SVG executor requires a VisualBrief");
    return renderSvgPreview(brief);
  };
}
