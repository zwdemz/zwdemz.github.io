window.addEventListener("load",(()=>{const e=document.getElementById("search-mask");const t=document.querySelector("#algolia-search .search-dialog");const i=()=>{anzhiyu.animateIn(e,"to_show 0.5s");t.style.display="block";setTimeout((()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()}),100);document.addEventListener("keydown",(function e(t){if(t.code==="Escape"){n();document.removeEventListener("keydown",e)}}));a();window.addEventListener("resize",a)};if(anzhiyu_keyboard){window.addEventListener("keydown",(function(e){if(e.keyCode==83&&e.shiftKey){console.info(selectTextNow);if(selectTextNow){i();const e=document.querySelector("#algolia-search-input > div > form > input");e.value=selectTextNow;e.dispatchEvent(new Event("input"));setTimeout((()=>{document.querySelector("#algolia-search-input > div > form > button.ais-SearchBox-submit").click()}),64)}else{i()}return false}}))}const n=()=>{anzhiyu.animateOut(t,"search_close .5s");anzhiyu.animateOut(e,"to_hide 0.5s");window.removeEventListener("resize",a)};const a=()=>{if(window.innerWidth<768){t.style.setProperty("--search-height",window.innerHeight+"px")}};const s=()=>{anzhiyu.addEventListenerPjax(document.querySelector("#search-button > .search"),"click",i)};const o=()=>{e.addEventListener("click",n);document.querySelector("#algolia-search .search-close-button").addEventListener("click",n)};const l=GLOBAL_CONFIG.algolia;const c=l.appId&&l.apiKey&&l.indexName;if(!c){return console.error("Algolia setting is invalid!")}const r=instantsearch({indexName:l.indexName,searchClient:algoliasearch(l.appId,l.apiKey),searchFunction(e){if(e.state.query){let t='<i class="anzhiyufont anzhiyu-icon-spinner anzhiyu-spin"></i>';document.getElementById("algolia-hits").innerHTML=t;e.search()}}});const u=instantsearch.widgets.configure({hitsPerPage:l.hits.per_page??5});const d=instantsearch.widgets.searchBox({container:"#algolia-search-input",showReset:false,showSubmit:false,placeholder:l.languages.input_placeholder,showLoadingIndicator:true,searchOnEnterKeyPressOnly:true,searchAsYouType:false});const h=instantsearch.widgets.hits({container:"#algolia-hits",templates:{item(e){const t=e.permalink?e.permalink:GLOBAL_CONFIG.root+e.path;const i=e._highlightResult;const n=document.querySelector("#algolia-hits .anzhiyu-spin");if(n){n.style.display="none"}setTimeout((()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()}),200);return`\n          <a href="${t}" class="algolia-hit-item-link">\n          <span class="algolia-hits-item-title">${i.title.value||"no-title"}</span>\n          </a>`},empty:function(e){const t=document.querySelector("#algolia-hits .anzhiyu-spin");console.info(t);if(t){t.style.display="none"}setTimeout((()=>{document.querySelector("#algolia-search .ais-SearchBox-input").focus()}),200);return'<div id="algolia-hits-empty">'+GLOBAL_CONFIG.algolia.languages.hits_empty.replace(/\$\{query}/,e.query)+"</div>"}},cssClasses:{item:"algolia-hit-item"}});const g=instantsearch.widgets.stats({container:"#algolia-info > .algolia-stats",templates:{text:function(e){const t=GLOBAL_CONFIG.algolia.languages.hits_stats.replace(/\$\{hits}/,e.nbHits).replace(/\$\{time}/,e.processingTimeMS);return`<hr>${t}`}}});const p=instantsearch.widgets.poweredBy({container:"#algolia-info > .algolia-poweredBy"});const y=instantsearch.widgets.pagination({container:"#algolia-pagination",totalPages:l.hits.per_page??5,templates:{first:'<i class="anzhiyufont anzhiyu-icon-angle-double-left"></i>',last:'<i class="anzhiyufont anzhiyu-icon-angle-double-right"></i>',previous:'<i class="anzhiyufont anzhiyu-icon-angle-left"></i>',next:'<i class="anzhiyufont anzhiyu-icon-angle-right"></i>'},scrollTo:false,showFirstLast:false,cssClasses:{root:"pagination",item:"pagination-item",link:"page-number",active:"current",disabled:"disabled-item"}});r.addWidgets([u,d,h,g,p,y]);r.start();s();o();window.addEventListener("pjax:complete",(()=>{!anzhiyu.isHidden(e)&&n();s()}));window.pjax&&r.on("render",(()=>{window.pjax.refresh(document.getElementById("algolia-hits"))}))}));