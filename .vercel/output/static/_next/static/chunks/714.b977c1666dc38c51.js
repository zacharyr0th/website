(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[714],{4714:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return p}});var r={};n.r(r),n.d(r,{MDXContext:function(){return c},MDXProvider:function(){return m},useMDXComponents:function(){return u},withMDXComponents:function(){return s}});var l=n(7437),a=n(2265),i=n(3145),o=n(9328);let c=a.createContext({});function s(e){return function(t){let n=u(t.components);return a.createElement(e,{...t,allComponents:n})}}function u(e){let t=a.useContext(c);return a.useMemo(()=>"function"==typeof e?e(t):{...t,...e},[t,e])}let d={};function m({components:e,children:t,disableParentContext:n}){let r;return r=n?"function"==typeof e?e({}):e||d:u(e),a.createElement(c.Provider,{value:r},t)}function x({compiledSource:e,frontmatter:t,scope:n,components:l={},lazy:i}){let[c,s]=(0,a.useState)(!i||"undefined"==typeof window);(0,a.useEffect)(()=>{if(i){let e=window.requestIdleCallback(()=>{s(!0)});return()=>window.cancelIdleCallback(e)}},[]);let u=(0,a.useMemo)(()=>{let l=Object.assign({opts:{...r,...o.jsxRuntime}},{frontmatter:t},n),a=Object.keys(l),i=Object.values(l),c=Reflect.construct(Function,a.concat(`${e}`));return c.apply(c,i).default},[n,e]);if(!c)return a.createElement("div",{dangerouslySetInnerHTML:{__html:""},suppressHydrationWarning:!0});let d=a.createElement(m,{components:l},a.createElement(u,null));return i?a.createElement("div",null,d):d}"undefined"!=typeof window&&(window.requestIdleCallback=window.requestIdleCallback||function(e){var t=Date.now();return setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},window.cancelIdleCallback=window.cancelIdleCallback||function(e){clearTimeout(e)});let f={h1:e=>{let{children:t,className:n,...r}=e;return(0,l.jsx)("h1",{...r,className:"text-4xl font-bold tracking-wide mt-6 mb-2 text-text-primary ".concat(n||""),children:t})},h2:e=>{let{children:t,className:n,...r}=e;return(0,l.jsx)("h2",{...r,className:"text-3xl font-bold tracking-wide mt-6 mb-2 text-text-primary ".concat(n||""),children:t})},h3:e=>{let{children:t,className:n,...r}=e;return(0,l.jsx)("h3",{...r,className:"text-2xl font-bold tracking-wide mt-6 mb-2 text-text-primary ".concat(n||""),children:t})},p:e=>{let{children:t}=e;return(0,l.jsx)("p",{className:"text-lg leading-relaxed mb-6 text-text-primary",children:t})},a:e=>{let{children:t,href:n}=e;return(0,l.jsx)("a",{href:n,className:"text-accent hover:opacity-80 transition-opacity duration-300",target:(null==n?void 0:n.startsWith("http"))?"_blank":void 0,rel:(null==n?void 0:n.startsWith("http"))?"noopener noreferrer":void 0,children:t})},img:e=>{let{src:t,alt:n}=e;return t?(0,l.jsx)("div",{className:"my-8 rounded-lg overflow-hidden bg-surface",children:(0,l.jsx)(i.default,{src:t,alt:n||"",width:1200,height:675,className:"w-full h-auto",priority:!0})}):null},code:e=>{let{children:t}=e;return(0,l.jsx)("code",{className:"px-1.5 py-0.5 rounded bg-surface text-text-primary font-mono text-sm",children:t})},pre:e=>{let{children:t}=e;return(0,l.jsx)("pre",{className:"p-4 rounded-lg bg-surface text-text-primary font-mono text-sm overflow-x-auto my-4",children:t})},ul:e=>{let{children:t}=e;return(0,l.jsx)("ul",{className:"list-disc list-inside mb-6 text-text-primary",children:t})},ol:e=>{let{children:t}=e;return(0,l.jsx)("ol",{className:"list-decimal list-inside mb-6 text-text-primary",children:t})},li:e=>{let{children:t}=e;return(0,l.jsx)("li",{className:"mb-2 text-text-primary",children:t})},blockquote:e=>{let{children:t}=e;return(0,l.jsx)("blockquote",{className:"border-l-4 border-accent pl-4 italic my-6 text-text-secondary",children:t})}};var p=e=>{let{serializedContent:t}=e;return(0,l.jsx)("div",{className:"prose prose-lg max-w-none",children:(0,l.jsx)(x,{...t,components:f})})}},9328:function(e,t,n){e.exports.jsxRuntime=n(7437)}}]);