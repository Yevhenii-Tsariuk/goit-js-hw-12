import{a as b,S as w,i as u}from"./assets/vendor-b0d10f48.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const F="44790936-a9a83b9ad64ff44b33786cafe",S="https://pixabay.com/api/",E=15;async function f(o,r=1){const a=`${S}?key=${F}&q=${o}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${E}&page=${r}`,s=await b.get(a);if(s.status!==200)throw new Error(s.status);return s.data}function v(o){return o.map(({webformatURL:r,largeImageURL:a,tags:s,likes:e,views:t,comments:l,downloads:g})=>`
       <li class="gallery-item">
         <a class="gallery-link" href="${a}" onclick="event.preventDefault()">
           <img
             class="gallery-image"
             src="${r}"
             alt="${s}"
             width="360"
             height="200"
           />
           <ul class="gallery-info">
             <li  class="gallery-item-text">
             <h3 class="gallery-subtitle">Likes</h3>
             <p class ="gallery-text">${e}</p></li>
 
             <li class="gallery-item-text">
             <h3 class="gallery-subtitle">Views</h3>
             <p class ="gallery-text">${t}</p></li>
 
             <li class="gallery-item-text">
             <h3 class="gallery-subtitle">Comments</h3>
             <p class ="gallery-text">${l}</p></li>
 
             <li  class="gallery-item-text">
             <h3 class="gallery-subtitle">Downloads</h3>
             <p class ="gallery-text">${g}</p></li>
 
           </ul>
         </a>
       </li>`).join("")}function y(o,r){const a=v(r);o.insertAdjacentHTML("beforeend",a)}function A(o){o.innerHTML=""}document.addEventListener("DOMContentLoaded",()=>{const o=document.querySelector(".search-form"),r=document.querySelector(".gallery"),a=document.querySelector(".loader"),s=document.querySelector(".load-more");let e=1,t="";const l=new w(".gallery a",{captionsData:"alt",captionDelay:250});o.addEventListener("submit",g),s.addEventListener("click",p);async function g(i){i.preventDefault();const d=i.currentTarget;t=d.elements.query.value.toLowerCase(),e=1,A(r),s.classList.add("hidden"),m();try{const n=await f(t,e),{hits:c,totalHits:L}=n;c.length===0?u.warning({position:"center",messageSize:"16",message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"#EF4040",messageColor:"#FAFAFB",maxWidth:450}):(y(r,c),l.refresh(),c.length<L&&s.classList.remove("hidden"))}catch(n){u.error({position:"center",messageSize:"16",title:"Error",message:`Something went wrong: ${n.message}`,backgroundColor:"#EF4040",messageColor:"#FAFAFB"})}finally{d.reset(),h()}}async function p(){e+=1,m();try{const i=await f(t,e),{hits:d,totalHits:n}=i;y(r,d),l.refresh(),e*15>=n&&(s.classList.add("hidden"),u.info({position:"center",messageSize:"16",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#FFA000",messageColor:"#FAFAFB"}));const{height:c}=r.firstElementChild.getBoundingClientRect();window.scrollBy({top:c*2,behavior:"smooth"})}catch(i){u.error({position:"center",title:"Error",messageSize:"16",message:`Something went wrong: ${i.message}`,backgroundColor:"#EF4040",messageColor:"#FAFAFB"})}finally{h()}}function m(){a.classList.add("visible")}function h(){a.classList.remove("visible")}});
//# sourceMappingURL=commonHelpers.js.map
