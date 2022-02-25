(()=>{"use strict";const e=(e,t)=>new IntersectionObserver((t=>e(t)),t),t=e=>{const t=document.createElement("img"),n=document.createElement("div");return t.style.width="400px",t.style.height="300px",t.setAttribute("data-src",e),t.className="image",n.appendChild(t),n},n=e=>{document.querySelector(".scroll__sensor").classList.remove("show");const t=document.createElement("div"),n=document.createElement("h1"),r=document.createElement("h6");return t.className="error__container",n.className="error__header",n.textContent="Nope.",r.className="error__message",r.textContent=e.message,t.appendChild(n),t.appendChild(r),t};let r=["star_wars"],a=1;const o="https://nv90-server.herokuapp.com/";console.log(`Welcome to nv90. You are running in production mode. Server url is ${o}`);const c=e=>{r.splice(e,1),h()},s=e=>{const t=e.replace(" ","_").toLowerCase();null!==t&&0!==t.length&&(r.includes(t)||(r.push(t),h()))},l=()=>{localStorage.clear(),h()},i=e((e=>{e.forEach((e=>{e.target.classList.toggle("show",e.isIntersecting),e.isIntersecting&&(e.target.src=e.target.getAttribute("data-src"),e.target.style.width="100%",i.unobserve(e.target))}))}),{threshold:.2,rootMargin:"100px"}),d=e((e=>{e.forEach((e=>{e.target.classList.toggle("show",e.isIntersecting),e.isIntersecting&&(a++,d.unobserve(e.target),setTimeout((()=>{u()}),600))}))}),{rootMargin:"100px"}),u=async()=>{const e=`${r.join(",")}_${a}`;let t=[];if(localStorage.getItem(e))console.log("Using cached result with key "+e),t=localStorage.getItem(e).split(",");else{console.log("No cached resources found with key "+e+" Fetching from Flickr API.");try{if(t=await m(),!t||!t.length>0)return void p({message:"No results. Try another tag."})}catch(e){return void p(e)}localStorage.setItem(e,t.join(","))}g(t)},g=e=>{const n=document.querySelector(".gallery__image__container");document.querySelector(".scroll__sensor").classList.toggle("show"),e.forEach((e=>{n.appendChild(t(e))})),(()=>{const e=document.querySelectorAll(".image"),t=document.querySelector(".scroll__sensor");e.forEach((e=>{i.observe(e)})),d.observe(t)})()},m=async()=>await fetch(`${o}${r.length>0?encodeURI(r.join(",")):"*"}&${a}`).then((e=>e.status>299||e.status<200?e.json().then((t=>{throw new Error(`Error with code: ${e.status}. \n MSG: ${t.message} `)})):e.json())).catch((e=>{throw new Error(e.message)})),_=()=>{const e=document.querySelector(".search__tags__container");e.innerHTML="",r.forEach(((t,n)=>{const r=((e,t,n)=>{const r=document.createElement("button"),a=document.createElement("i"),o=document.createElement("p");return a.className="bi bi-x",r.className="button__basic search__tag",o.textContent+=e.replace("_"," "),r.appendChild(o),r.appendChild(a),r.addEventListener("click",(()=>{r.style.display="none",n(t)})),r})(t,n,c);e.appendChild(r)}));const t=(e=>{const t=document.createElement("div"),n=document.createElement("i"),r=document.createElement("input");return r.type="text",r.placeholder="Add tag..",r.className="add__new__tag__input",n.className="bi bi-tag",t.className="button__basic search__tag add__new__tag",t.appendChild(n),t.appendChild(r),r.addEventListener("blur",(t=>t.target.value.length>0&&e(t.target.value))),r.addEventListener("keyup",(t=>{"Enter"===t.key&&t.target.value.length>0&&e(t.target.value)})),t})(s),n=(e=>{const t=document.createElement("div"),n=document.createElement("i"),r=document.createTextNode("Clear Cache");return n.className="bi bi-x",t.className="button__basic search__tag add__new__tag clear__cache__tag",t.appendChild(n),t.appendChild(r),t.addEventListener("click",(()=>{e()})),t})(l);e.appendChild(t),e.appendChild(n)},h=()=>{document.querySelector(".gallery__image__container").innerHTML="",a=1,u(),_()},p=e=>{const t=document.querySelector(".gallery__image__container");t.innerHTML="";const r=n(e);t.appendChild(r)};document.addEventListener("load",(a=1,window.onbeforeunload=function(){window.scrollTo(0,0)},u(),void _()))})();