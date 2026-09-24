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

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(contactForm);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {

            formMessage.style.display = "block";
            formMessage.style.color = "#4ade80";
            formMessage.textContent =
                "Message sent successfully! I'll get back to you soon.";

            contactForm.reset();

            submitButton.disabled = false;
            submitButton.textContent = "Send message ↗";

        } else {
            throw new Error("Form submission failed");
        }

    } catch (error) {

        formMessage.style.display = "block";
        formMessage.style.color = "#ff6b6b";
        formMessage.textContent =
            "Something went wrong. Please try again.";

        submitButton.disabled = false;
        submitButton.textContent = "Send message ↗";
    }
});

document.querySelectorAll('.project-link').forEach(p=>{
  p.addEventListener('click',e=>{
    if(p.getAttribute('href')==='#')e.preventDefault();
  });
});
