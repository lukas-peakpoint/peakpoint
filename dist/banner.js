var s={lounge:"/limmathof-lounge",thaiGarden:"/thai-garden"},c=document.querySelector('[pp-type="nav-wrapper"]'),i=c.querySelector('[pp-type="infobanner-component"]'),o=i.querySelectorAll("[banner-type]:not(:has(.w-dyn-empty))"),r=window.location.pathname;function d(){if(!o.length)return;let t=!1,a=Object.values(s).some(e=>r.includes(e));o.forEach(e=>{let n=e.getAttribute("banner-type");r.includes(s[n])&&(t=!0)}),o.forEach(e=>{let n=e.getAttribute("banner-type");n==="default"?!a||!t?(e.classList.add("show"),l(e)):e.classList.add("hide"):r.includes(s[n])?(e.classList.add("show"),l(e)):e.classList.add("hide")})}function l(t){t=t.querySelector(".marquee_track");let n=t.offsetWidth/100;return t.style.animationDuration=`${n}s`,n}function u(){document.querySelector("main").querySelectorAll(".marquee_component").forEach(a=>l(a))}window.addEventListener("DOMContentLoaded",()=>{d(),u()});
//# sourceMappingURL=banner.js.map
