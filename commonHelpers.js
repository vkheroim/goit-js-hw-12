import{a as v,S as P,i as l}from"./assets/vendor-eded45c0.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();async function g(r,e){const s="https://pixabay.com",n="/api/",t={key:"43217946-108b18fb86fe71a4135c25a24",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e},o=`${s}${n}`;return(await v.get(o,{params:t})).data}function m(r){return r.map(e=>`<li class="gallery-item">
      <a class="gallery-link" href="${e.largeImageURL}">
        <img class="gallery-image" src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <ul class="img-description">
        <li>
          <h3>Likes</h3>
          <p>${e.likes}</p>
        </li>
        <li>
          <h3>Views</h3>
          <p>${e.views}</p>
        </li>
        <li>
          <h3>Comments</h3>
          <p>${e.comments}</p>
        </li>
        <li>
          <h3>Downloads</h3>
          <p>${e.downloads}</p>
        </li>
      </ul>
    </li>`).join("")}const p=document.querySelector(".form"),u=document.querySelector(".gallery"),d=document.querySelector(".btn"),y=document.querySelector(".loader");let c,i=1,L=0;const S=15;let h=new P(".gallery a",{captionsData:"alt",captionDelay:250});h.on("show.simplelightbox",function(){});function b(){i>=L?(w(),l.warning({message:"Вибачте, але ви дійшли до кінця результатів пошуку.",color:"blue",position:"topRight"})):R()}function $(){const r=u.firstChild.getBoundingClientRect().height;console.log(r),scrollBy({top:r*2,behavior:"smooth"})}function R(){return d.classList.remove("is-hidden")}function w(){return d.classList.add("is-hidden")}function M(){return y.classList.remove("is-hidden")}function f(){return y.classList.add("is-hidden")}f();w();p.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.target.elements.search.value.trim(),c==="")return l.warning({message:"Будь ласка, заповніть поле!",color:"red",position:"topRight"});u.innerHTML="",i=1,M();try{const e=await g(c,i);L=Math.ceil(e.totalHits/S);const s=m(e.hits);e.hits.length===0?l.error({message:"На жаль, за вашим запитом не знайдено зображень. Будь ласка, спробуйте ще раз!",position:"topRight",color:"red"}):(u.insertAdjacentHTML("beforeend",s),h.refresh(),b())}catch{l.error({message:"На жаль, за вашим запитом не знайдено зображень. Будь ласка, спробуйте ще раз!",position:"topRight",color:"red"})}finally{f(),p.reset()}});d.addEventListener("click",async r=>{M(),i+=1;const e=await g(c,i),s=m(e.hits);u.insertAdjacentHTML("beforeend",s),$(),h.refresh(),f(),b()});
//# sourceMappingURL=commonHelpers.js.map
