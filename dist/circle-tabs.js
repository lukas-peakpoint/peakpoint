document.addEventListener("DOMContentLoaded",()=>{window.matchMedia("(min-width: 768px)").matches&&document.querySelectorAll('[pp-tabs="tabs-component"]').forEach(r=>{let A=r.querySelector('[pp-tabs="all-tab-panes"]'),i=r.querySelectorAll('[pp-tabs="tabpane"]'),o=r.querySelector('[pp-tabs="tablist"]'),s=o.querySelectorAll('[pp-tabs="tab"]');function l(){s.forEach(t=>{t.classList.remove("active"),t.setAttribute("aria-selected","false"),t.setAttribute("tabindex","-1")}),i.forEach(t=>{t.classList.remove("active"),t.setAttribute("pp-hidden","true")})}function n(t){let e=t.getAttribute("aria-controls"),a=r.querySelector(`#${e}`);t.classList.add("active"),t.setAttribute("aria-selected","true"),t.setAttribute("tabindex","0"),a&&(a.classList.add("active"),a.removeAttribute("pp-hidden"))}function b(t){let d=-(Array.from(s).indexOf(t)*45+90);s.forEach((u,f)=>{let c=f*45+d;u.style.transform=`rotate(${c}deg) translate(calc(var(--circle--circle-size) / 2)) rotate(${-c}deg)`})}s.forEach((t,e)=>{t.setAttribute("role","tab"),t.setAttribute("aria-selected","false"),t.setAttribute("tabindex","-1"),t.setAttribute("aria-controls",`tabpane-${e}`),console.log(e),console.log(i[e]),i[e].setAttribute("id",`tabpane-${e}`),i[e].setAttribute("role","tabpanel"),i[e].setAttribute("pp-hidden","true"),e++}),i.forEach((t,e)=>{t.setAttribute("id",`tabpane-${e}`),e++}),s.forEach(t=>{t.addEventListener("click",()=>{console.log("CLICK"),l(),n(t),b(t)}),t.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){let a=t.nextElementSibling||o.firstElementChild;a.focus(),a.click()}else if(e.key==="ArrowLeft"){let a=t.previousElementSibling||o.lastElementChild;a.focus(),a.click()}})}),s.length>0&&n(s[0])})});