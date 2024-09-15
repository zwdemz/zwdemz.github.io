const anzhiyu={debounce:(e,t=0,n=false)=>{let o;return(...i)=>{const s=()=>{o=null;if(!n)e(...i)};const a=n&&!o;clearTimeout(o);o=setTimeout(s,t);if(a)e(...i)}},throttle:function(e,t,n={}){let o,i,s;let a=0;const c=()=>{a=n.leading===false?0:(new Date).getTime();o=null;e.apply(i,s);if(!o)i=s=null};const l=(...l)=>{const r=(new Date).getTime();if(!a&&n.leading===false)a=r;const u=t-(r-a);i=this;s=l;if(u<=0||u>t){if(o){clearTimeout(o);o=null}a=r;e.apply(i,s);if(!o)i=s=null}else if(!o&&n.trailing!==false){o=setTimeout(c,u)}};return l},sidebarPaddingR:()=>{const e=window.innerWidth;const t=document.body.clientWidth;const n=e-t;if(e!==t){document.body.style.paddingRight=n+"px"}},snackbarShow:(e,t=false,n=2e3,o=false)=>{const{position:i,bgLight:s,bgDark:a}=GLOBAL_CONFIG.Snackbar;const c=document.documentElement.getAttribute("data-theme")==="light"?s:a;const l=document.querySelector(":root");l.style.setProperty("--anzhiyu-snackbar-time",n+"ms");Snackbar.show({text:e,backgroundColor:c,onActionClick:t,actionText:o,showAction:o,duration:n,pos:i,customClass:"snackbar-css"})},loadComment:(e,t)=>{if("IntersectionObserver"in window){const n=new IntersectionObserver((e=>{if(e[0].isIntersecting){t();n.disconnect()}}),{threshold:[0]});n.observe(e)}else{t()}},scrollToDest:(e,t=500)=>{const n=window.pageYOffset;if("scrollBehavior"in document.documentElement.style){window.scrollTo({top:e,behavior:"smooth"});return}let o=null;e=+e;window.requestAnimationFrame((function i(s){o=!o?s:o;const a=s-o;if(n<e){window.scrollTo(0,(e-n)*a/t+n)}else{window.scrollTo(0,n-(n-e)*a/t)}if(a<t){window.requestAnimationFrame(i)}else{window.scrollTo(0,e)}}))},initJustifiedGallery:function(e){const t=e=>{if(!anzhiyu.isHidden(e)){fjGallery(e,{itemSelector:".fj-gallery-item",rowHeight:e.getAttribute("data-rowHeight"),gutter:4,onJustify:function(){this.$container.style.opacity="1"}})}};if(Array.from(e).length===0)t(e);else e.forEach((e=>{t(e)}))},animateIn:(e,t)=>{e.style.display="block";e.style.animation=t},animateOut:(e,t)=>{e.addEventListener("animationend",(function t(){e.style.display="";e.style.animation="";e.removeEventListener("animationend",t)}));e.style.animation=t},wrap:(e,t,n)=>{const o=document.createElement(t);for(const[e,t]of Object.entries(n)){o.setAttribute(e,t)}e.parentNode.insertBefore(o,e);o.appendChild(e)},isHidden:e=>e.offsetHeight===0&&e.offsetWidth===0,getEleTop:e=>{let t=e.offsetTop;let n=e.offsetParent;while(n!==null){t+=n.offsetTop;n=n.offsetParent}return t},loadLightbox:e=>{const t=GLOBAL_CONFIG.lightbox;if(t==="mediumZoom"){const t=mediumZoom(e);t.on("open",(e=>{const n=document.documentElement.getAttribute("data-theme")==="dark"?"#121212":"#fff";t.update({background:n})}))}if(t==="fancybox"){Array.from(e).forEach((e=>{if(e.parentNode.tagName!=="A"){const t=e.dataset.lazySrc||e.src;const n=e.title||e.alt||"";anzhiyu.wrap(e,"a",{href:t,"data-fancybox":"gallery","data-caption":n,"data-thumb":t})}}));if(!window.fancyboxRun){Fancybox.bind("[data-fancybox]",{Hash:false,Thumbs:{autoStart:false}});window.fancyboxRun=true}}},setLoading:{add:e=>{const t=`\n        <div class="loading-container">\n          <div class="loading-item">\n            <div></div><div></div><div></div><div></div><div></div>\n          </div>\n        </div>\n      `;e.insertAdjacentHTML("afterend",t)},remove:e=>{e.nextElementSibling.remove()}},updateAnchor:e=>{if(e!==window.location.hash){if(!e)e=location.pathname;const t=GLOBAL_CONFIG_SITE.title;window.history.replaceState({url:location.href,title:t},t,e)}},getScrollPercent:(e,t)=>{const n=t.clientHeight;const o=document.documentElement.clientHeight;const i=t.offsetTop;const s=n>o?n-o:document.documentElement.scrollHeight-o;const a=(e-i)/s;const c=Math.round(a*100);const l=c>100?100:c<=0?0:c;return l},addGlobalFn:(e,t,n=false,o=window)=>{const i=o.globalFn||{};const s=i[e]||{};if(n&&s[n])return;n=n||Object.keys(s).length;s[n]=t;i[e]=s;o.globalFn=i},addEventListenerPjax:(e,t,n,o=false)=>{e.addEventListener(t,n,o);anzhiyu.addGlobalFn("pjax",(()=>{e.removeEventListener(t,n,o)}))},removeGlobalFnEvent:(e,t=window)=>{const{globalFn:n={}}=t;const o=n[e]||{};const i=Object.keys(o);if(!i.length)return;i.forEach((e=>{o[e]()}));delete t.globalFn[e]},changeThemeMetaColor:function(e){if(themeColorMeta!==null){themeColorMeta.setAttribute("content",e)}},initThemeColor:function(){let e=getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-bar-background").trim().replace('"',"").replace('"',"");const t=window.scrollY||document.documentElement.scrollTop;if(t>26){if(anzhiyu.is_Post()){e=getComputedStyle(document.documentElement).getPropertyValue("--anzhiyu-meta-theme-post-color").trim().replace('"',"").replace('"',"")}if(themeColorMeta.getAttribute("content")===e)return;this.changeThemeMetaColor(e)}else{if(themeColorMeta.getAttribute("content")===e)return;this.changeThemeMetaColor(e)}},is_Post:function(){var e=window.location.href;if(e.indexOf("/posts/")>=0){return true}else{return false}},addNavBackgroundInit:function(){var e=0,t=0,n=0;if($bodyWrap){t=$bodyWrap.scrollTop}if(document.documentElement){n=document.documentElement.scrollTop}e=t-n>0?t:n;if(e!=0){pageHeaderEl.classList.add("nav-fixed");pageHeaderEl.classList.add("nav-visible")}},downloadImage:function(e,t){rm.hideRightMenu();if(rm.downloadimging==false){rm.downloadimging=true;anzhiyu.snackbarShow("正在下载中，请稍后",false,1e4);setTimeout((function(){let n=new Image;n.setAttribute("crossOrigin","anonymous");n.onload=function(){let e=document.createElement("canvas");e.width=n.width;e.height=n.height;let o=e.getContext("2d");o.drawImage(n,0,0,n.width,n.height);let i=e.toDataURL("image/png");let s=document.createElement("a");let a=new MouseEvent("click");s.download=t||"photo";s.href=i;s.dispatchEvent(a)};n.src=e;anzhiyu.snackbarShow("图片已添加盲水印，请遵守版权协议");rm.downloadimging=false}),"10000")}else{anzhiyu.snackbarShow("有正在进行中的下载，请稍后再试")}},stopImgRightDrag:function(){var e=document.getElementsByTagName("img");for(var t=0;t<e.length;t++){e[t].addEventListener("dragstart",(function(){return false}))}},scrollTo:function(e){var t=document.querySelector(e).offsetTop;window.scrollTo(0,t-80)},hideAsideBtn:()=>{const e=document.documentElement.classList;e.contains("hide-aside")?saveToLocal.set("aside-status","show",2):saveToLocal.set("aside-status","hide",2);e.toggle("hide-aside");e.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on")},switchCommentBarrage:function(){let e=document.querySelector(".comment-barrage");if(e){if(window.getComputedStyle(e).display==="flex"){e.style.display="none";anzhiyu.snackbarShow("✨ 已关闭评论弹幕");document.querySelector(".menu-commentBarrage-text").textContent="显示热评";document.querySelector("#consoleCommentBarrage").classList.remove("on");localStorage.setItem("commentBarrageSwitch","false")}else{e.style.display="flex";document.querySelector(".menu-commentBarrage-text").textContent="关闭热评";document.querySelector("#consoleCommentBarrage").classList.add("on");anzhiyu.snackbarShow("✨ 已开启评论弹幕");localStorage.removeItem("commentBarrageSwitch")}}rm&&rm.hideRightMenu()},initPaginationObserver:()=>{const e=document.getElementById("post-comment");const t=document.getElementById("pagination");if(e&&t){new IntersectionObserver((e=>{const n=document.querySelector(".comment-barrage");e.forEach((e=>{if(e.isIntersecting){t.classList.add("show-window");if(n){n.style.bottom="-200px"}}else{t.classList.remove("show-window");if(n){n.style.bottom="0px"}}}))})).observe(e)}},initIndexEssay:function(){if(!document.getElementById("bbTimeList"))return;setTimeout((()=>{let e=new Swiper(".essay_bar_swiper_container",{passiveListeners:true,direction:"vertical",loop:true,autoplay:{disableOnInteraction:true,delay:3e3},mousewheel:true});let t=document.getElementById("bbtalk");if(t!==null){t.onmouseenter=function(){e.autoplay.stop()};t.onmouseleave=function(){e.autoplay.start()}}}),100)},scrollByMouseWheel:function(e,t){const n=function(t){e.scrollLeft-=t.wheelDelta/2;t.preventDefault()};e.addEventListener("mousewheel",n,{passive:false});if(t){t.classList.add("selected");e.scrollLeft=t.offsetLeft-e.offsetLeft-(e.offsetWidth-t.offsetWidth)/2}},catalogActive:function(){const e=document.getElementById("catalog-list");if(e){const t=decodeURIComponent(window.location.pathname);const n=e.querySelectorAll(".catalog-list-item");let o=null;n.forEach((e=>{if(t.startsWith(e.id)){o=e;return}}));anzhiyu.scrollByMouseWheel(e,o)}},tagsPageActive:function(){const e=document.getElementById("tag-page-tags");if(e){const t=document.getElementById(decodeURIComponent(window.location.pathname));anzhiyu.scrollByMouseWheel(e,t)}},diffDate:function(e,t=false,n=false){const o=new Date;const i=new Date(e);const s=o.getTime()-i.getTime();const a=1e3*60;const c=a*60;const l=c*24;const r=l*30;let u;if(t){const e=s/r;const t=s/l;const n=s/c;const o=s/a;if(e>=1){u=i.toLocaleDateString().replace(/\//g,"-")}else if(t>=1){u=parseInt(t)+" "+GLOBAL_CONFIG.date_suffix.day}else if(n>=1){u=parseInt(n)+" "+GLOBAL_CONFIG.date_suffix.hour}else if(o>=1){u=parseInt(o)+" "+GLOBAL_CONFIG.date_suffix.min}else{u=GLOBAL_CONFIG.date_suffix.just}}else if(n){const e=s/r;const t=s/l;const n=s/c;const o=s/a;if(e>=1){u=i.toLocaleDateString().replace(/\//g,"-")}else if(t>=1&&t<=3){u=parseInt(t)+" "+GLOBAL_CONFIG.date_suffix.day}else if(t>3){u=i.getMonth()+1+"/"+i.getDate()}else if(n>=1){u=parseInt(n)+" "+GLOBAL_CONFIG.date_suffix.hour}else if(o>=1){u=parseInt(o)+" "+GLOBAL_CONFIG.date_suffix.min}else{u=GLOBAL_CONFIG.date_suffix.just}}else{u=parseInt(s/l)}return u},changeTimeInEssay:function(){document.querySelector("#bber")&&document.querySelectorAll("#bber time").forEach((function(e){var t=e,n=t.getAttribute("datetime");t.innerText=anzhiyu.diffDate(n,true),t.style.display="inline"}))},changeTimeInAlbumDetail:function(){document.querySelector("#album_detail")&&document.querySelectorAll("#album_detail time").forEach((function(e){var t=e,n=t.getAttribute("datetime");t.innerText=anzhiyu.diffDate(n,true),t.style.display="inline"}))},reflashEssayWaterFall:function(){const e=document.getElementById("waterfall");if(e){setTimeout((function(){waterfall(e);e.classList.add("show")}),800)}},sayhi:function(){const e=document.getElementById("author-info__sayhi");const t=()=>{const e=(new Date).getHours();let t="";if(e>=0&&e<=5){t="睡个好觉，保证精力充沛"}else if(e>5&&e<=10){t="一日之计在于晨"}else if(e>10&&e<=14){t="吃饱了才有力气干活"}else if(e>14&&e<=18){t="集中精力，攻克难关"}else if(e>18&&e<=24){t="不要太劳累了，早睡更健康"}return t};if(e){e.innerHTML=t()}},addFriendLink(){var e=document.getElementsByClassName("el-textarea__inner")[0];if(!e)return;const t=new Event("input",{cancelable:true,bubbles:true});const n="昵称（请勿包含博客等字样）：\n网站地址（要求博客地址，请勿提交个人主页）：\n头像图片url（请提供尽可能清晰的图片，我会上传到我自己的图床）：\n描述：\n站点截图（可选）：\n";e.value=this.getConfigIfPresent(GLOBAL_CONFIG.linkPageTop,"addFriendPlaceholder",n);e.dispatchEvent(t);e.focus();e.setSelectionRange(-1,-1)},getConfigIfPresent:function(e,t,n){if(!e)return n;if(!e.hasOwnProperty(t))return n;if(!e[t])return n;return e[t]},musicToggle:function(e=true){if(!anzhiyu_musicFirst){anzhiyu.musicBindEvent();anzhiyu_musicFirst=true}let t='<i class="anzhiyufont anzhiyu-icon-play"></i><span>播放音乐</span>';let n='<i class="anzhiyufont anzhiyu-icon-pause"></i><span>暂停音乐</span>';if(anzhiyu_musicPlaying){navMusicEl.classList.remove("playing");document.getElementById("menu-music-toggle").innerHTML=t;document.getElementById("nav-music-hoverTips").innerHTML="音乐已暂停";document.querySelector("#consoleMusic").classList.remove("on");anzhiyu_musicPlaying=false;navMusicEl.classList.remove("stretch")}else{navMusicEl.classList.add("playing");document.getElementById("menu-music-toggle").innerHTML=n;document.querySelector("#consoleMusic").classList.add("on");anzhiyu_musicPlaying=true;navMusicEl.classList.add("stretch")}if(e)document.querySelector("#nav-music meting-js").aplayer.toggle();rm&&rm.hideRightMenu()},musicTelescopic:function(){if(navMusicEl.classList.contains("stretch")){navMusicEl.classList.remove("stretch")}else{navMusicEl.classList.add("stretch")}},musicSkipBack:function(){navMusicEl.querySelector("meting-js").aplayer.skipBack();rm&&rm.hideRightMenu()},musicSkipForward:function(){navMusicEl.querySelector("meting-js").aplayer.skipForward();rm&&rm.hideRightMenu()},musicGetName:function(){var e=document.querySelector(".aplayer-title");var t=[];for(var n=e.length-1;n>=0;n--){t[n]=e[n].innerText}return t[0]},initConsoleState:function(){const e=document.documentElement.classList;e.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on")},rewardShowConsole:function(){consoleEl.classList.add("reward-show");anzhiyu.initConsoleState()},showConsole:function(){consoleEl.classList.add("show");anzhiyu.initConsoleState()},hideConsole:function(){if(consoleEl.classList.contains("show")){consoleEl.classList.remove("show")}else if(consoleEl.classList.contains("reward-show")){consoleEl.classList.remove("reward-show")}const e=document.getElementById("center-console");if(e.checked){e.checked=false}},hideLoading:function(){document.getElementById("loading-box").classList.add("loaded")},cacheAndPlayMusic(){let e=localStorage.getItem("musicData");if(e){e=JSON.parse(e);const t=(new Date).getTime();if(t-e.timestamp<24*60*60*1e3){anzhiyu.playMusic(e.songs);return}}fetch("/json/music.json").then((e=>e.json())).then((e=>{const t={timestamp:(new Date).getTime(),songs:e};localStorage.setItem("musicData",JSON.stringify(t));anzhiyu.playMusic(e)}))},playMusic(e){const t=document.getElementById("anMusic-page");const n=t.querySelector("meting-js").aplayer;const o=Math.floor(Math.random()*e.length);const i=e[o];const s=n.list.audios;if(!selectRandomSong.includes(i.name)){n.list.add([i]);n.list.switch(s.length);selectRandomSong.push(i.name)}else{let t=false;while(!t){const o=Math.floor(Math.random()*e.length);const i=e[o];if(!selectRandomSong.includes(i.name)){n.list.add([i]);n.list.switch(s.length);selectRandomSong.push(i.name);t=true}if(selectRandomSong.length===e.length){break}}if(!t){const e=s.findIndex((e=>e.name===i.name));if(e!=-1)n.list.switch(e)}}console.info("已随机歌曲：",selectRandomSong,"本次随机歌曲：",i.name)},changeMusicBg:function(e=true){const t=document.getElementById("an_music_bg");if(e){const e=document.querySelector("#anMusic-page .aplayer-pic");t.style.backgroundImage=e.style.backgroundImage}else{let e=setInterval((()=>{const t=document.querySelector("#anMusic-page .aplayer-pic");if(t){clearInterval(e);anzhiyu.addEventListenerMusic();anzhiyu.changeMusicBg();if(document.querySelector("#nav-music meting-js").aplayer&&!document.querySelector("#nav-music meting-js").aplayer.audio.paused){anzhiyu.musicToggle()}}}),100)}},getCustomPlayList:function(){if(!window.location.pathname.startsWith("/music/")){return}const e=new URLSearchParams(window.location.search);const t="8152976493";const n="netease";const o=document.getElementById("anMusic-page-meting");if(e.get("id")&&e.get("server")){const t=e.get("id");const n=e.get("server");o.innerHTML=`<meting-js id="${t}" server=${n} type="playlist" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>`}else{o.innerHTML=`<meting-js id="${t}" server="${n}" type="playlist" mutex="true" preload="auto" theme="var(--anzhiyu-main)" order="list" list-max-height="calc(100vh - 169px)!important"></meting-js>`}anzhiyu.changeMusicBg(false)},hideTodayCard:function(){if(document.getElementById("todayCard")){document.getElementById("todayCard").classList.add("hide");const e=document.querySelector(".topGroup");const t=e.querySelectorAll(".recent-post-item");t.forEach((e=>{e.style.display="flex"}))}},addEventListenerMusic:function(){const e=document.getElementById("anMusic-page");const t=e.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");const n=e.querySelector("#anMusicBtnGetSong");const o=e.querySelector("#anMusicRefreshBtn");const i=e.querySelector("#anMusicSwitching");const s=e.querySelector("meting-js").aplayer;s.volume(.8,true);s.on("loadeddata",(function(){anzhiyu.changeMusicBg()}));t.addEventListener("click",(function(){document.getElementById("menu-mask").style.display="block";document.getElementById("menu-mask").style.animation="0.5s ease 0s 1 normal none running to_show";e.querySelector(".aplayer.aplayer-withlist .aplayer-list").style.opacity="1"}));function a(){if(window.location.pathname!="/music/"){document.getElementById("menu-mask").removeEventListener("click",a);return}e.querySelector(".aplayer-list").classList.remove("aplayer-list-hide")}document.getElementById("menu-mask").addEventListener("click",a);n.addEventListener("click",(()=>{if(changeMusicListFlag){const e=document.getElementById("anMusic-page");const t=e.querySelector("meting-js").aplayer;const n=t.list.audios;const o=Math.floor(Math.random()*n.length);t.list.switch(o)}else{anzhiyu.cacheAndPlayMusic()}}));o.addEventListener("click",(()=>{localStorage.removeItem("musicData");anzhiyu.snackbarShow("已移除相关缓存歌曲")}));i.addEventListener("click",(()=>{anzhiyu.changeMusicList()}));document.addEventListener("keydown",(function(e){if(e.code==="Space"){e.preventDefault();s.toggle()}if(e.keyCode===39){e.preventDefault();s.skipForward()}if(e.keyCode===37){e.preventDefault();s.skipBack()}if(e.keyCode===38){if(musicVolume<=1){musicVolume+=.1;s.volume(musicVolume,true)}}if(e.keyCode===40){if(musicVolume>=0){musicVolume+=-.1;s.volume(musicVolume,true)}}}))},changeMusicList:async function(){const e=document.getElementById("anMusic-page");const t=e.querySelector("meting-js").aplayer;const n=(new Date).getTime();const o=JSON.parse(localStorage.getItem("musicData"))||{timestamp:0};let i=[];if(changeMusicListFlag){i=defaultPlayMusicList}else{defaultPlayMusicList=t.list.audios;if(n-o.timestamp<24*60*60*1e3){i=o.songs}else{const e=await fetch("/json/music.json");i=await e.json();o.timestamp=n;o.songs=i;localStorage.setItem("musicData",JSON.stringify(o))}}t.list.clear();t.list.add(i);changeMusicListFlag=!changeMusicListFlag},addEventListenerConsoleMusicList:function(){const e=document.getElementById("nav-music");if(!e)return;e.addEventListener("click",(t=>{const n=e.querySelector(".aplayer-list");const o=e.querySelector("div.aplayer-info > div.aplayer-controller > div.aplayer-time.aplayer-time-narrow > button.aplayer-icon.aplayer-icon-menu svg");if(t.target!=o&&n.classList.contains("aplayer-list-hide")){n.classList.remove("aplayer-list-hide")}}))},toPage:function(){var e=document.getElementById("toPageText"),t=document.getElementById("toPageButton"),n=document.querySelectorAll(".page-number"),o=Number(n[n.length-1].innerHTML),i=Number(e.value);if(!isNaN(i)&&i>=1&&Number.isInteger(i)){var s="/page/"+(i>o?o:i)+"/";t.href=i===1?"/":s}else{t.href="javascript:void(0);"}},removeBodyPaceClass:function(){document.body.className="pace-done"},setValueToBodyType:function(){const e=document.getElementById("page-type");const t=e.value;document.body.dataset.type=t},addRandomCommentInfo:function(){const e=adjectives[Math.floor(Math.random()*adjectives.length)];const t=vegetablesAndFruits[Math.floor(Math.random()*vegetablesAndFruits.length)];const n=`${e}${t}`;function o(){var e=["#author","input[name='comname']","#inpName","input[name='author']","#ds-dialog-name","#name","input[name='nick']","#comment_author"],t=["#mail","#email","input[name='commail']","#inpEmail","input[name='email']","#ds-dialog-email","input[name='mail']","#comment_email"],o=["#url","input[name='comurl']","#inpHomePage","#ds-dialog-url","input[name='url']","input[name='website']","#website","input[name='link']","#comment_url"];for(var i=0;i<e.length;i++){var s=document.querySelector(e[i]);if(s!=null){s.value=n;s.dispatchEvent(new Event("input"));s.dispatchEvent(new Event("change"));break}}for(var a=0;a<t.length;a++){var c=document.querySelector(t[a]);if(c!=null){c.value=visitorMail;c.dispatchEvent(new Event("input"));c.dispatchEvent(new Event("change"));break}}return!1}o();var i=document.getElementsByClassName("el-textarea__inner")[0];i.focus();i.setSelectionRange(-1,-1)},totraveling:function(){anzhiyu.snackbarShow("即将跳转到「开往」项目的成员博客，不保证跳转网站的安全性和可用性",(e=>{e.style.opacity=0;travellingsTimer&&clearTimeout(travellingsTimer)}),5e3,"取消");travellingsTimer=setTimeout((function(){window.open("https://www.travellings.cn/go.html","_blank")}),"5000")},replaceAll:function(e,t,n){return e.split(t).join(n)},musicBindEvent:function(){document.querySelector("#nav-music .aplayer-music").addEventListener("click",(function(){anzhiyu.musicTelescopic()}));document.querySelector("#nav-music .aplayer-button").addEventListener("click",(function(){anzhiyu.musicToggle(false)}))},hasMobile:function(){let e=false;if(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)||document.body.clientWidth<800){e=true}return e},qrcodeCreate:function(){if(document.getElementById("qrcode")){document.getElementById("qrcode").innerHTML="";var e=new QRCode(document.getElementById("qrcode"),{text:window.location.href,width:250,height:250,colorDark:"#000",colorLight:"#ffffff",correctLevel:QRCode.CorrectLevel.H})}},isInViewPortOfOne:function(e){if(!e)return;const t=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;const n=e.offsetTop;const o=document.documentElement.scrollTop;const i=n-o;return i<=t},addRewardMask:function(){if(!document.querySelector(".reward-main"))return;document.querySelector(".reward-main").style.display="flex";document.querySelector(".reward-main").style.zIndex="102";document.getElementById("quit-box").style.display="flex"},removeRewardMask:function(){if(!document.querySelector(".reward-main"))return;document.querySelector(".reward-main").style.display="none";document.getElementById("quit-box").style.display="none"},keyboardToggle:function(){const e=anzhiyu_keyboard;if(e){const e=document.querySelector("#consoleKeyboard");e.classList.remove("on");anzhiyu_keyboard=false}else{const e=document.querySelector("#consoleKeyboard");e.classList.add("on");anzhiyu_keyboard=true}localStorage.setItem("keyboardToggle",e?"false":"true")},rightMenuToggle:function(){if(window.oncontextmenu){window.oncontextmenu=null}else if(!window.oncontextmenu&&oncontextmenuFunction){window.oncontextmenu=oncontextmenuFunction}},switchConsole:()=>{const e=document.getElementById("console");const t=document.documentElement.classList;t.contains("hide-aside")?document.querySelector("#consoleHideAside").classList.add("on"):document.querySelector("#consoleHideAside").classList.remove("on");if(e.classList.contains("show")){e.classList.remove("show")}else{e.classList.add("show")}const n=document.querySelector("#consoleKeyboard");if(n){if(localStorage.getItem("keyboardToggle")==="true"){n.classList.add("on");anzhiyu_keyboard=true}else{n.classList.remove("on");anzhiyu_keyboard=false}}},intersectionObserver:function(e,t){let n;return()=>{if(!n){n=new IntersectionObserver((n=>{n.forEach((n=>{if(n.intersectionRatio>0){e?.()}else{t?.()}}))}))}else{n.disconnect()}return n}},scrollCategoryBarToRight:function(){const e=document.getElementById("catalog-list");const t=document.getElementById("category-bar-next");if(e&&t){const n=e.clientWidth;if(e.scrollLeft+e.clientWidth+1>=e.scrollWidth){e.scroll({left:0,behavior:"smooth"});t.innerHTML='<i class="anzhiyufont anzhiyu-icon-angle-double-right"></i>'}else{e.scrollBy({left:n,behavior:"smooth"})}}else{console.error("Element(s) not found: 'catalog-list' and/or 'category-bar-next'.")}},categoriesBarActive:function(){const e=decodeURIComponent(window.location.pathname);const t=document.getElementById("category-bar");if(!t)return;if(e==="/"){t.querySelector("#首页").classList.add("select")}else{const n=/\/categories\/.*?\//;const o=n.test(e);if(!o)return;const i=e.split("/")[2];t.querySelector(`#${i}`).classList.add("select")}},topCategoriesBarScroll:function(){const e=document.getElementById("category-bar-items");if(!e)return;e.addEventListener("mousewheel",(function(e){const t=-e.wheelDelta/2;this.scrollLeft+=t;e.preventDefault()}))},switchRightClickMenuHotReview:function(){const e=document.getElementById("post-comment");const t=document.getElementById("menu-commentBarrage");if(e){t.style.display="flex"}else{t.style.display="none"}},changeSayHelloText:function(){const e=GLOBAL_CONFIG.authorStatus.skills;const t=document.getElementById("author-info__sayhi");if(e.length===1){t.textContent=e[0];return}let n=t.textContent;let o=n;while(o===n){o=e[Math.floor(Math.random()*e.length)]}t.textContent=o}};const anzhiyuPopupManager={queue:[],processing:false,Jump:false,enqueuePopup(e,t,n,o=3e3){this.queue.push({title:e,tip:t,url:n,duration:o});if(!this.processing){this.processQueue()}},processQueue(){if(this.queue.length>0&&!this.processing){this.processing=true;const{title:e,tip:t,url:n,duration:o}=this.queue.shift();this.popupShow(e,t,n,o)}},popupShow(e,t,n,o){const i=document.getElementById("popup-window");if(!i)return;const s=i.querySelector(".popup-window-title");const a=i.querySelector(".popup-window-content");const c=a.querySelector(".popup-tip");if(i.classList.contains("show-popup-window")){i.classList.add("popup-hide")}setTimeout((()=>{i.removeEventListener("click",this.clickEventHandler);if(n){if(window.pjax){this.clickEventHandler=e=>{e.preventDefault();pjax.loadUrl(n);i.classList.remove("show-popup-window");i.classList.remove("popup-hide");this.Jump=true;this.processing=false;this.processQueue()};i.addEventListener("click",this.clickEventHandler)}else{this.clickEventHandler=()=>{window.location.href=n};i.addEventListener("click",this.clickEventHandler)}if(i.classList.contains("no-url")){i.classList.remove("no-url")}}else{if(!i.classList.contains("no-url")){i.classList.add("no-url")}this.clickEventHandler=()=>{i.classList.add("popup-hide");setTimeout((()=>{i.classList.remove("popup-hide");i.classList.remove("show-popup-window")}),1e3)};i.addEventListener("click",this.clickEventHandler)}if(i.classList.contains("popup-hide")){i.classList.remove("popup-hide")}i.classList.add("show-popup-window");s.textContent=e;c.textContent=t}),800);setTimeout((()=>{if(n&&!this.Jump){this.Jump=false}if(!i.classList.contains("popup-hide")&&i.className!=""){i.classList.add("popup-hide")}this.processing=false;this.processQueue()}),o)}};