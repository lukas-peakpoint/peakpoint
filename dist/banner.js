var s={lounge:"/limmathof-lounge",thaiGarden:"/thai-garden"},c=document.querySelector('[pp-type="nav-wrapper"]'),i=c.querySelector('[pp-type="infobanner-wrapper"]'),o=i.querySelectorAll("[banner-type]:not(:has(.w-dyn-empty))"),r=window.location.pathname;function d(){if(!o.length)return;let n=!1,a=Object.values(s).some(e=>r.includes(e));o.forEach(e=>{let t=e.getAttribute("banner-type");r.includes(s[t])&&(n=!0)}),o.forEach(e=>{let t=e.getAttribute("banner-type");t==="default"?!a||!n?(e.classList.add("show"),l(e)):e.classList.add("hide"):r.includes(s[t])?(e.classList.add("show"),l(e)):e.classList.add("hide")})}function l(n){n=n.querySelector(".marquee_track");let t=n.offsetWidth/100;return n.style.animationDuration=`${t}s`,t}function u(){document.querySelector("main").querySelectorAll(".marquee_component").forEach(a=>l(a))}window.addEventListener("DOMContentLoaded",()=>{d(),u(),console.log("manage banners done")});
//# sourceMappingURL=banner.js.map
