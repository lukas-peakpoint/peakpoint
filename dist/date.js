function o(t){let a=t.getDate(),e=t.toLocaleString("default",{month:"long"}),n=t.getFullYear();return`${a}. <span class="monthclass">${e}</span> ${n}`}function s(){return o(new Date)}function r(){let t=new Date,a=t.getDay(),e=new Date(t),n=new Date(t);return e.setDate(t.getDate()-(a===0?6:a-1)),n.setDate(e.getDate()+6),`${o(e)} \u2013 ${o(n)}`}var c=s(),d=r(),i=document.querySelectorAll("[data-date]");i.forEach(t=>{t.dataset.date==="current-week"?(t.innerHTML=d,t.dataset.date="initialized"):t.dataset.date==="today"?(t.innerHTML=c,t.dataset.date="initialized"):t.dataset.date="failed"});
