var t={lounge:"/limmathof-lounge",thaiGarden:"/thai-garden"},s=document.querySelector('[pp-type="nav-wrapper"]'),r=s.querySelector('[pp-type="infobanner-wrapper"]'),c=r.querySelectorAll("[banner-type]"),a=window.location.pathname;function i(){Object.values(t).includes(a)&&c.forEach(e=>{let n=e.getAttribute("banner-type");a===t[n]?e.classList.toggle("show"):e.classList.toggle("hide")})}function l(){r.querySelectorAll(".marquee_track").forEach(n=>{let o=n.offsetWidth/100;n.style.animationDuration=`${o}s`})}window.addEventListener("DOMContentLoaded",()=>{i(),l()});
//# sourceMappingURL=banner.js.map
