(()=>{let t="[data-player-component]",u="[data-player-video]",n='[data-player-button="play"]',c='[data-player-button="mute"]';document.addEventListener("DOMContentLoaded",()=>{let o=document.querySelector(t),e=o.querySelector(u),l=o.querySelector(n),s=o.querySelector(c);e.loop=!0,e.muted=!0,e.autoplay=!0,e.play();function r(){let a=l.querySelector('[data-player-button-state="pause"]'),d=l.querySelector('[data-player-button-state="play"]');e.paused?(e.play(),d.classList.add("hide"),a.classList.remove("hide")):(e.pause(),d.classList.remove("hide"),a.classList.add("hide"))}function i(){console.log("MUTE BUTTON PRESSED");let a=s.querySelector('[data-player-button-state="unmuted"]'),d=s.querySelector('[data-player-button-state="muted"]');e.muted?(e.muted=!1,a.classList.remove("hide"),d.classList.add("hide")):(e.muted=!0,a.classList.add("hide"),d.classList.remove("hide"))}l.addEventListener("click",r),s.addEventListener("click",i)})})();window.addEventListener("LR_UPLOAD_FINISH",t=>{console.log(t.detail),document.getElementById("uploadcare-uuid").value=t.detail.data[0].uuid,document.getElementById("uploadcare-file").value=t.detail.data[0].cdnUrl});
