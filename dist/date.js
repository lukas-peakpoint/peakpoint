function s(t,n="d-mmmm-yyyy"){let e=t.getDate(),a=t.toLocaleString("default",{month:"long"}),o=t.getFullYear();return n==="d-mmmm"?`${e}. <span class="monthclass">${a}</span>`:`${e}. <span class="monthclass">${a}</span> ${o}`}function d(){return s(new Date)}function r(){let t=new Date,n=t.getDay(),e=new Date(t),a=new Date(t);return e.setDate(t.getDate()-(n===0?6:n-1)),a.setDate(e.getDate()+6),`${s(e,"d-mmmm")} \u2013 ${s(a)}`}var c=d(),l=r(),m=document.querySelectorAll("[data-date]");m.forEach(t=>{t.dataset.date==="current-week"?(t.innerHTML=l,t.dataset.date="initialized"):t.dataset.date==="today"?(t.innerHTML=c,t.dataset.date="initialized"):t.dataset.date="failed"});
