(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[895],{8249:function(e,t,n){Promise.resolve().then(n.bind(n,6))},6:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var l=n(7437),r=n(2265),u=n(9415);let a=(0,n(166).default)(()=>Promise.all([n.e(699),n.e(648),n.e(865)]).then(n.bind(n,5405)),{loadableGenerated:{webpack:()=>[5405]},loading:()=>(0,l.jsx)("div",{className:"animate-pulse h-screen bg-surface/30"})});function o(){return(0,l.jsx)(u.E.div,{className:"content-page font-mono bg-gradient-to-b from-background to-surface/30",initial:{opacity:0},animate:{opacity:1},transition:{duration:.5,ease:"easeInOut"},children:(0,l.jsx)("main",{className:"container mx-auto px-6 sm:px-8",children:(0,l.jsx)(r.Suspense,{fallback:(0,l.jsx)("div",{className:"animate-pulse bg-surface/30 flex items-center justify-center",children:"Loading Content..."}),children:(0,l.jsx)(a,{})})})})}},166:function(e,t,n){"use strict";n.d(t,{default:function(){return r.a}});var l=n(5775),r=n.n(l)},5775:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let l=n(7043);n(7437),n(2265);let r=l._(n(5602));function u(e,t){var n;let l={loading:e=>{let{error:t,isLoading:n,pastDelay:l}=e;return null}};"function"==typeof e&&(l.loader=e);let u={...l,...t};return(0,r.default)({...u,modules:null==(n=u.loadableGenerated)?void 0:n.modules})}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1523:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"BailoutToCSR",{enumerable:!0,get:function(){return r}});let l=n(8993);function r(e){let{reason:t,children:n}=e;if("undefined"==typeof window)throw new l.BailoutToCSRError(t);return n}},5602:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let l=n(7437),r=n(2265),u=n(1523),a=n(49);function o(e){return{default:e&&"default"in e?e.default:e}}let i={loader:()=>Promise.resolve(o(()=>null)),loading:null,ssr:!0},s=function(e){let t={...i,...e},n=(0,r.lazy)(()=>t.loader().then(o)),s=t.loading;function d(e){let o=s?(0,l.jsx)(s,{isLoading:!0,pastDelay:!0,error:null}):null,i=t.ssr?(0,l.jsxs)(l.Fragment,{children:["undefined"==typeof window?(0,l.jsx)(a.PreloadCss,{moduleIds:t.modules}):null,(0,l.jsx)(n,{...e})]}):(0,l.jsx)(u.BailoutToCSR,{reason:"next/dynamic",children:(0,l.jsx)(n,{...e})});return(0,l.jsx)(r.Suspense,{fallback:o,children:i})}return d.displayName="LoadableComponent",d}},49:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"PreloadCss",{enumerable:!0,get:function(){return u}});let l=n(7437),r=n(544);function u(e){let{moduleIds:t}=e;if("undefined"!=typeof window)return null;let n=(0,r.getExpectedRequestStore)("next/dynamic css"),u=[];if(n.reactLoadableManifest&&t){let e=n.reactLoadableManifest;for(let n of t){if(!e[n])continue;let t=e[n].files.filter(e=>e.endsWith(".css"));u.push(...t)}}return 0===u.length?null:(0,l.jsx)(l.Fragment,{children:u.map(e=>(0,l.jsx)("link",{precedence:"dynamic",rel:"stylesheet",href:n.assetPrefix+"/_next/"+encodeURI(e),as:"style"},e))})}}},function(e){e.O(0,[415,971,117,744],function(){return e(e.s=8249)}),_N_E=e.O()}]);