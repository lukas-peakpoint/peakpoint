(()=>{var b=".w-checkbox-input",v=".w-radio-input",S="w--redirected-checked",k='[data-form-element="component"]',O="form",q='[data-form-element="success"]',_='[data-form-element="error"]',D='[data-form-element="submit"]',I=`.w-checkbox input[type="checkbox"]:not(${b})`,P='.w-radio input[type="radio"]',m=`.w-input, .w-select, ${P}, ${I}`,x='[data-steps-element="component"]',$='[data-steps-element="list"]',G='[data-steps-element="step"]',B='[data-steps-element="navigation"]';var V="button[data-step-target]",z='[data-steps-nav="prev"]',j='[data-steps-nav="next"]';var K='[data-form-array-element="list"]',U='[data-person-element="template"]';var Y='[data-person-element="add"]',W='[data-person-element="save"]',J='[data-person-element="cancel"]',X="[data-person-data-group]",Z='[data-form-element="modal"]',N='[data-modal-element="scroll"]';var Q='[data-modal-element="sticky-bottom"]',ee='[data-animate="accordion"]';var te=document.documentElement.dataset.wfSite||"",se=document.documentElement.dataset.wfPage||"",T=class{component;trigger;uiTrigger;isOpen=!1;icon;constructor(e){this.component=e,this.trigger=e.querySelector('[data-animate="trigger"]'),this.uiTrigger=e.querySelector('[data-animate="ui-trigger"]'),this.icon=e.querySelector('[data-animate="icon"]'),this.uiTrigger.addEventListener("click",()=>{this.toggle()})}open(){this.isOpen||(this.trigger.click(),setTimeout(()=>{this.icon.classList.add("is-open")},200),this.isOpen=!0)}close(){this.isOpen&&(this.trigger.click(),setTimeout(()=>{this.icon.classList.remove("is-open")},200),this.isOpen=!1)}toggle(){this.isOpen?this.close():this.open()}scrollIntoView(){let e=0,t=this.component.closest(N),s=this.uiTrigger.getBoundingClientRect().top;if(t){let o=t.getBoundingClientRect().top;e=t.querySelector('[data-scroll-child="sticky"]').clientHeight,t.scrollBy({top:s-o-e-2,behavior:"smooth"})}else window.scrollTo({top:s+window.scrollY-e-2,behavior:"smooth"})}},u=class{fields;constructor(e=new Map){this.fields=e}getField(e){return this.fields.get(e)}},y=class{personalData;doctor;health;primaryRelative;secondaryRelative;constructor(e=new u,t=new u,s=new u,o=new u,n=new u){this.personalData=e,this.doctor=t,this.health=s,this.primaryRelative=o,this.secondaryRelative=n}validate(){let e=!0;return Object.keys(this).forEach(s=>{let o=this[s];o.fields&&o.fields.forEach(n=>{if(n instanceof h)n.validate(!0)||(e=!1);else{console.error('Validate Person: field object is not of instance "Field"');return}})}),e}getFullName(){return`${this.personalData.getField("first-name").value} ${this.personalData.getField("name").value}`.trim()||"Neue Person"}serialize(){return{personalData:p(this.personalData.fields),doctor:p(this.doctor.fields),health:p(this.health.fields),primaryRelative:p(this.primaryRelative.fields),secondaryRelative:p(this.secondaryRelative.fields)}}flatten(e){let t={},s=Object.keys(this);for(let o of s)this[o].fields.forEach((r,l)=>{let a=`${e}_${o}_${r.id}`;t[a]=r.value});return t}};function oe(i){let e=new Map;return Object.entries(i).forEach(([t,s])=>{let o=new h(s);e.set(t,o)}),e}function f(i){let e=oe(i);return new u(e)}function ie(i){return new y(f(i.personalData),f(i.doctor),f(i.health),f(i.primaryRelative),f(i.secondaryRelative))}var h=class{id;label;value;required;type;checked;constructor(e=null){e&&(this.id=e.id||`field-${Math.random().toString(36).substring(2)}`,this.label=e.label||"Unnamed Field",this.value=e.value||"",this.required=e.required||!1,this.type=e.type||"text",this.type,this.checked=e.checked||!1,this.type==="checkbox"&&!this.checked&&(console.log(this.label,this.type,this.checked,e.checked),this.value="Nicht angew\xE4hlt"))}validate(e=!0){let t=!0;return this.required&&(this.type==="radio"||this.type==="checkbox"?this.checked||(t=!1):this.value.trim()||(t=!1)),!t&&e&&console.warn(`Field "${this.label}" is invalid.`),t}};function R(i,e){return i.type==="radio"&&!i.checked?new h:new h({id:i.id||ne(i.dataset.name||`field ${e}`),label:i.dataset.name||`field ${e}`,value:i.value,required:i.required||!1,type:i.type,checked:E(i)||g(i)?i.checked:void 0})}var L=class{messageFor;component;messageElement;constructor(e,t){this.messageFor=t;let s=document.querySelector(`[data-message-component="${e}"][data-message-for="${this.messageFor}"]`);if(!s){console.warn("No FormMessage component was found.");return}this.component=s,this.messageElement=this.component?.querySelector('[data-message-element="message"]')||null,this.reset()}info(e=null,t=!1){t||this.component.setAttribute("aria-live","polite"),this.setMessage(e,"info",t)}error(e=null,t=!1){t||(this.component.setAttribute("role","alert"),this.component.setAttribute("aria-live","assertive")),this.setMessage(e,"error",t)}reset(){this.component.classList.remove("info","error")}setMessage(e=null,t,s=!1){this.messageElement&&e?this.messageElement.textContent=e:this.messageElement||console.warn("Message text element not found."),this.component.classList.remove("info","error"),this.component.classList.add(t),!s&&this.component.scrollIntoView({behavior:"smooth",block:"center"})}},M=class{form;container;groupNames;validationMessage;formMessage;constructor(e,t,s){this.container=e,this.groupNames=t,this.validationMessage=s;let o=this.getAllGroupFields()[0].closest("form");if(!o){console.error("Cannot construct a FormGroup that is not part of a form.");return}this.form=o,this.formMessage=new L("FormGroup",this.groupNames.join(",")),this.initialize()}initialize(){this.getAllGroupFields().forEach(t=>{t.addEventListener("change",()=>this.formMessage.reset())})}getGroupFields(e){return this.container.querySelectorAll(`[data-form-group="${e}"]`)}getAllGroupFields(){let t=this.groupNames.map(s=>`[data-form-group="${s}"]`).join(", ");return this.container.querySelectorAll(t)}validate(){console.log("VALIDATING FORM GROUPS: ",this.groupNames);let e=this.checkGroupValidity();return this.handleValidationMessages(e),console.log(e),e}checkGroupValidity(){return this.groupNames.some(e=>Array.from(this.getGroupFields(e)).some(s=>E(s)||g(s)?s.checked:s.value.trim()!==""))}updateRequiredAttributes(e){this.getAllGroupFields().forEach(s=>{s.required=!e}),this.formMessage.reset()}handleValidationMessages(e){e?this.formMessage.reset():this.formMessage.error()}},F=class{id;people;container;list;template;formMessage;addButton;modal;modalForm;saveButton;cancelButtons;modalInputs;groupElements;accordionList=[];editingKey=null;constructor(e,t){this.id=t,this.container=e,this.people=new Map,this.list=this.container.querySelector(K),this.template=this.list.querySelector(U),this.addButton=this.container.querySelector(Y),this.formMessage=new L("FormArray",this.id.toString()),this.modal=document.querySelector(Z+'[data-modal-for="person"]'),this.modalForm=document.querySelector(O),this.saveButton=this.modal.querySelector(W),this.cancelButtons=this.modal.querySelectorAll(J),this.modalInputs=this.modal.querySelectorAll(m),this.groupElements=this.modal.querySelectorAll(X),this.initialize()}initialize(){this.cancelButtons.forEach(t=>{t.addEventListener("click",()=>this.handleCancel())}),this.modalInputs.forEach(t=>{t.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),this.savePersonFromModal())})}),this.addButton.addEventListener("click",()=>this.handleAddButtonClick()),this.saveButton.addEventListener("click",()=>this.savePersonFromModal()),this.renderList(),this.closeModal();let e=this.container.querySelectorAll(ee);for(let t=0;t<e.length;t++){let s=e[t];s.dataset.index=t.toString();let o=new T(s);this.accordionList.push(o),o.uiTrigger.addEventListener("click",()=>{this.openAccordion(t),setTimeout(()=>{o.scrollIntoView()},500)})}this.openAccordion(0),this.initModal()}initModal(){let e=this.modal.querySelector(N),t=this.modal.querySelector(Q);if(!e||!t){console.warn("Init modal: required scroll elements not found");return}e.addEventListener("scroll",()=>{let s=e.scrollHeight,o=e.scrollTop,n=e.clientHeight,r=s-o<=n+1;console.log("Is scrolled to bottom:",r),r?t.classList.remove("modal-scroll-shadow"):t.classList.add("modal-scroll-shadow")})}openAccordion(e){for(let t=0;t<this.accordionList.length;t++){let s=this.accordionList[t];t===e&&!s.isOpen?s.open():t!==e&&s.isOpen&&s.close()}}handleCancel(){let e=new Promise(()=>{});this.closeModal()}handleAddButtonClick(){this.clearModal(),this.setLiveText("state","Hinzuf\xFCgen"),this.setLiveText("full-name","Neue Person"),this.openModal(),this.editingKey=null}savePersonFromModal(e=!0){if(!this.validateModal(e)&&(console.warn("Couldn't save person. Please fill in all the values correctly."),e))return null;let s=this.extractData();this.savePerson(s)&&(this.renderList(),this.closeModal()),this.saveProgress()}savePerson(e){if(this.editingKey!==null)this.people.set(this.editingKey,e);else{let t=crypto.randomUUID(),s=`person${this.people.size+1}`;this.people.set(s,e)}return!0}setLiveText(e,t){let s=this.modal.querySelectorAll(`[data-live-text="${e}"]`),o=!0;for(let n of s){if(!n){o=!1;break}n.innerText=t}return o}renderList(){this.list.innerHTML="",this.list.dataset.length=this.people.size.toString(),this.people.size?(this.people.forEach((e,t)=>this.renderPerson(e,t)),this.formMessage.reset()):this.formMessage.info("Bitte f\xFCgen Sie die Mieter (max. 2 Personen) hinzu.")}renderPerson(e,t){let s=this.template.cloneNode(!0),o=["full-name","phone","email","street","zip","city"];s.style.removeProperty("display");let n=s.querySelector('[data-person-action="edit"]'),r=s.querySelector('[data-person-action="delete"]');n.addEventListener("click",()=>{this.setLiveText("state","bearbeiten"),this.setLiveText("full-name",e.getFullName()||"Neue Person"),this.populateModal(e),this.openModal(),this.editingKey=t}),r.addEventListener("click",()=>{this.people.delete(t),this.renderList(),this.closeModal(),this.saveProgress()}),o.forEach(l=>{let a=`[data-${l}]`,d=s.querySelector(a);if(d&&l==="full-name")d.innerText=e.getFullName();else if(d){let c=e.personalData.getField(l);if(!c){console.error(`Render person: A field for "${l}" doesn't exist.`);return}d.innerText=c.value||c.label}}),this.list.appendChild(s)}populateModal(e){this.groupElements.forEach(t=>{let s=t.querySelectorAll(m),o=t.dataset.personDataGroup;s.forEach(n=>{let r=e[o].getField(n.id);if(!r){console.warn("Field not found:",r,n.id);return}if(!g(n)&&!E(n)){n.value=r.value.trim();return}g(n)&&n.value===r.value&&(n.checked=r.checked,n.dispatchEvent(new Event("change",{bubbles:!0}))),E(n)&&(n.checked=r.checked,n.dispatchEvent(new Event("change",{bubbles:!0})))})})}validateArray(){let e=!0;return this.people.size===0?(console.warn("Bitte f\xFCgen Sie mindestens eine mietende Person hinzu."),this.formMessage.error("Bitte f\xFCgen Sie mindestens eine mietende Person hinzu."),setTimeout(()=>this.formMessage.info("Bitte f\xFCgen Sie die Mieter (max. 2 Personen) hinzu.",!0),5e3),e=!1):this.people.forEach((t,s)=>{t.validate()||(console.warn(`Bitte f\xFCllen Sie alle Felder f\xFCr "${t.getFullName()}" aus.`),this.formMessage.error(`Bitte f\xFCllen Sie alle Felder f\xFCr "${t.getFullName()}" aus.`),e=!1)}),e}openModal(){this.modal.querySelector('[data-person-data-group="personalData"]').querySelectorAll("#first-name, #name").forEach(s=>{s.addEventListener("input",()=>{let o=this.extractData();this.setLiveText("full-name",o.getFullName()||"Neue Person")})}),this.formMessage.info(void 0,!0),this.openAccordion(0),this.modal.style.removeProperty("display"),this.modal.classList.remove("is-closed"),this.modal.dataset.state="open",document.body.style.overflow="hidden"}closeModal(){document.body.style.removeProperty("overflow"),this.modal.classList.add("is-closed"),this.modal.dataset.state="closed",this.list.scrollIntoView({behavior:"smooth",block:"center"}),setTimeout(()=>{this.modal.style.display="none"},500),this.clearModal()}clearModal(){this.setLiveText("state","hinzuf\xFCgen"),this.setLiveText("full-name","Neue Person"),this.modalInputs.forEach(e=>{g(e)?(e.checked=!1,de(this.modal,e.name)):E(e)?(e.checked=!1,e.dispatchEvent(new Event("change",{bubbles:!0}))):e.value=""})}validateModal(e=!0){let t=this.modal.querySelectorAll(m),{valid:s,invalidField:o}=C(t,e);if(s===!0)return!0;if(o){let n=this.accordionIndexOf(o);return n!==-1&&(this.openAccordion(n),setTimeout(()=>{o.scrollIntoView({behavior:"smooth",block:"center"})},500)),!1}return!1}accordionIndexOf(e){let t=e.closest('[data-animate="accordion"]');if(t){let s=this.accordionList.findIndex(o=>o.component===t);return s!==-1?s:-1}return-1}extractData(){let e=new y;return this.groupElements.forEach(t=>{let s=t.querySelectorAll(m),o=t.dataset.personDataGroup;if(!e[o]){console.error(`The group "${o}" doesn't exist.`);return}s.forEach((n,r)=>{let l=R(n,r);l?.id&&e[o].fields.set(l.id,l)})}),console.log(e),e}saveProgress(){let e=re(this.people);try{localStorage.setItem("formProgress",JSON.stringify(e)),console.log("Form progress saved."),console.log(e)}catch(t){console.error("Error saving form progress to localStorage:",t)}}loadProgress(){let e=localStorage.getItem("formProgress");if(e)try{let t=JSON.parse(e);for(let s in t)if(t.hasOwnProperty(s)){let o=t[s],n=ie(o);this.savePerson(n)&&(this.renderList(),this.closeModal())}console.log("Form progress loaded.")}catch(t){console.error("Error loading form progress from localStorage:",t)}else console.log("No saved form progress found.")}},w=class{component;formElement;formSteps;navigationElement;paginationItems;buttonsNext;buttonsPrev;currentStep=0;customValidators=[];peopleArray;beilagenGroup;successElement;errorElement;submitButton;settings;constructor(e,t){if(this.component=e,this.formElement=this.component.querySelector(O),this.settings=t,!this.formElement)throw new Error("Form element not found within the specified component.");this.formSteps=this.component.querySelectorAll(G),this.paginationItems=this.component.querySelectorAll(V),this.navigationElement=this.component.querySelector(B),this.buttonsNext=this.component.querySelectorAll(j),this.buttonsPrev=this.component.querySelectorAll(z),this.successElement=this.component.querySelector(q),this.errorElement=this.component.querySelector(_),this.submitButton=this.component.querySelector(D),this.initialize()}addCustomValidator(e,t){this.customValidators[e]||(this.customValidators[e]=[]),this.customValidators[e].push(t)}initialize(){if(!this.component.getAttribute("data-steps-element")){console.error(`Form Steps: Component is not a steps component or is missing the attribute ${x}.
Component:`,this.component);return}if(!this.formSteps.length){console.warn("Form Steps: The selected list doesn't contain any steps. Skipping initialization. Provided List:",this.component.querySelector($));return}ce(this.formElement),ue(this.component),pe(this.component),this.setupSteps(),this.initPagination(),this.changeToStep(this.currentStep,!0),this.peopleArray=new F(this.component,"personArray"),this.beilagenGroup=new M(this.component,["upload","post"],"validation message"),this.peopleArray.loadProgress(),this.addCustomValidator(3,()=>this.beilagenGroup.validate()),this.addCustomValidator(2,()=>this.peopleArray.validateArray()),this.component.addEventListener("changeStep",()=>this.peopleArray.closeModal()),this.formElement.setAttribute("novalidate",""),this.formElement.dataset.state="initialized",this.formElement.addEventListener("submit",e=>{e.preventDefault(),this.submitToWebflow()})}async submitToWebflow(){if(this.currentStep!==this.formSteps.length-1){console.error("SUBMIT ERROR: the current step is not the last step. Can only submit the MultiStepForm in the last step.");return}if(!this.validateAllSteps()){console.warn("Form submission blocked: Not all steps are valid.");return}this.formElement.dataset.state="sending",this.submitButton&&(this.submitButton.dataset.defaultText=this.submitButton.value,this.submitButton.value=this.submitButton.dataset.wait||"Wird gesendet ...");let t=this.buildJsonForWebflow();console.log(t),await ae(t)?this.onFormSuccess():this.onFormError()}buildJsonForWebflow(){let e=this.formElement.querySelector("#g-recaptcha-response").value;return{name:this.formElement.dataset.name,pageId:se,elementId:this.formElement.dataset.wfElementId,source:window.location.href,test:!1,fields:{...p(this.getAllFormData(),!1),...le(this.peopleArray.people),"g-recaptcha-response":e},dolphin:!1}}onFormSuccess(){this.successElement&&(this.successElement.style.display="block"),this.formElement.style.display="none",this.formElement.dataset.state="success",this.formElement.dispatchEvent(new CustomEvent("formSuccess")),this.submitButton&&(this.submitButton.value=this.submitButton.dataset.defaultText||"Submit")}onFormError(){this.errorElement&&(this.errorElement.style.display="block"),this.formElement.dataset.state="error",this.formElement.dispatchEvent(new CustomEvent("formError")),this.submitButton&&(this.submitButton.value=this.submitButton.dataset.defaultText||"Submit")}setupSteps(){this.formSteps.forEach((e,t)=>{e.dataset.stepId=t.toString(),e.classList.toggle("hide",t!==this.currentStep),e.querySelectorAll(m).forEach(s=>{s.addEventListener("keydown",o=>{o.key==="Enter"&&(o.preventDefault(),this.changeToNext())})})})}initPagination(){this.paginationItems.forEach((e,t)=>{e.dataset.stepTarget=t.toString(),e.addEventListener("click",s=>{s.preventDefault(),this.changeToStep(t)})}),this.buttonsNext.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.changeToNext()})}),this.buttonsPrev.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.changeToPrevious()})})}changeToNext(){this.currentStep<this.formSteps.length-1&&this.changeToStep(this.currentStep+1)}changeToPrevious(){this.currentStep>0&&this.changeToStep(this.currentStep-1)}changeToStep(e,t=!1){if(this.currentStep===e&&!t){console.log("Change Form Step: Target step equals current step."),console.log(`Step ${this.currentStep+1}/${this.formSteps.length}`);return}if(e>this.currentStep&&!t){for(let o=this.currentStep;o<e;o++)if(!this.validateCurrentStep(o)){console.warn(`Standard validation failed for step: ${o+1}/${this.formSteps.length}`),this.changeToStep(o);return}this.component.scrollIntoView({behavior:"smooth",block:"start"})}let s=new CustomEvent("changeStep",{detail:{previousStep:this.currentStep,currentStep:e}});this.component.dispatchEvent(s),this.updateStepVisibility(e),this.updatePagination(e),this.currentStep=e,console.log(`Step ${this.currentStep+1}/${this.formSteps.length}`)}updateStepVisibility(e){this.formSteps[this.currentStep].classList.add("hide"),this.formSteps[e].classList.remove("hide")}updatePagination(e){console.log(`UPDATE PAGINATION TARGET = ${e}`),this.buttonsPrev.forEach(t=>{e===0?(t.style.visibility="hidden",t.style.opacity="0"):(t.style.visibility="visible",t.style.opacity="1")}),this.buttonsNext.forEach(t=>{e===this.formSteps.length-1?(t.style.visibility="hidden",t.style.opacity="0"):(t.style.visibility="visible",t.style.opacity="1")}),e===this.settings.navigation.hideInStep?(this.navigationElement.style.visibility="hidden",this.navigationElement.style.opacity="0"):(this.navigationElement.style.removeProperty("visibility"),this.navigationElement.style.removeProperty("opacity")),this.paginationItems.forEach((t,s)=>{t.classList.toggle("is-done",s<e),t.classList.toggle("is-active",s===e)})}validateAllSteps(){let e=!0;return this.formSteps.forEach((t,s)=>{this.validateCurrentStep(s)||(console.warn(`Step ${s+1} is invalid.`),e=!1,this.changeToStep(s))}),e}validateCurrentStep(e){let s=this.formSteps[e].querySelectorAll(m),{valid:o,invalidField:n}=C(s);if(!o)return console.warn("STANDARD VALIDATION: NOT VALID"),o;let r=this.customValidators[e]?.every(l=>l())??!0;return r||console.warn("CUSTOM VALIDATION: NOT VALID"),o&&r}getFormDataForStep(e){let t=new Map;return this.formSteps[e].querySelectorAll(m).forEach((n,r)=>{let l=R(n,r);l?.id&&t.set(l.id,l.value)}),t}getAllFormData(){let e=new Map;return this.formSteps.forEach((t,s)=>{let o=this.getFormDataForStep(s);e=new Map([...e,...o])}),e}};function ne(i){return i.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-+/g,"-")}function p(i,e=!1){let t={};for(let[s,o]of i)t[s]=o instanceof Map?p(o,e):e?JSON.stringify(o):o;return t}function re(i){let e={};for(let[t,s]of i)e[t]=s.serialize();return e}function le(i){let e={};for(let[t,s]of i)e={...e,...s.flatten(t)};return e}function g(i){return i instanceof HTMLInputElement&&i.type==="radio"}function E(i){return i instanceof HTMLInputElement&&i.type==="checkbox"}async function ae(i){let e=`https://webflow.com/api/v1/form/${te}`,t={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json, text/javascript, */*; q=0.01"},body:JSON.stringify(i)};try{let s=await fetch(e,t);if(!s.ok)throw new Error(`Network response "${s.status}" was not okay`);return console.log("Form submission success! Status",s.status),!0}catch(s){return console.error("Form submission failed:",s),!1}}function ce(i){i.querySelectorAll("button").forEach(t=>{t.setAttribute("type","button"),t.addEventListener("click",s=>{})})}function de(i,e){i.querySelectorAll(`${P}[name="${e}"]`).forEach(t=>{t.checked=!1;let s=t.closest(".w-radio")?.querySelector(v);s&&s.classList.remove(S)})}function ue(i){let e="w--redirected-focus",t="w--redirected-focus-visible",s=":focus-visible, [data-wf-focus-visible]",o=[["checkbox",b],["radio",v]];i.querySelectorAll(I).forEach(n=>{n.addEventListener("change",r=>{let l=r.target,a=l.closest(".w-checkbox")?.querySelector(b);a&&a.classList.toggle(S,l.checked)})}),i.querySelectorAll('input[type="radio"]').forEach(n=>{n.addEventListener("change",r=>{let l=r.target;if(!l.checked)return;let a=l.name;i.querySelectorAll(`input[type="radio"][name="${a}"]`).forEach(c=>{let A=c.closest(".w-radio")?.querySelector(v);A&&A.classList.remove(S)});let d=l.closest(".w-radio")?.querySelector(v);d&&d.classList.add(S)})}),o.forEach(([n,r])=>{i.querySelectorAll(`input[type="${n}"]:not(${r})`).forEach(l=>{l.addEventListener("focus",a=>{let d=a.target,c=d.closest(".w-checkbox, .w-radio")?.querySelector(r);c&&(c.classList.add(e),d.matches(s)&&c.classList.add(t))}),l.addEventListener("blur",a=>{let c=a.target.closest(".w-checkbox, .w-radio")?.querySelector(r);c&&c.classList.remove(e,t)})})})}function pe(i){i.querySelectorAll("[data-decision-group]").forEach(t=>{let s=t.querySelectorAll("input[data-decision]"),o=t.dataset.decisionGroup,n=document.querySelector(`[data-decision-extra-fields="${o}"]`);if(s.length===0){console.error(`Decision group "${o}" does not contain any decision input elements.`);return}if(!n){console.error(`Extra fields container for decision group "${o}" not found.`);return}n.style.display="none",t.addEventListener("change",r=>{let l=r.target;l.matches("input[data-decision]")&&l.dataset.decision==="show"?n.style.display="block":n.style.display="none"})})}function C(i,e=!0){let t=!0,s=null;for(let o of i)if(o.checkValidity())o.classList.remove("has-error");else{t=!1,e&&!s&&(o.reportValidity(),o.classList.add("has-error"),o.addEventListener("change",()=>{o.classList.remove("has-error")},{once:!0}),s=o);break}return{valid:t,invalidField:s}}window.PEAKPOINT={};var H=document.querySelector(k);H?.classList.remove("w-form");document.addEventListener("DOMContentLoaded",()=>{if(window.location.search){let e=new URLSearchParams(window.location.search),t=document.querySelector("#wohnung"),s=e.get("wohnung"),o=t.querySelector(`option[value="${s}"]`);s&&o?t.value=s:console.warn(`No matching option for value: ${s}`)}let i=new w(H,{navigation:{hideInStep:0}});console.log("Form initialized:",i)});})();
