import{S as f,i as a}from"./assets/vendor-3fe00192.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();function h(o){const r=document.querySelector(".gallery"),l=o.map(({webformatURL:e,largeImageURL:t,tags:i,likes:u,views:d,comments:p,downloads:m})=>`
   <div class="galleryItem-wrapper">
        <div class="galleryCard-wrapper">
            <li class="gallery_items">
                <a href="${t}">
                <img src="${e}" alt="${i}" class="galleryItems-photo"></a>
                <div class="gallery-textWrapper">
                    <ul class="galleryItems-list">
                        <li class="galleryItem">
                            <h2>Likes</h2>
                            <p>${u}</p>
                        </li>
                        <li class="galleryItem">
                            <h2>Views</h2>
                            <p>${d}</p>
                        </li>
                        <li class="galleryItem">
                            <h2>Comments</h2>
                            <p>${p}</p>
                        </li>
                        <li class="galleryItem">
                            <h2>Downloads</h2>
                            <p>${m}</p>
                        </li>
                    </ul>
                </div>
                
            </li>
        </div>
    </div>`).join("");r.insertAdjacentHTML("afterbegin",l),new f(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom",widthRatio:.9,heightRatio:.8}).refresh()}function y(o){const r="43217946-108b18fb86fe71a4135c25a24",l="https://pixabay.com/api/",s=new URLSearchParams({key:r,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0});fetch(`${l}?${s}`).then(e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}).then(e=>{e.total||a.error({title:"Error",position:"topRight",message:"Вибачте, за вашим пошуковим запитом не знайдено зображень. Спробуйте ще раз!"}),h(e.hits)}).catch(e=>{a.error({title:"Error",position:"topRight",message:"Упс! Щось пішло не так!"})}).finally(()=>loader.hidden=!0)}const n=document.querySelector(".search-form"),g=document.querySelector(".gallery"),c=document.querySelector(".loader");n.addEventListener("submit",L);c.hidden=!0;function L(o){o.preventDefault(),g.innerHTML="",c.hidden=!1;const{searchRequest:r}=o.currentTarget.elements;let l=r.value;y(l),n.reset()}
//# sourceMappingURL=commonHelpers.js.map
