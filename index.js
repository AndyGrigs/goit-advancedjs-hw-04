import{a as M,i as a,S as w}from"./assets/vendor-BH9GyP-n.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();function h(r){return r.map(({webformatURL:o,largeImageURL:i,tags:s,likes:t,views:n,comments:l,downloads:L})=>`
        <a href=${i} class="gallery_link">
          <img src=${o} alt=${s} loading="lazy">
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${t}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${n}

            </p>
            <p class="info-item">
              <b>comments</b>
              ${l}

            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${L}

            </p>
          </div>
        </a>
        `).join("")}const S="https://pixabay.com/api/",B="28460995-5acfdb805ab0c27f2bf717abb";async function p(r,o=1,i=15){const s=new URLSearchParams({key:B,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:i});return(await M.get(`${S}?${s}`)).data}const e={form:document.querySelector("#search-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector("#loader"),loadMoreBtn:document.querySelector("#load-more")};let f=null,u="",c=1;const d=5;let g=0;e.loadMoreBtn.style.display="none";e.form.addEventListener("submit",v);e.loadMoreBtn.addEventListener("click",P);async function v(r){if(r.preventDefault(),u=r.currentTarget.elements.search.value.trim(),!u){a.warning({title:"Stop!",message:"The field must be filled up!!!"});return}E(),b();try{const o=await p(u,c,d);if(y(),o.hits.length===0){a.error({title:"No results!",message:"Sorry, no images match your query. Try again!"});return}g=o.totalHits,e.gallery.innerHTML=h(o.hits),$(),o.hits.length<d||g<=d?e.loadMoreBtn.style.display="none":(e.loadMoreBtn.style.display="block",m(!1))}catch{y(),a.error({title:"Error",message:"Something went wrong. Please try again later."})}}async function P(){m(!0),b(),c+=1;try{const r=await p(u,c,d);if(y(),r.hits.length===0){e.loadMoreBtn.style.display="none",a.warning({title:"End of results",message:"We're sorry, but you've reached the end of search results."});return}const o=h(r.hits);e.gallery.insertAdjacentHTML("beforeend",o),f.refresh(),q(),c*d>=g?(e.loadMoreBtn.style.display="none",a.info({title:"End of results",message:"You've reached the end of available images."})):m(!1)}catch{y(),m(!1),a.error({title:"Error",message:"Something went wrong. Please try again later."})}}function E(){c=1,g=0,e.gallery.innerHTML="",e.loadMoreBtn.style.display="none",e.form.reset()}function b(){e.loader.classList.add("visible")}function y(){e.loader.classList.remove("visible")}function $(){f?f.refresh():f=new w(".gallery a")}function q(){const{height:r}=e.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}function m(r){r?(e.loadMoreBtn.disabled=!0,e.loadMoreBtn.textContent="Loading..."):(e.loadMoreBtn.disabled=!1,e.loadMoreBtn.textContent="Load more")}
//# sourceMappingURL=index.js.map
