window.matchMedia("(min-width: 768px)").matches&&document.querySelectorAll('[pp-tabs="tabs-component"]').forEach(r=>{let A=r.querySelector('[pp-tabs="all-tab-panes"]'),s=r.querySelectorAll('[pp-tabs="tabpane"]'),o=r.querySelector('[pp-tabs="tablist"]'),i=o.querySelectorAll('[pp-tabs="tab"]');function l(){i.forEach(t=>{t.classList.remove("active"),t.setAttribute("aria-selected","false"),t.setAttribute("tabindex","-1")}),s.forEach(t=>{t.classList.remove("active"),t.setAttribute("pp-hidden","true")})}function c(t){let e=t.getAttribute("aria-controls"),a=r.querySelector(`#${e}`);t.classList.add("active"),t.setAttribute("aria-selected","true"),t.setAttribute("tabindex","0"),a&&(a.classList.add("active"),a.removeAttribute("pp-hidden"))}function b(t){let u=-(Array.from(i).indexOf(t)*45+90);i.forEach((d,f)=>{let n=f*45+u;d.style.transform=`rotate(${n}deg) translate(calc(var(--circle--circle-size) / 2)) rotate(${-n}deg)`})}i.forEach((t,e)=>{t.setAttribute("role","tab"),t.setAttribute("aria-selected","false"),t.setAttribute("tabindex","-1"),t.setAttribute("aria-controls",`tabpane-${e}`),s[e].setAttribute("id",`tabpane-${e}`),s[e].setAttribute("role","tabpanel"),s[e].setAttribute("pp-hidden","true"),e++}),s.forEach((t,e)=>{t.setAttribute("id",`tabpane-${e}`),e++}),i.forEach(t=>{t.addEventListener("click",()=>{l(),c(t),b(t)}),t.addEventListener("keydown",e=>{if(e.key==="ArrowRight"){let a=t.nextElementSibling||o.firstElementChild;a.focus(),a.click()}else if(e.key==="ArrowLeft"){let a=t.previousElementSibling||o.lastElementChild;a.focus(),a.click()}})}),i.length>0&&c(i[0])});
