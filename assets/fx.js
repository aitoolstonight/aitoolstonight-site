import * as THREE from 'three';
import {EffectComposer} from 'three/addons/postprocessing/EffectComposer.js';
import {RenderPass} from 'three/addons/postprocessing/RenderPass.js';
import {UnrealBloomPass} from 'three/addons/postprocessing/UnrealBloomPass.js';
const cv=document.getElementById('core3d');
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile=matchMedia('(max-width: 820px)').matches||matchMedia('(pointer: coarse)').matches;
if(cv){
const r=new THREE.WebGLRenderer({canvas:cv,antialias:!mobile,alpha:true,powerPreference:'high-performance'});
r.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.75));
const sc=new THREE.Scene(),cam=new THREE.PerspectiveCamera(45,1,.1,100);cam.position.set(0,0,9);
const g=new THREE.Group();sc.add(g);
// core
const core=new THREE.Mesh(new THREE.IcosahedronGeometry(1.15,mobile?3:5),new THREE.MeshBasicMaterial({color:0x0b6f9a}));
const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(1.6,2),new THREE.MeshBasicMaterial({color:0x9b6bff,wireframe:true,transparent:true,opacity:.35}));
const shell=new THREE.Mesh(new THREE.IcosahedronGeometry(2.2,1),new THREE.MeshBasicMaterial({color:0x29e6ff,wireframe:true,transparent:true,opacity:.12}));
g.add(core,wire,shell);
const rings=[];[[2.7,0x29e6ff,1.2],[3.3,0x9b6bff,.5],[3.9,0x7ff3ff,-.3]].forEach(([rad,c,tilt])=>{const m=new THREE.Mesh(new THREE.TorusGeometry(rad,.012,8,160),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.7}));m.rotation.x=Math.PI/2+tilt;g.add(m);rings.push(m)});
// particles
const N=mobile?900:3500,pos=new Float32Array(N*3),col=new Float32Array(N*3),c1=new THREE.Color(0x29e6ff),c2=new THREE.Color(0x9b6bff);
for(let i=0;i<N;i++){const rad=2.5+Math.pow(Math.random(),.6)*9,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);pos.set([rad*Math.sin(ph)*Math.cos(th),rad*Math.cos(ph)*.55,rad*Math.sin(ph)*Math.sin(th)],i*3);const c=c1.clone().lerp(c2,Math.random());col.set([c.r,c.g,c.b],i*3)}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(pos,3));pg.setAttribute('color',new THREE.BufferAttribute(col,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({map:(()=>{const c=document.createElement('canvas');c.width=c.height=32;const x=c.getContext('2d'),gr=x.createRadialGradient(16,16,0,16,16,16);gr.addColorStop(0,'#fff');gr.addColorStop(.3,'rgba(255,255,255,.6)');gr.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=gr;x.fillRect(0,0,32,32);return new THREE.CanvasTexture(c)})(),size:mobile?.12:.1,vertexColors:true,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false}));sc.add(pts);
let comp=null;
if(!mobile){comp=new EffectComposer(r);comp.addPass(new RenderPass(sc,cam));comp.addPass(new UnrealBloomPass(new THREE.Vector2(1,1),1.1,.5,.15));}
const size=()=>{const w=cv.clientWidth,h=cv.clientHeight;r.setSize(w,h,false);comp&&comp.setSize(w,h);cam.aspect=w/h;cam.updateProjectionMatrix();const hb=document.querySelector('.hud')?.getBoundingClientRect(),cb=cv.getBoundingClientRect();if(hb){const hh=Math.tan(Math.PI/8)*9;g.position.x=((hb.left+hb.width/2-cb.left)/w*2-1)*hh*cam.aspect;g.position.y=-((hb.top+hb.height/2-cb.top)/h*2-1)*hh;g.scale.setScalar(hb.width/h*hh*2/4.4)}};
size();addEventListener('resize',size);
let mx=0,my=0,sy=0,vis=true;
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
addEventListener('scroll',()=>{sy=scrollY},{passive:true});
new IntersectionObserver(([e])=>vis=e.isIntersecting).observe(cv);
const clk=new THREE.Clock();
const frame=()=>{const t=clk.getElapsedTime();
core.scale.setScalar(1+Math.sin(t*2)*.04);wire.rotation.y=t*.3;wire.rotation.x=t*.15;shell.rotation.y=-t*.1;
rings.forEach((m,i)=>m.rotation.z=t*(.2+i*.12)*(i%2?-1:1));pts.rotation.y=t*.03;
cam.position.x+=(mx*1.2-cam.position.x)*.04;cam.position.y+=(-my*.8+sy*.002-cam.position.y)*.04;cam.position.z=9+sy*.004;cam.lookAt(0,0,0);
comp?comp.render():r.render(sc,cam)};
if(rm){frame();}else{const loop=()=>{requestAnimationFrame(loop);if(vis&&!document.hidden)frame()};loop();}
}
