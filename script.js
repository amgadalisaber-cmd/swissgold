const P={"2021-10": 893.53, "2021-11": 927.0, "2021-12": 894.0, "2022-01": 916.18, "2022-02": 936.81, "2022-03": 1001.0, "2022-04": 1159.0, "2022-05": 1240.0, "2022-06": 1152.0, "2022-07": 1127.0, "2022-08": 1216.0, "2022-09": 1314.0, "2022-10": 1273.0, "2022-11": 1652.0, "2022-12": 2025.0, "2023-01": 2114.0, "2023-02": 1960.0, "2023-03": 2251.0, "2023-04": 2514.0, "2023-05": 2742.0, "2023-06": 2485.75, "2023-07": 2485.75, "2023-08": 2571.5, "2023-09": 2517.75, "2023-10": 2720.0, "2023-11": 3109.0, "2023-12": 3342.0, "2024-01": 3909.0, "2024-02": 4069.0, "2024-03": 3520.0, "2024-04": 3742.75, "2024-05": 3596.05, "2024-06": 3571.0, "2024-07": 3744.26, "2024-08": 3858.0, "2024-09": 4014.71, "2024-10": 4164.18, "2024-11": 4061.95, "2024-12": 4383.0, "2025-01": 4373.2, "2025-02": 4689.77, "2025-03": 4863.04, "2025-04": 5375.5, "2025-05": 5178.04, "2025-06": 5497.15, "2025-07": 5295.71, "2025-08": 5175.2, "2025-09": 5701.44, "2025-10": 6481.72, "2025-11": 6164.74, "2025-12": 6543.76, "2026-01": 6988.76, "2026-02": 7467.04, "2026-03": 8515.94, "2026-04": 8060.32, "2026-05": 7712.78, "2026-06": 7020.43, "2026-07": 6562.54, "2026-08": 7015.09, "2026-09": 7219.33, "2026-10": 7068.93};
const NOW=6937.14, START=new Date(Date.UTC(2022,9,15)), END=new Date(Date.UTC(2026,9,14));
const fmt=n=>Math.round(n).toLocaleString('en-US');
const inp=document.getElementById('m');
function calc(m){
  let g=0,paid=0,pts=[];const a=m;
  for(let d=new Date(START);d<=END;d.setUTCDate(d.getUTCDate()+1)){
    const k=d.getUTCFullYear()+'-'+String(d.getUTCMonth()+1).padStart(2,'0');
    g+=a/P[k];paid+=a; if(d.getUTCDate()===15)pts.push(g);
  }
  pts.push(g);return{g,paid,pts,a};
}
function draw(pts){
  const c=document.getElementById('c'),r=window.devicePixelRatio||1,w=c.clientWidth,h=c.clientHeight;
  c.width=w*r;c.height=h*r;const x=c.getContext('2d');x.scale(r,r);
  const cs=getComputedStyle(document.documentElement),gold=cs.getPropertyValue('--gold').trim(),line=cs.getPropertyValue('--line').trim(),mut=cs.getPropertyValue('--muted').trim();
  const pad=22,max=pts[pts.length-1]||1;
  x.strokeStyle=line;x.lineWidth=1;for(let i=0;i<=3;i++){const y=pad+(h-2*pad)*i/3;x.beginPath();x.moveTo(0,y);x.lineTo(w,y);x.stroke();}
  // RTL: time runs right→left
  const X=i=>w-6-(w-12)*i/(pts.length-1),Y=v=>h-pad-(h-2*pad)*v/max;
  x.beginPath();pts.forEach((v,i)=>i?x.lineTo(X(i),Y(v)):x.moveTo(X(i),Y(v)));
  x.lineTo(X(pts.length-1),h-pad);x.lineTo(X(0),h-pad);x.closePath();x.globalAlpha=.18;x.fillStyle=gold;x.fill();x.globalAlpha=1;
  x.beginPath();pts.forEach((v,i)=>i?x.lineTo(X(i),Y(v)):x.moveTo(X(i),Y(v)));x.strokeStyle=gold;x.lineWidth=3;x.stroke();
  x.beginPath();x.arc(X(pts.length-1),Y(max),5,0,7);x.fillStyle=gold;x.fill();
  x.fillStyle=mut;x.font='600 12px Tajawal, sans-serif';x.textAlign='right';x.fillText('2022',w-2,h-4);x.textAlign='left';x.fillText('2026',2,h-4);
  x.textAlign='left';x.fillText(max.toFixed(1)+' جرام',X(pts.length-1)+8,Y(max)+16);
}
function run(){
  const m=Math.max(0,+inp.value||0);const r=calc(m);const val=r.g*NOW;
  document.getElementById('d').textContent=m.toLocaleString('en-US',{maximumFractionDigits:2});
  document.getElementById('g').textContent=r.g.toFixed(2)+' جم';
  document.getElementById('paid').textContent=fmt(r.paid)+' ج';
  document.getElementById('now').textContent=fmt(val)+' جنيه';
  document.getElementById('gain').textContent='+'+fmt(val-r.paid)+' ج';
  document.getElementById('x').textContent=r.paid?(val/r.paid).toFixed(1)+'×':'—';
  document.querySelectorAll('#chips button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.v==String(m)));
  draw(r.pts);
}
inp.addEventListener('input',run);
document.getElementById('chips').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;inp.value=b.dataset.v;run();});
addEventListener('resize',run);
(document.fonts?document.fonts.ready:Promise.resolve()).then(run);run();
