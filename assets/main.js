document.documentElement.classList.add('js');
const b=document.querySelector('.burger'),m=document.getElementById('menu');
b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);});
m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{m.classList.remove('open');b.setAttribute('aria-expanded','false');}));
const f=document.querySelector('.form');f.addEventListener('submit',e=>{e.preventDefault();const em=f.querySelector('#em');if(!em.checkValidity()){em.focus();em.setAttribute('aria-invalid','true');return;}f.querySelector('.ok').hidden=false;});
const els=document.querySelectorAll('.rv');
if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));}
else{const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}}),{rootMargin:'0px 0px -8% 0px'});els.forEach(e=>io.observe(e));}
// lazy hero video + parallax
const rm=matchMedia('(prefers-reduced-motion: reduce)').matches;
const v=document.querySelector('.hvid');
if(v&&!rm&&!(navigator.connection&&navigator.connection.saveData)){const go=()=>{v.src=v.dataset.src;v.play().catch(()=>{})};'requestIdleCallback'in window?requestIdleCallback(go,{timeout:1500}):setTimeout(go,800);}
const par=document.querySelectorAll('[data-par]');
if(!rm&&par.length){let t=0;addEventListener('scroll',()=>{if(t)return;t=requestAnimationFrame(()=>{t=0;const y=scrollY;par.forEach(e=>e.style.transform=`translate3d(0,${y*e.dataset.par}px,0)`);});},{passive:true});}
