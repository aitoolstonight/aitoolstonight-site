document.documentElement.classList.add('js');
const b=document.querySelector('.burger'),m=document.getElementById('menu');
b.addEventListener('click',()=>{const o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);});
m.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{m.classList.remove('open');b.setAttribute('aria-expanded','false');}));
const f=document.querySelector('.form');f.addEventListener('submit',e=>{e.preventDefault();const em=f.querySelector('#em');if(!em.checkValidity()){em.focus();em.setAttribute('aria-invalid','true');return;}f.querySelector('.ok').hidden=false;});
const els=document.querySelectorAll('.rv');
if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver'in window)){els.forEach(e=>e.classList.add('in'));}
else{const io=new IntersectionObserver(es=>es.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}}),{rootMargin:'0px 0px -8% 0px'});els.forEach(e=>io.observe(e));}
