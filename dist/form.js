(()=>{var r='[data-form-element="component"]',E="form",f='[data-form-element="success"]',T='[data-form-element="error"]',L='[data-form-element="submit"]',S=".w-input, .w-select",p=document.documentElement.dataset.wfSite||"",y=document.documentElement.dataset.wfPage||"";function h(e){e.style.height=e.offsetHeight.toString();let t=e.cloneNode(!0);return t.dataset.replaced="true",e.parentNode.replaceChild(t,e),t.style.removeProperty("height"),t}function g(e){if(!e)return console.error("Form component not found:",r),!1;e=h(e),e.classList.remove("w-form");let t=e.querySelector(E);return t?(t.dataset.state="initialized",e.addEventListener("submit",o=>{o.preventDefault(),t.dataset.state="sending",M(e,t)}),!0):(console.error(`The selected form component does not contain a HTMLFormElement. Perhaps you added ${r} to the form element itself rather than its parent element?

Form Component:`,e),!1)}async function w(e){let t=`https://webflow.com/api/v1/form/${p}`,o={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json, text/javascript, */*; q=0.01"},body:JSON.stringify(e)};try{let s=await fetch(t,o);if(!s.ok)throw new Error(`Network response "${s.status}" was not okay`);return console.log("Form submission success! Status",s.status),!0}catch(s){return console.error("Form submission failed:",s),!1}}async function M(e,t){function o(){l&&(l.style.display="block"),t.style.display="none",t.dataset.state="success",t.dispatchEvent(new CustomEvent("formSuccess"))}function s(){i&&(i.style.display="block"),t.dataset.state="error",t.dispatchEvent(new CustomEvent("formError"))}let a={customSubmit:!0},u=t.querySelectorAll(S),l=e.querySelector(f),i=e.querySelector(T),n=e.querySelector(L);n.dataset.defaultText=n.value,n.value=n.dataset.wait||"Wird gesendet ...",u.forEach((c,m)=>{a[c.dataset.name||`Field ${m}`]=c.value});let d={name:t.dataset.name,pageId:y,elementId:t.dataset.wfElementId,source:window.location.href,test:!1,fields:a,dolphin:!1};await w(d)?(o(),n.value=n.dataset.defaultText):s()}document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(r),t=g(e);console.log("Form Initialized:",t)});})();
