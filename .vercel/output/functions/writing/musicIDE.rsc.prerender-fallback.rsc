3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","musicIDE","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","musicIDE","d"],{"children":["__PAGE__?{\"slug\":\"musicIDE\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","musicIDE","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
9:T10d9,
<style jsx>{`
 .prose a {
    text-decoration: underline;
    color: var(--color-accent);
 }
 .prose ol {
    list-style-type: decimal;
    margin-left: 2em; /* Adjust as needed for indentation */
    padding-left: 0.5em; /* Add padding if needed */
 }
 .prose ol li {
    margin-bottom: 0.5em;
    color: var(--color-text-primary);
    line-height: 1.5; /* Adjust line height for better readability */
 }
`}</style>

<div class="tldr-section">

I'm building MusicIDE, which will directly incorporate advanced music theory and LLMs into a Cursor/Musescore/Synthesia-like software.

</div>

With the advent of LLMs and AI wrappers, the barriers to entry in the world of technology are breaking. As Chamath put it, the future will not be governed by people who are good at memorizing things and manually doing laborious computations but rather by tastemakers. Tastemakers know what they want because they've seen what they don't. Unfortunately, when money gets involved, sellouts become a problem. True tastemakers create trends and drive innovation by sticking to their actual tastes rather than catering to their corporate sponsors or audiences. In other words, the more personal something is, the more universal it is.

### Notation Landscape

Dominant notation software like Sibelius is limited, static, and requires meticulous attention to detail throughout every step of the process. To substitute a Db Neopolitan 6 chord in first inversion across 18 instruments for the dominant chord in a symphonic score, the chord must be diagnosed, and each note must be inputted individually across the instruments. Editing this on paper is one thing, but in a notation program, it's so annoying. Keyboard shortcuts and MIDI input help, but we need more.

With MusicIDE, a goal is to be able to prompt the system to do this in the same way that Cursor does - to generate and apply all the changes while giving me the option to further edit the changes before accepting them. This tool will know that you're in the key of C and will generate a Db chord with an F in the bass. To do that, it needs to understand what a Neopolitan chord is, what the six means, what the notes are in every key, and be able to substitute the current notes for the new ones across all the instruments. Traditionalists will say this is blasphemy, and they have a point but this isnt traditional music composition.

### Generated Music?

How will all the other notes be input? Will there be parallel 5ths that bring horror to every music teacher in the hearing distance? Will appogiaturas be considered? Does the counterpoint make sense? Why is this note here instead of there? These are valid questions and should be considered because every choice matters in music, but non-determinism has been thoroughly investigated in the realm of composition and, in some sense, having the voicing/counterpoint/music/etc. being generated is just an extension of the non-deterministic outputs famous composers have used for over a century. We don't know precisely how these AI models work, so we can't predict their exact output - for better or worse.

Generated is the right word to use, but MusicIDE is going to be much more than a generative AI wrapper. It will also feature exhaustive permutations of music concepts and references to historical examples of those concepts. This can help accelerate learning, researching, and writing music in ways that will be easier to explain in future articles once demos are made available.

### Applications

The overarching goal is to aid individuals in Music Research and Composition by giving everyone the compositional and analytical tools that history's greatest musicologists, musicians, and composers have been working with.

This means every open-source score, textbook, concept from music theory, and analytical resource can be built into the program to be used as context for learning, researching, and composing music. The longer-term roadmap for MusicIDE includes tools to learn music on the instrument of your choosing with the help of AR and guitar-hero-inspired visuals for the piano.

Its important to emphasize that while AI is useful for generating templates, boilerplates, ideas, and implementations of ideas - ultimately the choices of AI-assisted composers is by the human - the tastemaker.
a:["music","ai"]
b:{"src":"/misc/placeholder.webp","alt":"MusicIDE"}
c:T1636,/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    h3: "h3"
  }, _provideComponents(), props.components);
  return _jsxs(_Fragment, {
    children: [_jsx("style", {
      jsx: true,
      children: `
 .prose a {
    text-decoration: underline;
    color: var(--color-accent);
 }
 .prose ol {
    list-style-type: decimal;
    margin-left: 2em; /* Adjust as needed for indentation */
    padding-left: 0.5em; /* Add padding if needed */
 }
 .prose ol li {
    margin-bottom: 0.5em;
    color: var(--color-text-primary);
    line-height: 1.5; /* Adjust line height for better readability */
 }
`
    }), "\n", _jsx("div", {
      class: "tldr-section",
      children: _jsx(_components.p, {
        children: "I'm building MusicIDE, which will directly incorporate advanced music theory and LLMs into a Cursor/Musescore/Synthesia-like software."
      })
    }), "\n", _jsx(_components.p, {
      children: "With the advent of LLMs and AI wrappers, the barriers to entry in the world of technology are breaking. As Chamath put it, the future will not be governed by people who are good at memorizing things and manually doing laborious computations but rather by tastemakers. Tastemakers know what they want because they've seen what they don't. Unfortunately, when money gets involved, sellouts become a problem. True tastemakers create trends and drive innovation by sticking to their actual tastes rather than catering to their corporate sponsors or audiences. In other words, the more personal something is, the more universal it is."
    }), "\n", _jsx(_components.h3, {
      children: "Notation Landscape"
    }), "\n", _jsx(_components.p, {
      children: "Dominant notation software like Sibelius is limited, static, and requires meticulous attention to detail throughout every step of the process. To substitute a Db Neopolitan 6 chord in first inversion across 18 instruments for the dominant chord in a symphonic score, the chord must be diagnosed, and each note must be inputted individually across the instruments. Editing this on paper is one thing, but in a notation program, it's so annoying. Keyboard shortcuts and MIDI input help, but we need more."
    }), "\n", _jsx(_components.p, {
      children: "With MusicIDE, a goal is to be able to prompt the system to do this in the same way that Cursor does - to generate and apply all the changes while giving me the option to further edit the changes before accepting them. This tool will know that you're in the key of C and will generate a Db chord with an F in the bass. To do that, it needs to understand what a Neopolitan chord is, what the six means, what the notes are in every key, and be able to substitute the current notes for the new ones across all the instruments. Traditionalists will say this is blasphemy, and they have a point but this isnt traditional music composition."
    }), "\n", _jsx(_components.h3, {
      children: "Generated Music?"
    }), "\n", _jsx(_components.p, {
      children: "How will all the other notes be input? Will there be parallel 5ths that bring horror to every music teacher in the hearing distance? Will appogiaturas be considered? Does the counterpoint make sense? Why is this note here instead of there? These are valid questions and should be considered because every choice matters in music, but non-determinism has been thoroughly investigated in the realm of composition and, in some sense, having the voicing/counterpoint/music/etc. being generated is just an extension of the non-deterministic outputs famous composers have used for over a century. We don't know precisely how these AI models work, so we can't predict their exact output - for better or worse."
    }), "\n", _jsx(_components.p, {
      children: "Generated is the right word to use, but MusicIDE is going to be much more than a generative AI wrapper. It will also feature exhaustive permutations of music concepts and references to historical examples of those concepts. This can help accelerate learning, researching, and writing music in ways that will be easier to explain in future articles once demos are made available."
    }), "\n", _jsx(_components.h3, {
      children: "Applications"
    }), "\n", _jsx(_components.p, {
      children: "The overarching goal is to aid individuals in Music Research and Composition by giving everyone the compositional and analytical tools that history's greatest musicologists, musicians, and composers have been working with."
    }), "\n", _jsx(_components.p, {
      children: "This means every open-source score, textbook, concept from music theory, and analytical resource can be built into the program to be used as context for learning, researching, and composing music. The longer-term roadmap for MusicIDE includes tools to learn music on the instrument of your choosing with the help of AR and guitar-hero-inspired visuals for the piano."
    }), "\n", _jsx(_components.p, {
      children: "Its important to emphasize that while AI is useful for generating templates, boilerplates, ideas, and implementations of ideas - ultimately the choices of AI-assisted composers is by the human - the tastemaker."
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = Object.assign({}, _provideComponents(), props.components);
  return MDXLayout ? _jsx(MDXLayout, Object.assign({}, props, {
    children: _jsx(_createMdxContent, props)
  })) : _createMdxContent(props);
}
return {
  default: MDXContent
};
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"musicIDE","slug":"musicIDE","title":"MusicIDE","content":"$9","date":"2024-10-25","link":"/writing/musicIDE","frontmatter":{"title":"MusicIDE","date":"2024-10-25","featured":false,"draft":false,"description":"Cursor + Musescore for Research + Composition","tags":["music","ai"],"image":{"src":"/misc/placeholder.webp","alt":"MusicIDE"}},"description":"Cursor + Musescore for Research + Composition","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
