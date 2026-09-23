const cursor=document.getElementById('cursor'), dot=document.getElementById('cursorDot');
window.addEventListener('mousemove',e=>{
  cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
  dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';
});
document.querySelectorAll('a,button,.project,.magnetic').forEach(el=>{
  el.addEventListener('mouseenter',()=>cursor.classList.add('active'));
  el.addEventListener('mouseleave',()=>cursor.classList.remove('active'));
});

const menu=document.getElementById('menu'), nav=document.getElementById('navLinks');
menu.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const progress=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=(window.scrollY/h*100)+'%';
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      entry.target.querySelectorAll?.('.bar i').forEach(i=>i.style.width=i.dataset.width);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.querySelectorAll('.bar i').forEach(i=>{
  const obs=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting)i.style.width=i.dataset.width;
  },{threshold:.5});obs.observe(i);
});

document.getElementById('year').textContent=new Date().getFullYear();

document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  alert('Thanks! Connect this form to your email service before publishing.');
});

document.querySelectorAll('.project-link').forEach(p=>{
  p.addEventListener('click',e=>{
    if(p.getAttribute('href')==='#')e.preventDefault();
  });
});
