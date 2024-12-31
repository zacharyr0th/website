3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","simple-os","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","simple-os","d"],{"children":["__PAGE__?{\"slug\":\"simple-os\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","simple-os","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
9:T172c,
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

A software update crashed millions of computers on July 19, 2024, causing widespread flight cancellations.
I was fortunate enough to have booked my flight on this day, and while waiting in the terminal, I started to think about kernels.

</div>

My flight was luckily only delayed by two hours, but I felt for those whose journeys were more severely disrupted.
That sympathy disapated when Delta notified me four hours before my return flight a few days later that they had canceled it.
The cause was a widespread failure that affected 8.5 million Windows computers running CrowdStrike, a cybersecurity software that half of
the top S&P 500 companies use.

![SFO BSOD](/images/simpleos-2.webp)

## The Incident

At 04:09 UTC on July 19, CrowdStrike released an update for its Falcon sensor software on Windows systems.
A defect in this update caused these systems to crash, triggering the infamous Blue Screen of Death (BSOD) which signals that the computer is
incapacitated and requires a manual reboot.

The root cause was a problematic modification to a configuration file, Channel File 291, which handles screening named pipes.
This led to an out-of-bounds memory read, causing an invalid page fault which was forcefed to each device by an auto-update from CrowdStrike.
In simpler terms, the program tried to access memory it shouldn't, causing a crash and this update was forced upon millions of systems, ultimately
bringing them into a BSOD state and rendering them temporarily useless.

Like many security products, CrowdStrike's Falcon sensor operates at the kernel level to provide robust system protection.
This level of access introduces the risk of an application crashing the entire system (or worse) and after that occurred on July 19th and I was
left to my own devices in the airport terminal, I started thinking about the variations of kernels out there and what could be done to prevent
this from happening again while also realizing I was severely understudied on the topic.

## Kernels

A kernel is the core of an operating system, providing essential services to other programs. There are many different types of kernels,
including monolithic, micro, hybrid, exo, and nano - all with their own pros and cons.

<table>
  <thead>
    <tr>
      <th>Type</th>
      <th>Description</th>
      <th>Pros</th>
      <th>Cons</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monolithic Kernels</td>
      <td>Run all OS services in kernel space</td>
      <td>High performance, efficient</td>
      <td>Large size, potential system-wide crashes</td>
    </tr>
    <tr>
      <td>Microkernels</td>
      <td>Most services run in user space</td>
      <td>Enhanced stability and security</td>
      <td>Lower performance</td>
    </tr>
    <tr>
      <td>Hybrid Kernels</td>
      <td>Balance between monolithic and microkernels</td>
      <td>Optimized performance and modularity</td>
      <td>Increased complexity</td>
    </tr>
    <tr>
      <td>Exokernels</td>
      <td>Gives programs direct control instead of relying on the kernel</td>
      <td>High performance, efficient</td>
      <td>Increased complexity</td>
    </tr>
    <tr>
      <td>Nanokernels</td>
      <td>Offer bare minimum services for hardware management</td>
      <td>Minimal attack surface, highly specialized</td>
      <td>Limited functionality, not suitable for general-purpose use</td>
    </tr>
  </tbody>
</table>

## Multi-Tier Kernels

Because of how early I am placed on the Dunning-Kreuger chart when it comes to this topic, I figure a multi-tier kernel architecture can
theoretically prevent higher-level applications from having unrestricted access to the kernel, thereby enhancing system stability and security.

- Core OS functions operate at the lowest, most privileged level.
- Essential drivers and security software run at a slightly higher level with restricted access.
- Application-level software operates at the highest level with minimal kernel access.

During my brief research, I found a [paper](https://faculty.nps.edu/irvine/Publications/Publications2006/NPS-CS-06-001_Analysis3KernelArchi.pdf)
discussing three different multilevel security kernel architectures. The authors rightly conclude that the choice of architecture depends on the
specific requirements of a system or deployment scenario and that the goal is to prevent a single issue from compromising the entire system or affecting core OS functions.

One clear benefit of implementing a multi-tier approach is that you could facilitate a least privilege architecture, potentially limiting the impact of vulnerabilities or bugs,
such as the one in Falcon's Channel File 291.

## SimpleOS: A Prototype Implementation

After learning so much about kernels, I decided to prototype one. There is not much to it, but it will be a continuous project. Since this is my
first kernel, I figured I'd make it monolithic in order to understand standard practices. To start, SimpleOS features the following:

1. Monolithic kernel design
2. Interrupt handling system with custom handler support
3. Memory management with paging and simple heap allocation
4. Basic multitasking using round-robin scheduling
5. Essential x86 structures (GDT, IDT) and initialization

View the full source code [here](https://github.com/zacharyr0th/SimpleOS) and stay tuned for upcoming PRs to SimpleOS and future kernel projects which further explore the multi-tier ideas mentioned above.

![SimpleOS](/images/simpleos-1.webp)
a:["tech"]
b:{"src":"/images/simpleos-0.webp","alt":"SimpleOS"}
c:T2583,/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    img: "img",
    h2: "h2",
    ul: "ul",
    li: "li",
    a: "a",
    ol: "ol"
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
        children: "A software update crashed millions of computers on July 19, 2024, causing widespread flight cancellations.\nI was fortunate enough to have booked my flight on this day, and while waiting in the terminal, I started to think about kernels."
      })
    }), "\n", _jsx(_components.p, {
      children: "My flight was luckily only delayed by two hours, but I felt for those whose journeys were more severely disrupted.\nThat sympathy disapated when Delta notified me four hours before my return flight a few days later that they had canceled it.\nThe cause was a widespread failure that affected 8.5 million Windows computers running CrowdStrike, a cybersecurity software that half of\nthe top S&P 500 companies use."
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/simpleos-2.webp",
        alt: "SFO BSOD"
      })
    }), "\n", _jsx(_components.h2, {
      children: "The Incident"
    }), "\n", _jsx(_components.p, {
      children: "At 04:09 UTC on July 19, CrowdStrike released an update for its Falcon sensor software on Windows systems.\nA defect in this update caused these systems to crash, triggering the infamous Blue Screen of Death (BSOD) which signals that the computer is\nincapacitated and requires a manual reboot."
    }), "\n", _jsx(_components.p, {
      children: "The root cause was a problematic modification to a configuration file, Channel File 291, which handles screening named pipes.\nThis led to an out-of-bounds memory read, causing an invalid page fault which was forcefed to each device by an auto-update from CrowdStrike.\nIn simpler terms, the program tried to access memory it shouldn't, causing a crash and this update was forced upon millions of systems, ultimately\nbringing them into a BSOD state and rendering them temporarily useless."
    }), "\n", _jsx(_components.p, {
      children: "Like many security products, CrowdStrike's Falcon sensor operates at the kernel level to provide robust system protection.\nThis level of access introduces the risk of an application crashing the entire system (or worse) and after that occurred on July 19th and I was\nleft to my own devices in the airport terminal, I started thinking about the variations of kernels out there and what could be done to prevent\nthis from happening again while also realizing I was severely understudied on the topic."
    }), "\n", _jsx(_components.h2, {
      children: "Kernels"
    }), "\n", _jsx(_components.p, {
      children: "A kernel is the core of an operating system, providing essential services to other programs. There are many different types of kernels,\nincluding monolithic, micro, hybrid, exo, and nano - all with their own pros and cons."
    }), "\n", _jsxs("table", {
      children: [_jsx("thead", {
        children: _jsxs("tr", {
          children: [_jsx("th", {
            children: "Type"
          }), _jsx("th", {
            children: "Description"
          }), _jsx("th", {
            children: "Pros"
          }), _jsx("th", {
            children: "Cons"
          })]
        })
      }), _jsxs("tbody", {
        children: [_jsxs("tr", {
          children: [_jsx("td", {
            children: "Monolithic Kernels"
          }), _jsx("td", {
            children: "Run all OS services in kernel space"
          }), _jsx("td", {
            children: "High performance, efficient"
          }), _jsx("td", {
            children: "Large size, potential system-wide crashes"
          })]
        }), _jsxs("tr", {
          children: [_jsx("td", {
            children: "Microkernels"
          }), _jsx("td", {
            children: "Most services run in user space"
          }), _jsx("td", {
            children: "Enhanced stability and security"
          }), _jsx("td", {
            children: "Lower performance"
          })]
        }), _jsxs("tr", {
          children: [_jsx("td", {
            children: "Hybrid Kernels"
          }), _jsx("td", {
            children: "Balance between monolithic and microkernels"
          }), _jsx("td", {
            children: "Optimized performance and modularity"
          }), _jsx("td", {
            children: "Increased complexity"
          })]
        }), _jsxs("tr", {
          children: [_jsx("td", {
            children: "Exokernels"
          }), _jsx("td", {
            children: "Gives programs direct control instead of relying on the kernel"
          }), _jsx("td", {
            children: "High performance, efficient"
          }), _jsx("td", {
            children: "Increased complexity"
          })]
        }), _jsxs("tr", {
          children: [_jsx("td", {
            children: "Nanokernels"
          }), _jsx("td", {
            children: "Offer bare minimum services for hardware management"
          }), _jsx("td", {
            children: "Minimal attack surface, highly specialized"
          }), _jsx("td", {
            children: "Limited functionality, not suitable for general-purpose use"
          })]
        })]
      })]
    }), "\n", _jsx(_components.h2, {
      children: "Multi-Tier Kernels"
    }), "\n", _jsx(_components.p, {
      children: "Because of how early I am placed on the Dunning-Kreuger chart when it comes to this topic, I figure a multi-tier kernel architecture can\ntheoretically prevent higher-level applications from having unrestricted access to the kernel, thereby enhancing system stability and security."
    }), "\n", _jsxs(_components.ul, {
      children: ["\n", _jsx(_components.li, {
        children: "Core OS functions operate at the lowest, most privileged level."
      }), "\n", _jsx(_components.li, {
        children: "Essential drivers and security software run at a slightly higher level with restricted access."
      }), "\n", _jsx(_components.li, {
        children: "Application-level software operates at the highest level with minimal kernel access."
      }), "\n"]
    }), "\n", _jsxs(_components.p, {
      children: ["During my brief research, I found a ", _jsx(_components.a, {
        href: "https://faculty.nps.edu/irvine/Publications/Publications2006/NPS-CS-06-001_Analysis3KernelArchi.pdf",
        children: "paper"
      }), "\ndiscussing three different multilevel security kernel architectures. The authors rightly conclude that the choice of architecture depends on the\nspecific requirements of a system or deployment scenario and that the goal is to prevent a single issue from compromising the entire system or affecting core OS functions."]
    }), "\n", _jsx(_components.p, {
      children: "One clear benefit of implementing a multi-tier approach is that you could facilitate a least privilege architecture, potentially limiting the impact of vulnerabilities or bugs,\nsuch as the one in Falcon's Channel File 291."
    }), "\n", _jsx(_components.h2, {
      children: "SimpleOS: A Prototype Implementation"
    }), "\n", _jsx(_components.p, {
      children: "After learning so much about kernels, I decided to prototype one. There is not much to it, but it will be a continuous project. Since this is my\nfirst kernel, I figured I'd make it monolithic in order to understand standard practices. To start, SimpleOS features the following:"
    }), "\n", _jsxs(_components.ol, {
      children: ["\n", _jsx(_components.li, {
        children: "Monolithic kernel design"
      }), "\n", _jsx(_components.li, {
        children: "Interrupt handling system with custom handler support"
      }), "\n", _jsx(_components.li, {
        children: "Memory management with paging and simple heap allocation"
      }), "\n", _jsx(_components.li, {
        children: "Basic multitasking using round-robin scheduling"
      }), "\n", _jsx(_components.li, {
        children: "Essential x86 structures (GDT, IDT) and initialization"
      }), "\n"]
    }), "\n", _jsxs(_components.p, {
      children: ["View the full source code ", _jsx(_components.a, {
        href: "https://github.com/zacharyr0th/SimpleOS",
        children: "here"
      }), " and stay tuned for upcoming PRs to SimpleOS and future kernel projects which further explore the multi-tier ideas mentioned above."]
    }), "\n", _jsx(_components.p, {
      children: _jsx(_components.img, {
        src: "/images/simpleos-1.webp",
        alt: "SimpleOS"
      })
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
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"simple-os","slug":"simple-os","title":"SimpleOS","content":"$9","date":"2024-10-25","link":"/writing/simple-os","frontmatter":{"title":"SimpleOS","date":"2024-10-25","featured":false,"draft":false,"description":"BSOD and the Need for a Multi-Layered Kernel","tags":["tech"],"image":{"src":"/images/simpleos-0.webp","alt":"SimpleOS"}},"description":"BSOD and the Need for a Multi-Layered Kernel","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
