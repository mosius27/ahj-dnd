(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var s=t.g.document;if(!e&&s&&(s.currentScript&&(e=s.currentScript.src),!e)){var n=s.getElementsByTagName("script");if(n.length)for(var i=n.length-1;i>-1&&(!e||!/^http(s?):/.test(e));)e=n[i--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();t.p;class e{constructor(t){this.data=t,this.container=null,this.cardsContainerEl=null,this.addCards=null,this.forms=null,this.cancelBtns=null,this.inputs=null,this.cards=null}bindToDOM(t){if(!(t instanceof HTMLElement))throw new Error('Контейнер не является элементом "HTMLElement"');this.container=t}drawUi(){this.cardsContainerEl=document.createElement("div"),this.cardsContainerEl.classList.add("cards-container"),this.container.append(this.cardsContainerEl),this.data.forEach((t=>{const e=document.createElement("div");e.id=`${t.id}`,e.classList.add("cards-col"),e.innerHTML=`<p class="card-title">${t.title}</p>\n                   <div class="cards"></div>\n                   <div class="add-card">+ Add another card</div>\n                   <form class="new-card-form">\n                     <input type="text" class="card-input" placeholder="Enter a title for this card..." required>\n                     <div class="button-container">\n                       <button class="add-btn" type="submit">Add card</button>\n                       <button class="cancel-btn">&#10005;</button>\n                     </div>\n                   </form>\n`,this.cardsContainerEl.append(e)})),this.addCards=this.container.querySelectorAll(".add-card"),this.forms=this.container.querySelectorAll(".new-card-form"),this.cancelBtns=this.container.querySelectorAll(".cancel-btn"),this.inputs=this.container.querySelectorAll(".card-input"),this.cards=this.container.querySelectorAll(".cards")}static createCard(t,e){const s=document.createElement("div");s.classList.add("card"),s.innerHTML=`<div class="input-text">${e}</div>\n              <button class="delete-btn hidden">&#10005;</button>`,t.append(s)}static deleteCard(t){t.parentElement.remove()}checkBinding(){if(null===this.container)throw new Error("Процесс не привязан к DOM")}}const s=[{id:"todo",title:"Todo"},{id:"in-progress",title:"In progress"},{id:"done",title:"Done"}];const n={auto:"auto",drag:`url(${t.p+"assets/move_32x327536a88b206546df492b.png"}) 15 15, pointer`,noDrag:`url(${t.p+"assets/move-not_32x32611b695c3bb2347ed640.png"}) 15 15, pointer`};const i=new e(s);i.bindToDOM(document.querySelector(".page"));const r=new class{constructor(t){this.storage=t}save(t){this.storage.setItem("state",JSON.stringify(t))}load(){try{return JSON.parse(this.storage.getItem("state"))}catch(t){throw new Error("Ошибка при загрузке данных")}}}(localStorage),a=new class{constructor(t,e){this.pageUi=t,this.stateService=e,this.shiftX=null,this.shiftY=null,this.dragEl=null,this.cloneEl=null,this.toDo=null,this.inProgress=null,this.done=null}init(){document.addEventListener("DOMContentLoaded",(()=>{this.toDo=document.getElementById("todo").querySelector(".cards"),this.inProgress=document.getElementById("in-progress").querySelector(".cards"),this.done=document.getElementById("done").querySelector(".cards"),this.load()})),window.addEventListener("unload",(()=>this.save())),this.pageUi.checkBinding(),this.pageUi.drawUi(),this.pageUi.addCards.forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault();for(const t of this.pageUi.forms)t.classList.contains("active")&&t.classList.remove("active");const e=t.target.parentElement.querySelector(".new-card-form");e.classList.add("active"),e.scrollIntoView(!1)}))})),Array.from(this.pageUi.cancelBtns).forEach((t=>{t.addEventListener("click",(t=>{t.preventDefault();for(const t of this.pageUi.forms)t.classList.contains("active")&&(t.classList.remove("active"),t.reset())}))})),this.pageUi.forms.forEach((t=>t.addEventListener("submit",(s=>{s.preventDefault();const n=[...t.elements][0];n.focus();const i=t.closest(".cards-col").children[1];e.createCard(i,n.value),t.reset(),t.classList.remove("active")})))),this.pageUi.cardsContainerEl.addEventListener("mouseover",(t=>{t.preventDefault();if(!t.target.classList.contains("card"))return;t.target.querySelector(".delete-btn").classList.remove("hidden")})),this.pageUi.cardsContainerEl.addEventListener("mouseout",(t=>{t.preventDefault();if(!t.target.classList.contains("card"))return;const e=t.target,s=t.relatedTarget;if(!(e.classList.contains("card")&&s.classList.contains("input-text")||e.classList.contains("card")&&s.classList.contains("delete-btn"))){t.target.querySelector(".delete-btn").classList.add("hidden")}})),this.pageUi.cardsContainerEl.addEventListener("mousedown",(t=>{const s=t.target;s.closest(".card")&&this.startDrag(t),s.closest(".delete-btn")&&e.deleteCard(s)})),document.addEventListener("mousemove",(t=>{this.moveAt(t)})),document.addEventListener("mouseup",(t=>{this.finishDrag(t)}))}save(){const t={todo:[],inProgress:[],done:[]},e=this.toDo.querySelectorAll(".card"),s=this.inProgress.querySelectorAll(".card"),n=this.done.querySelectorAll(".card");e.forEach((e=>{t.todo.push(e.firstChild.textContent)})),s.forEach((e=>{t.inProgress.push(e.firstChild.textContent)})),n.forEach((e=>{t.done.push(e.firstChild.textContent)})),this.stateService.save(t)}load(){const t=this.stateService.load();t&&(t.todo.forEach((t=>{e.createCard(this.toDo,t)})),t.inProgress.forEach((t=>{e.createCard(this.inProgress,t)})),t.done.forEach((t=>{e.createCard(this.done,t)})))}startDrag(t){const e=t.target.closest(".card");e&&!t.target.classList.contains("delete-btn")&&(t.preventDefault(),document.body.style.cursor=n.noDrag,this.pageUi.addCards.forEach((t=>{t.style.cursor=n.noDrag})),this.pageUi.cards.forEach((t=>{t.style.cursor=n.drag})),this.dragEl=e,this.cloneEl=this.dragEl.cloneNode(!0),this.shiftX=t.clientX-this.dragEl.getBoundingClientRect().left,this.shiftY=t.clientY-this.dragEl.getBoundingClientRect().top,this.cloneEl.style.width=`${this.dragEl.offsetWidth}px`,this.cloneEl.style.height=`${this.dragEl.offsetHeight}px`,this.cloneEl.classList.add("dragged"),this.dragEl.classList.add("hidden"),document.body.append(this.cloneEl),this.cloneEl.style.left=t.clientX-this.shiftX+"px",this.cloneEl.style.top=t.clientY-this.shiftY+"px")}moveAt(t){if(t.preventDefault(),!this.cloneEl)return;let e=t.clientX-this.shiftX,s=t.clientY-this.shiftY;const n=s+this.cloneEl.offsetHeight;if(n>document.documentElement.clientHeight){const t=document.documentElement.getBoundingClientRect().bottom;let e=Math.min(t-n,10);e<0&&(e=0),window.scrollBy(0,e),s=Math.min(s,document.documentElement.clientHeight-this.cloneEl.offsetHeight)}if(s<0){let t=Math.min(-s,10);t<0&&(t=0),window.scrollBy(0,-t),s=Math.max(s,0)}e<0&&(e=0),e>document.documentElement.clientWidth-this.cloneEl.offsetWidth&&(e=document.documentElement.clientWidth-this.cloneEl.offsetWidth),this.cloneEl.style.left=`${e}px`,this.cloneEl.style.top=`${s}px`}finishDrag(t){if(!this.dragEl)return;const e=document.elementFromPoint(t.clientX,t.clientY);if(!e)return void this.endingDrag();const s=e.closest(".cards");if(null===s)this.dragEl.parentElement.append(this.dragEl);else if(s&&s===e)s.append(this.dragEl);else if(s&&s!==e){e.closest(".card").after(this.dragEl)}this.endingDrag()}endingDrag(){document.body.style.cursor=n.auto,this.pageUi.addCards.forEach((t=>{t.style.cursor=""})),this.pageUi.cards.forEach((t=>{t.style.cursor=n.auto})),this.cloneEl.remove(),this.dragEl.classList.remove("hidden"),this.dragEl=null,this.cloneEl=null}}(i,r);a.init()})();