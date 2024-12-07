(()=>{function q(o){return o.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").replace(/-+/g,"-")}var v=".w-checkbox-input",S=".w-radio-input",y="w--redirected-checked",z='[data-form-element="component"]',H="form",B='[data-form-element="success"]',$='[data-form-element="error"]',V='[data-form-element="submit"]',R=`.w-checkbox input[type="checkbox"]:not(${v})`,N='.w-radio input[type="radio"]',G=[".w-input",".w-select",N,R],p=G.join(", "),j='[data-steps-element="component"]',K='[data-steps-element="list"]',U='[data-steps-element="step"]',Y='[data-steps-element="navigation"]';var W="button[data-step-target]",J='[data-steps-nav="prev"]',X='[data-steps-nav="next"]';var Z='[data-form-array-element="list"]',Q='[data-person-element="template"]';var ee='[data-person-element="add"]',te='[data-person-element="save"]',se='[data-person-element="cancel"]',ie="[data-person-data-group]",oe='[data-form-element="modal"]',_='[data-modal-element="scroll"]';var ne='[data-modal-element="sticky-bottom"]',re='[data-animate="accordion"]',O="formProgress",ae=document.documentElement.dataset.wfSite||"",le=document.documentElement.dataset.wfPage||"",I=class{constructor(e){this.isOpen=!1;this.component=e,this.trigger=e.querySelector('[data-animate="trigger"]'),this.uiTrigger=e.querySelector('[data-animate="ui-trigger"]'),this.icon=e.querySelector('[data-animate="icon"]'),this.uiTrigger.addEventListener("click",()=>{this.toggle()})}open(){this.isOpen||(this.trigger.click(),setTimeout(()=>{this.icon.classList.add("is-open")},200),this.isOpen=!0)}close(){this.isOpen&&(this.trigger.click(),setTimeout(()=>{this.icon.classList.remove("is-open")},200),this.isOpen=!1)}toggle(){this.isOpen?this.close():this.open()}scrollIntoView(){let e=0,t=this.component.closest(_),s=this.component.getBoundingClientRect().top;if(t){let i=t.getBoundingClientRect().top;e=t.querySelector('[data-scroll-child="sticky"]').clientHeight,t.scrollBy({top:s-i-e-2,behavior:"smooth"})}else window.scrollTo({top:s+window.scrollY-e-2,behavior:"smooth"})}},u=class{constructor(e=new Map){this.fields=e}getField(e){return this.fields.get(e)}},T=class{constructor(e=new u,t=new u,s=new u,i=new u,n=new u){this.personalData=e,this.doctor=t,this.health=s,this.primaryRelative=i,this.secondaryRelative=n}validate(){let e=!0;return Object.keys(this).forEach(s=>{let i=this[s];i.fields&&i.fields.forEach(n=>{if(n instanceof f)n.validate(!0)||(e=!1);else{console.error('Validate Person: field object is not of instance "Field"');return}})}),e}getFullName(){return`${this.personalData.getField("first-name").value} ${this.personalData.getField("name").value}`.trim()||"Neue Person"}serialize(){return{personalData:m(this.personalData.fields),doctor:m(this.doctor.fields),health:m(this.health.fields),primaryRelative:m(this.primaryRelative.fields),secondaryRelative:m(this.secondaryRelative.fields)}}flatten(e){let t={},s=Object.keys(this);for(let i of s)this[i].fields.forEach((r,a)=>{let c=`${e}_${i}_${r.id}`;t[c]=r.value});return t}};function ce(o){let e=new Map;return Object.entries(o).forEach(([t,s])=>{let i=new f(s);e.set(t,i)}),e}function E(o){let e=ce(o);return new u(e)}function de(o){return new T(E(o.personalData),E(o.doctor),E(o.health),E(o.primaryRelative),E(o.secondaryRelative))}var f=class{constructor(e=null){e&&(this.id=e.id||`field-${Math.random().toString(36).substring(2)}`,this.label=e.label||"Unnamed Field",this.value=e.value||"",this.required=e.required||!1,this.type=e.type||"text",this.type,this.checked=e.checked||!1,this.type==="checkbox"&&!this.checked&&(console.log(this.label,this.type,this.checked,e.checked),this.value="Nicht angew\xE4hlt"))}validate(e=!0){let t=!0;return this.required&&(this.type==="radio"||this.type==="checkbox"?this.checked||(t=!1):this.value.trim()||(t=!1)),!t&&e&&console.warn(`Field "${this.label}" is invalid.`),t}};function D(o,e){return o.type==="radio"&&!o.checked?new f:new f({id:o.id||q(o.dataset.name||`field ${e}`),label:o.dataset.name||`field ${e}`,value:o.value,required:o.required||!1,type:o.type,checked:h(o)||b(o)?o.checked:void 0})}var M=class{constructor(e,t){this.initialized=!1;this.messageFor=t;let s=document.querySelector(`[data-message-component="${e}"][data-message-for="${this.messageFor}"]`);if(!s){console.warn(`No FormMessage component was found: ${e}, ${this.messageFor}`);return}this.component=s,this.messageElement=this.component?.querySelector('[data-message-element="message"]')||null,this.reset(),this.initialized=!0}info(e=null,t=!1){this.initialized&&(t||this.component.setAttribute("aria-live","polite"),this.setMessage(e,"info",t))}error(e=null,t=!1){this.initialized&&(t||(this.component.setAttribute("role","alert"),this.component.setAttribute("aria-live","assertive")),this.setMessage(e,"error",t))}reset(){this.initialized&&this.component.classList.remove("info","error")}setMessage(e=null,t,s=!1){this.initialized&&(this.messageElement&&e?this.messageElement.textContent=e:this.messageElement||console.warn("Message text element not found."),this.component.classList.remove("info","error"),this.component.classList.add(t),!s&&this.component.scrollIntoView({behavior:"smooth",block:"center"}))}};var F=class{constructor(e,t){this.paths=[];this.errorMessages={};this.defaultErrorMessage="Please complete the required fields.";if(!e||!t){console.error("FormDecision: Component not found.");return}else if(!e.hasAttribute("data-decision-component")){console.error("FormDecision: Selected element is not a FormDecision component:",e);return}this.component=e,this.id=t,this.formMessage=new M("FormDecision",t),this.initialize()}initialize(){let e=this.component.querySelector('[data-decision-element="decision"]')||this.component;if(this.decisionInputs=e.querySelectorAll("input[data-decision-action]"),this.decisionInputs.length===0){console.warn(`Decision component "${this.id}" does not contain any decision input elements.`);return}this.decisionInputs.forEach(t=>{let s=this.component.querySelector(`[data-decision-path="${t.dataset.decisionAction||t.value}"]`);s&&(s.style.display="none",this.paths.push(s)),t.addEventListener("change",i=>{this.handleChange(s,i),this.formMessage.reset()})}),this.component.addEventListener("change",()=>this.formMessage.reset())}handleChange(e,t){this.paths.forEach(s=>{s.style.display="none"}),e&&e.style.removeProperty("display"),this.updateRequiredAttributes()}getSelectedInput(){return Array.from(this.decisionInputs).find(e=>e.checked)}validate(){let e=this.getSelectedInput(),{valid:t}=w(this.decisionInputs);if(!t||!e)return console.warn("No decision selected!"),this.handleValidationMessages(!1),!1;let s=e.dataset.decisionAction||e.value,i=this.paths.findIndex(r=>r.dataset.decisionPath===s),n=i===-1||this.checkPathValidity(i);return this.handleValidationMessages(n),n}setErrorMessages(e,t){this.errorMessages=e,t&&(this.defaultErrorMessage=t)}checkPathValidity(e){let s=this.paths[e].querySelectorAll(p),{valid:i,invalidField:n}=w(s,!0);return i}updateRequiredAttributes(){this.paths.forEach(t=>{t.querySelectorAll("input, select, textarea").forEach(i=>{i.required=!1})});let e=this.component.querySelector("input[data-decision-action]:checked");if(e){let t=e.dataset.decisionAction||e.value,s=this.paths.find(i=>i.dataset.decisionPath===t);s&&s.querySelectorAll('[data-decision-required="required"], [data-decision-required="true"]').forEach(n=>{n.required=!0})}}handleValidationMessages(e){if(e)this.formMessage.reset();else{let t=this.getSelectedInput(),s=t?.dataset.decisionAction||t?.value,i=this.errorMessages[s]||this.defaultErrorMessage;this.formMessage.error(i)}}},A=class{constructor(e){this.initialized=!1;if(!e)throw new Error("The passed component doesn't exist.");this.component=e;let t=this.getModalContent(),s=this.getStickyFooter();!t||!s?console.warn("Initialize modal: skip sticky footer"):this.setupScrollEvent(t,s),this.initialized=!0}getModalContent(){return this.component.querySelector(_)}getStickyFooter(){return this.component.querySelector(ne)}setupScrollEvent(e,t){e.addEventListener("scroll",()=>{let{scrollHeight:s,scrollTop:i,clientHeight:n}=e;s-i<=n+1?t.classList.remove("modal-scroll-shadow"):t.classList.add("modal-scroll-shadow")})}showComponent(){this.component.style.removeProperty("display"),this.component.classList.remove("is-closed"),this.component.dataset.state="open"}hideComponent(){this.component.classList.add("is-closed"),this.component.dataset.state="closed",setTimeout(()=>{this.component.style.display="none"},500)}open(){this.showComponent(),ye()}close(){be(),this.hideComponent()}addCustomAction(e){}},C=class extends A{},P=class{constructor(e,t){this.accordionList=[];this.initialized=!1;this.editingKey=null;this.id=t,this.container=e,this.people=new Map,this.list=this.container.querySelector(Z),this.template=this.list.querySelector(Q),this.addButton=this.container.querySelector(ee),this.formMessage=new M("FormArray",this.id.toString()),this.modalForm=document.querySelector(H),this.modalElement=document.querySelector(oe+'[data-modal-for="person"]'),this.modal=new C(this.modalElement),this.saveButton=this.modalElement.querySelector(te),this.cancelButtons=this.modalElement.querySelectorAll(se),this.modalInputs=this.modalElement.querySelectorAll(p),this.groupElements=this.modalElement.querySelectorAll(ie),this.initialize()}initialize(){this.cancelButtons.forEach(t=>{t.addEventListener("click",()=>this.handleCancel())}),this.modalInputs.forEach(t=>{t.addEventListener("keydown",s=>{s.key==="Enter"&&(s.preventDefault(),this.savePersonFromModal())}),t.addEventListener("focusin",()=>{let s=this.accordionIndexOf(t);this.accordionList[s].isOpen||(this.openAccordion(s,this.accordionList),setTimeout(()=>{t.scrollIntoView({behavior:"smooth",block:"center"})},500))})}),this.saveButton.addEventListener("click",()=>this.savePersonFromModal()),this.addButton.addEventListener("click",()=>this.addPerson()),this.renderList(),this.closeModal();let e=this.container.querySelectorAll(re);for(let t=0;t<e.length;t++){let s=e[t];s.dataset.index=t.toString();let i=new I(s);this.accordionList.push(i),i.uiTrigger.addEventListener("click",()=>{this.openAccordion(t,this.accordionList),setTimeout(()=>{i.scrollIntoView()},500)})}this.openAccordion(0,this.accordionList),this.initialized=!0}handleCancel(){this.closeModal()}addPerson(){if(this.people.size===2){this.formMessage.error("Sie k\xF6nnen nur max. 2 Personen hinzuf\xFCgen."),setTimeout(()=>this.formMessage.reset(),5e3);return}this.clearModal(),this.setLiveText("state","Hinzuf\xFCgen"),this.setLiveText("full-name","Neue Person"),this.openModal(),this.editingKey=null}savePersonFromModal(e=!0){if(!this.validateModal(e)&&(console.warn("Couldn't save person. Please fill in all the values correctly."),e))return null;let s=this.extractData();this.savePerson(s)&&(this.renderList(),this.closeModal()),this.saveProgress()}savePerson(e){if(this.editingKey!==null)this.people.set(this.editingKey,e);else{let s=`person-${crypto.randomUUID()}`;this.people.set(s,e)}return!0}setLiveText(e,t){let s=this.modalElement.querySelectorAll(`[data-live-text="${e}"]`),i=!0;for(let n of Array.from(s)){if(!n){i=!1;break}n.innerText=t}return i}renderList(){this.list.innerHTML="",this.list.dataset.length=this.people.size.toString(),this.people.size?(this.people.forEach((e,t)=>this.renderPerson(e,t)),this.formMessage.reset()):this.formMessage.info("Bitte f\xFCgen Sie die Mieter (max. 2 Personen) hinzu.",!this.initialized)}renderPerson(e,t){let s=this.template.cloneNode(!0),i=["full-name","phone","email","street","zip","city"];s.style.removeProperty("display");let n=s.querySelector('[data-person-action="edit"]'),r=s.querySelector('[data-person-action="delete"]');n.addEventListener("click",()=>{this.setLiveText("state","bearbeiten"),this.setLiveText("full-name",e.getFullName()||"Neue Person"),this.populateModal(e),this.openModal(),this.editingKey=t}),r.addEventListener("click",()=>{this.people.delete(t),this.renderList(),this.closeModal(),this.saveProgress()}),i.forEach(a=>{let c=`[data-${a}]`,l=s.querySelector(c);if(l&&a==="full-name")l.innerText=e.getFullName();else if(l){let d=e.personalData.getField(a);if(!d){console.error(`Render person: A field for "${a}" doesn't exist.`);return}l.innerText=d.value||d.label}}),this.list.appendChild(s)}populateModal(e){this.groupElements.forEach(t=>{let s=t.querySelectorAll(p),i=t.dataset.personDataGroup;s.forEach(n=>{let r=e[i].getField(n.id);if(!r){console.warn("Field not found:",r,n.id);return}if(!b(n)&&!h(n)){n.value=r.value.trim();return}b(n)&&n.value===r.value&&(n.checked=r.checked,n.dispatchEvent(new Event("change",{bubbles:!0}))),h(n)&&(n.checked=r.checked,n.dispatchEvent(new Event("change",{bubbles:!0})))})})}validate(){let e=!0;return this.people.size===0?(console.warn("Bitte f\xFCgen Sie mindestens eine mietende Person hinzu."),this.formMessage.error("Bitte f\xFCgen Sie mindestens eine mietende Person hinzu."),setTimeout(()=>this.formMessage.info("Bitte f\xFCgen Sie die Mieter (max. 2 Personen) hinzu.",!0),5e3),e=!1):this.people.forEach((t,s)=>{t.validate()||(console.warn(`Bitte f\xFCllen Sie alle Felder f\xFCr "${t.getFullName()}" aus.`),this.formMessage.error(`Bitte f\xFCllen Sie alle Felder f\xFCr "${t.getFullName()}" aus.`),e=!1)}),e}openModal(){this.modalElement.querySelector('[data-person-data-group="personalData"]').querySelectorAll("#first-name, #name").forEach(s=>{s.addEventListener("input",()=>{let i=this.extractData();this.setLiveText("full-name",i.getFullName()||"Neue Person")})}),this.formMessage.reset(),this.openAccordion(0,this.accordionList),this.modal.open()}closeModal(){this.modal.close(),this.initialized&&this.list.scrollIntoView({behavior:"smooth",block:"center"}),this.clearModal()}clearModal(){this.setLiveText("state","hinzuf\xFCgen"),this.setLiveText("full-name","Neue Person"),this.modalInputs.forEach(e=>{b(e)?(e.checked=!1,fe(this.modalElement,e.name)):h(e)?(e.checked=!1,e.dispatchEvent(new Event("change",{bubbles:!0}))):e.value=""})}validateModal(e=!0){let t=this.modalElement.querySelectorAll(p),{valid:s,invalidField:i}=w(t,e);if(s===!0)return!0;if(i){let n=this.accordionIndexOf(i);return n!==-1&&(this.openAccordion(n,this.accordionList),setTimeout(()=>{i.scrollIntoView({behavior:"smooth",block:"center"})},500)),!1}return!1}openAccordion(e,t){for(let s=0;s<t.length;s++){let i=t[s];s===e&&!i.isOpen?i.open():s!==e&&i.isOpen&&i.close()}}accordionIndexOf(e){let t=e.closest('[data-animate="accordion"]');if(t){let s=this.accordionList.findIndex(i=>i.component===t);return s!==-1?s:-1}return-1}extractData(){let e=new T;return this.groupElements.forEach(t=>{let s=t.querySelectorAll(p),i=t.dataset.personDataGroup;if(!e[i]){console.error(`The group "${i}" doesn't exist.`);return}s.forEach((n,r)=>{let a=D(n,r);a?.id&&e[i].fields.set(a.id,a)})}),e}saveProgress(){let e=ue(this.people);try{localStorage.setItem(O,JSON.stringify(e)),console.log("Form progress saved."),console.log(e)}catch(t){console.error("Error saving form progress to localStorage:",t)}}clearProgress(){try{localStorage.removeItem(O)}catch(e){console.error("Error clearing form progress from localStorage:",e)}}loadProgress(){let e=localStorage.getItem(O);if(e)try{let t=JSON.parse(e);for(let s in t)if(t.hasOwnProperty(s)){let i=t[s],n=de(i);this.people.set(s,n),this.renderList(),this.closeModal()}console.log("Form progress loaded.")}catch(t){console.error("Error loading form progress from localStorage:",t)}else console.log("No saved form progress found.")}},k=class{constructor(e,t){this.currentStep=0;this.customComponents=[];this.initialized=!1;if(this.component=e,this.formElement=this.component.querySelector(H),this.settings=t,!this.formElement)throw new Error("Form element not found within the specified component.");this.formSteps=this.component.querySelectorAll(U),this.paginationItems=this.component.querySelectorAll(W),this.navigationElement=this.component.querySelector(Y),this.buttonsNext=this.component.querySelectorAll(X),this.buttonsPrev=this.component.querySelectorAll(J),this.successElement=this.component.querySelector(B),this.errorElement=this.component.querySelector($),this.submitButton=this.component.querySelector(V),this.initialize()}initialize(){if(!this.component.getAttribute("data-steps-element")){console.error(`Form Steps: Component is not a steps component or is missing the attribute ${j}.
Component:`,this.component);return}if(!this.formSteps.length){console.warn("Form Steps: The selected list doesn't contain any steps. Skipping initialization. Provided List:",this.component.querySelector(K));return}he(this.formElement),ge(this.component),this.setupSteps(),this.initPagination(),this.changeToStep(this.currentStep),this.formElement.setAttribute("novalidate",""),this.formElement.dataset.state="initialized",this.formElement.addEventListener("submit",e=>{e.preventDefault(),this.submitToWebflow()}),this.initialized=!0}addCustomComponent(e,t,s,i){let n={step:e,instance:t,validator:s,getData:i};this.customComponents.push(n)}async submitToWebflow(){if(this.currentStep!==this.formSteps.length-1){console.error("SUBMIT ERROR: the current step is not the last step. Can only submit the MultiStepForm in the last step.");return}if(!this.validateAllSteps()){console.warn("Form submission blocked: Not all steps are valid.");return}this.formElement.dataset.state="sending",this.submitButton&&(this.submitButton.dataset.defaultText=this.submitButton.value,this.submitButton.value=this.submitButton.dataset.wait||"Wird gesendet ...");let t=this.buildJsonForWebflow();console.log(t),await me(t)?this.onFormSuccess():this.onFormError()}buildJsonForWebflow(){let e=this.formElement.querySelector("#g-recaptcha-response").value,t={};return this.customComponents.map(s=>{t={...t,...s.getData?s.getData():{}}}),{name:this.formElement.dataset.name,pageId:le,elementId:this.formElement.dataset.wfElementId,source:window.location.href,test:!1,fields:{...m(this.getAllFormData(),!1),...t,"g-recaptcha-response":e},dolphin:!1}}onFormSuccess(){this.errorElement&&(this.errorElement.style.display="none"),this.successElement&&(this.successElement.style.display="block"),this.formElement.style.display="none",this.formElement.dataset.state="success",this.formElement.dispatchEvent(new CustomEvent("formSuccess")),this.submitButton&&(this.submitButton.value=this.submitButton.dataset.defaultText||"Submit")}onFormError(){this.errorElement&&(this.errorElement.style.display="block"),this.successElement&&(this.successElement.style.display="none"),this.formElement.dataset.state="error",this.formElement.dispatchEvent(new CustomEvent("formError")),this.submitButton&&(this.submitButton.value=this.submitButton.dataset.defaultText||"Submit")}setupSteps(){this.formSteps.forEach((e,t)=>{e.dataset.stepId=t.toString(),e.classList.toggle("hide",t!==this.currentStep),e.querySelectorAll(p).forEach(s=>{s.addEventListener("keydown",i=>{i.key==="Enter"&&(i.preventDefault(),this.changeToNext())})})})}initPagination(){this.paginationItems.forEach((e,t)=>{e.dataset.stepTarget=t.toString(),e.addEventListener("click",s=>{s.preventDefault(),this.changeToStep(t)})}),this.buttonsNext.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.changeToNext()})}),this.buttonsPrev.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),this.changeToPrevious()})})}changeToNext(){this.currentStep<this.formSteps.length-1&&this.changeToStep(this.currentStep+1)}changeToPrevious(){this.currentStep>0&&this.changeToStep(this.currentStep-1)}changeToStep(e){if(this.currentStep===e&&this.initialized)return;if(e>this.currentStep&&this.initialized){for(let s=this.currentStep;s<e;s++)if(!this.validateCurrentStep(s)){this.changeToStep(s);return}this.component.scrollIntoView({behavior:"smooth",block:"start"})}let t=new CustomEvent("changeStep",{detail:{previousStep:this.currentStep,currentStep:e}});this.component.dispatchEvent(t),this.updateStepVisibility(e),this.updatePagination(e),this.currentStep=e,console.log(`Step ${this.currentStep+1}/${this.formSteps.length}`)}updateStepVisibility(e){this.formSteps[this.currentStep].classList.add("hide"),this.formSteps[e].classList.remove("hide")}updatePagination(e){this.buttonsPrev.forEach(t=>{e===0?(t.style.visibility="hidden",t.style.opacity="0"):(t.style.visibility="visible",t.style.opacity="1")}),this.buttonsNext.forEach(t=>{e===this.formSteps.length-1?(t.style.visibility="hidden",t.style.opacity="0"):(t.style.visibility="visible",t.style.opacity="1")}),e===this.settings.navigation.hideInStep?(this.navigationElement.style.visibility="hidden",this.navigationElement.style.opacity="0"):(this.navigationElement.style.removeProperty("visibility"),this.navigationElement.style.removeProperty("opacity")),this.paginationItems.forEach((t,s)=>{t.classList.toggle("is-done",s<e),t.classList.toggle("is-active",s===e)})}validateAllSteps(){let e=!0;return this.formSteps.forEach((t,s)=>{this.validateCurrentStep(s)||(console.warn(`Step ${s+1} is invalid.`),e=!1,this.changeToStep(s))}),e}validateCurrentStep(e){let t=`Validation failed for step: ${e+1}/${this.formSteps.length}`,i=this.formSteps[e].querySelectorAll(p),n=Array.from(i).filter(l=>!this.settings.excludeInputSelectors.some(g=>l.closest(`${g}`)!==null||l.matches(g))),{valid:r}=w(n);if(!r)return console.warn(`${t}: Standard validation is not valid`),r;let c=this.customComponents.filter(l=>l.step===e).map(l=>()=>l.validator())?.every(l=>l())??!0;return c||console.warn(`${t}: Custom validation is not valid`),r&&c}getFormDataForStep(e){let t=new Map;return this.formSteps[e].querySelectorAll(p).forEach((n,r)=>{let a=D(n,r);a?.id&&t.set(a.id,a.value)}),t}getAllFormData(){let e=new Map;return this.formSteps.forEach((t,s)=>{let i=this.getFormDataForStep(s);e=new Map([...e,...i])}),e}};function m(o,e=!1){let t={};for(let[s,i]of o)t[s]=i instanceof Map?m(i,e):e?JSON.stringify(i):i;return t}function ue(o){let e={};for(let[t,s]of o)e[t]=s.serialize();return e}function pe(o){let e={},t=[...o.values()];for(let s=0;s<t.length;s++){let i=t[s];e={...e,...i.flatten(`person${s+1}`)}}return e}function b(o){return o instanceof HTMLInputElement&&o.type==="radio"}function h(o){return o instanceof HTMLInputElement&&o.type==="checkbox"}async function me(o){let e=`https://webflow.com/api/v1/form/${ae}`,t={method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json, text/javascript, */*; q=0.01"},body:JSON.stringify(o)};try{let s=await fetch(e,t);if(!s.ok)throw new Error(`Network response "${s.status}" was not okay`);return console.log("Form submission success! Status",s.status),!0}catch(s){return console.error("Form submission failed:",s),!1}}function he(o){o.querySelectorAll("button").forEach(t=>{t.setAttribute("type","button"),t.addEventListener("click",s=>{})})}function fe(o,e){o.querySelectorAll(`${N}[name="${e}"]`).forEach(t=>{t.checked=!1;let s=t.closest(".w-radio")?.querySelector(S);s&&s.classList.remove(y)})}function ge(o){let e="w--redirected-focus",t="w--redirected-focus-visible",s=":focus-visible, [data-wf-focus-visible]",i=[["checkbox",v],["radio",S]];o.querySelectorAll(R).forEach(n=>{n.addEventListener("change",r=>{let a=r.target,c=a.closest(".w-checkbox")?.querySelector(v);c&&c.classList.toggle(y,a.checked)})}),o.querySelectorAll('input[type="radio"]').forEach(n=>{n.addEventListener("change",r=>{let a=r.target;if(!a.checked)return;let c=a.name;o.querySelectorAll(`input[type="radio"][name="${c}"]`).forEach(d=>{let g=d.closest(".w-radio")?.querySelector(S);g&&g.classList.remove(y)});let l=a.closest(".w-radio")?.querySelector(S);l&&l.classList.add(y)})}),i.forEach(([n,r])=>{o.querySelectorAll(`input[type="${n}"]:not(${r})`).forEach(a=>{a.addEventListener("focus",c=>{let l=c.target,d=l.closest(".w-checkbox, .w-radio")?.querySelector(r);d&&(d.classList.add(e),l.matches(s)&&d.classList.add(t))}),a.addEventListener("blur",c=>{let d=c.target.closest(".w-checkbox, .w-radio")?.querySelector(r);d&&d.classList.remove(e,t)})})})}function w(o,e=!0){let t=!0,s=null;for(let i of Array.from(o))if(i.checkValidity())i.classList.remove("has-error");else{t=!1,e&&!s&&(i.reportValidity(),i.classList.add("has-error"),h(i)&&i.parentElement?.querySelector(v)?.classList.add("has-error"),i.addEventListener("change",()=>{i.classList.remove("has-error"),h(i)&&i.parentElement?.querySelector(v)?.classList.remove("has-error")},{once:!0}),s=i);break}return{valid:t,invalidField:s}}function x(o){return o?`[data-decision-component="${o}"]`:"[data-decision-component]"}function Ee(o,e,t={}){o.formSteps.forEach((s,i)=>{s.querySelectorAll(x()).forEach(r=>{let a=r.dataset.decisionComponent,c=new F(r,a);a&&e[a]&&c.setErrorMessages(e[a],t[a]),o.addCustomComponent(i,c,()=>c.validate())})})}function ve(o,e,t={}){o.querySelectorAll(x()).forEach(i=>{let n=i.dataset.decisionComponent,r=new F(i,n);n&&e[n]&&r.setErrorMessages(e[n],t[n])})}function Se(){if(window.location.search){let o=new URLSearchParams(window.location.search),e=document.querySelector("#wohnung"),t=o.get("wohnung"),s=e.querySelector(`option[value="${t}"]`);t&&s?e.value=t:console.warn(`No matching option for value: ${t}`)}}function ye(){document.body.style.overflow="hidden"}function be(){document.body.style.removeProperty("overflow")}var L=document.querySelector(z);L?.classList.remove("w-form");document.addEventListener("DOMContentLoaded",()=>{if(!L){console.error("Form not found.");return}let o=new P(L,"personArray"),e=new k(L,{navigation:{hideInStep:0},excludeInputSelectors:['[data-decision-path="upload"]',"[data-decision-component]"]});e.addCustomComponent(2,o,()=>o.validate(),()=>pe(o.people)),e.component.addEventListener("changeStep",()=>o.closeModal());let t={beilagenSenden:{upload:"Bitte laden Sie alle Beilagen hoch."}},s={beilagenSenden:'Bitte laden Sie alle Beilagen hoch oder w\xE4hlen Sie die Option "Beilagen per Post senden".'};ve(o.modalElement,t,s),Ee(e,t,s),Se(),o.loadProgress(),e.formElement.addEventListener("formSuccess",()=>{o.clearProgress()}),console.log("Form initialized:",e.initialized,e)});})();
