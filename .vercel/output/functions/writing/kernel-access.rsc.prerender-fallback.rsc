3:I[4707,[],""]
5:I[6423,[],""]
6:I[1219,["699","static/chunks/8e1d74a4-ad4bf89554721df6.js","240","static/chunks/53c13509-baee78f924a43d76.js","648","static/chunks/648-72b1d35da4622b0f.js","645","static/chunks/645-05470026dc0ac1bb.js","185","static/chunks/app/layout-cada55bb27452987.js"],"default"]
4:["slug","kernel-access","d"]
0:["grA9K1SjsH0NUYVc-63DG",[[["",{"children":["writing",{"children":[["slug","kernel-access","d"],{"children":["__PAGE__?{\"slug\":\"kernel-access\"}",{}]}]}]},"$undefined","$undefined",true],["",{"children":["writing",{"children":[["slug","kernel-access","d"],{"children":["__PAGE__",{},[["$L1","$L2",[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/aec009f31cb9d8bc.css","precedence":"next","crossOrigin":"$undefined"}]]],null],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children","$4","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[null,["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children","writing","children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":"$undefined","notFoundStyles":"$undefined"}]],null]},[[[["$","link","0",{"rel":"stylesheet","href":"/_next/static/css/47ca0a6a35ccd714.css","precedence":"next","crossOrigin":"$undefined"}]],["$","html",null,{"lang":"en","data-theme":"dark","suppressHydrationWarning":true,"children":["$","body",null,{"className":"min-h-screen bg-background text-text-primary antialiased","children":["$","$L6",null,{"children":["$","$L3",null,{"parallelRouterKey":"children","segmentPath":["children"],"error":"$undefined","errorStyles":"$undefined","errorScripts":"$undefined","template":["$","$L5",null,{}],"templateStyles":"$undefined","templateScripts":"$undefined","notFound":[["$","title",null,{"children":"404: This page could not be found."}],["$","div",null,{"style":{"fontFamily":"system-ui,\"Segoe UI\",Roboto,Helvetica,Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\"","height":"100vh","textAlign":"center","display":"flex","flexDirection":"column","alignItems":"center","justifyContent":"center"},"children":["$","div",null,{"children":[["$","style",null,{"dangerouslySetInnerHTML":{"__html":"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}"}}],["$","h1",null,{"className":"next-error-h1","style":{"display":"inline-block","margin":"0 20px 0 0","padding":"0 23px 0 0","fontSize":24,"fontWeight":500,"verticalAlign":"top","lineHeight":"49px"},"children":"404"}],["$","div",null,{"style":{"display":"inline-block"},"children":["$","h2",null,{"style":{"fontSize":14,"fontWeight":400,"lineHeight":"49px","margin":0},"children":"This page could not be found."}]}]]}]}]],"notFoundStyles":[]}]}]}]}]],null],null],["$L7",null]]]]
7:[["$","meta","0",{"name":"viewport","content":"width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"}],["$","meta","1",{"name":"theme-color","content":"#000000"}],["$","meta","2",{"charSet":"utf-8"}],["$","meta","3",{"name":"description","content":"Personal website and portfolio of Zachary Tyler Roth"}]]
1:null
8:I[1857,["145","static/chunks/145-8b35c737af67d716.js","63","static/chunks/app/writing/%5Bslug%5D/page-3c352fe994859c60.js"],"default"]
9:T1c80,
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

Kernel access is a powerful capability that allows software to interact directly with an operating system's core. While this can provide performance benefits and enable advanced functionality, it also has massive security risks.

This article highlights a few types of software that may be requesting this access without you even realizing.

</div>

A recent [incident](/writing/a-simple-operating-system) involving the BSOD demonstrated the risks of kernel access for necessary software. It made me wonder which applications need kernel access and which ones could get by with only user-mode access.

### Hidden in plain sight

The following is a list of applications that may require kernel access. A good rule of thumb is to limit kernel access to only the most necessary applications.

| Application                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anti-Cheat Software             | Anti-cheat software utilizes kernel-level access to monitor real-time game processes, system memory, and hardware interactions. This allows for detecting and preventing cheating methods that operate at a low level, such as memory manipulation or driver exploits.                                                                                                                                                                                           |
| Security Software               | Security software may require kernel-level access to protect the system against malware, viruses, and other threats. This access allows it to monitor system calls and intercept potentially malicious activities.                                                                                                                                                                                                                                               |
| Virtualization Software         | Virtualization software may require kernel-level access to manage virtual machines efficiently and provide near-native performance. This allows for direct hardware resource allocation, memory management, and CPU scheduling for virtual machines.                                                                                                                                                                                                             |
| Performance Monitoring Tools    | Performance monitoring tools may require kernel-level access to interact directly with hardware components and low-level system functions. This allows for accurate monitoring of CPU frequencies, temperatures, voltages, and other hardware metrics. For overclocking tools, kernel-mode operation enables manipulation of hardware settings beyond what's possible in user mode.                                                                              |
| Remote Access Software          | Some remote access solutions use kernel-level components to enhance functionality, security, and performance. Kernel access can enable features like remote desktop integration, screen capture and transmission, and secure encrypted connections.                                                                                                                                                                                                              |
| Backup and Recovery Software    | Backup and recovery software may request kernel-level access to perform system-level backups and provide data recovery features. This allows for creating exact disk images, backing up locked files, and performing bare-metal recovery operations.                                                                                                                                                                                                             |
| Disk Management Tools           | Disk management tools may require kernel-level access to perform low-level disk operations efficiently. This allows for direct manipulation of partition tables, file systems, and disk structures.                                                                                                                                                                                                                                                              |
| VPN Clients                     | Some VPN implementations use kernel-level drivers to enhance performance, security, and integration with the operating system's networking stack. Kernel-mode VPN components can bypass user-mode processing to provide better throughput and lower latency. They can also offer stronger security by intercepting network traffic at a lower level, though this deep integration also increases the potential security risk if the VPN software is compromised. |
| Development and Debugging Tools | Development and debugging tools may utilize kernel-level access to provide essential low-level system access and debugging capabilities for system-level programming, driver development, and operating system internals analysis. These tools can inspect and modify kernel memory, set hardware breakpoints, and analyze system crashes.                                                                                                                       |

## Be Aware

While kernel access provides powerful capabilities, it's important to recognize the risks involved. The path of least resistance is not always the most straightforward or most secure, and a handful of incumbent kernel architectures will dominate the market in the foreseeable future.

In the meantime, there is plenty of room for innovation in the kernel design space. I'm most interested in multi-layered kernel designs that can provide the performance of a monolithic kernel with the security and modularity of a microkernel. There may also be a demand for kernels specifically designed for a real-time data processing use case, such as high-frequency trading or blockchain validation.
a:["tech"]
b:{"src":"/misc/placeholder.webp","alt":"Kernel Access"}
c:T21b1,/*@jsxRuntime automatic @jsxImportSource react*/
const {Fragment: _Fragment, jsx: _jsx, jsxs: _jsxs} = arguments[0];
const {useMDXComponents: _provideComponents} = arguments[0];
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p",
    a: "a",
    h3: "h3",
    h2: "h2"
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
    }), "\n", _jsxs("div", {
      class: "tldr-section",
      children: [_jsx(_components.p, {
        children: "Kernel access is a powerful capability that allows software to interact directly with an operating system's core. While this can provide performance benefits and enable advanced functionality, it also has massive security risks."
      }), _jsx(_components.p, {
        children: "This article highlights a few types of software that may be requesting this access without you even realizing."
      })]
    }), "\n", _jsxs(_components.p, {
      children: ["A recent ", _jsx(_components.a, {
        href: "/writing/a-simple-operating-system",
        children: "incident"
      }), " involving the BSOD demonstrated the risks of kernel access for necessary software. It made me wonder which applications need kernel access and which ones could get by with only user-mode access."]
    }), "\n", _jsx(_components.h3, {
      children: "Hidden in plain sight"
    }), "\n", _jsx(_components.p, {
      children: "The following is a list of applications that may require kernel access. A good rule of thumb is to limit kernel access to only the most necessary applications."
    }), "\n", _jsx(_components.p, {
      children: "| Application                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |\n| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\n| Anti-Cheat Software             | Anti-cheat software utilizes kernel-level access to monitor real-time game processes, system memory, and hardware interactions. This allows for detecting and preventing cheating methods that operate at a low level, such as memory manipulation or driver exploits.                                                                                                                                                                                           |\n| Security Software               | Security software may require kernel-level access to protect the system against malware, viruses, and other threats. This access allows it to monitor system calls and intercept potentially malicious activities.                                                                                                                                                                                                                                               |\n| Virtualization Software         | Virtualization software may require kernel-level access to manage virtual machines efficiently and provide near-native performance. This allows for direct hardware resource allocation, memory management, and CPU scheduling for virtual machines.                                                                                                                                                                                                             |\n| Performance Monitoring Tools    | Performance monitoring tools may require kernel-level access to interact directly with hardware components and low-level system functions. This allows for accurate monitoring of CPU frequencies, temperatures, voltages, and other hardware metrics. For overclocking tools, kernel-mode operation enables manipulation of hardware settings beyond what's possible in user mode.                                                                              |\n| Remote Access Software          | Some remote access solutions use kernel-level components to enhance functionality, security, and performance. Kernel access can enable features like remote desktop integration, screen capture and transmission, and secure encrypted connections.                                                                                                                                                                                                              |\n| Backup and Recovery Software    | Backup and recovery software may request kernel-level access to perform system-level backups and provide data recovery features. This allows for creating exact disk images, backing up locked files, and performing bare-metal recovery operations.                                                                                                                                                                                                             |\n| Disk Management Tools           | Disk management tools may require kernel-level access to perform low-level disk operations efficiently. This allows for direct manipulation of partition tables, file systems, and disk structures.                                                                                                                                                                                                                                                              |\n| VPN Clients                     | Some VPN implementations use kernel-level drivers to enhance performance, security, and integration with the operating system's networking stack. Kernel-mode VPN components can bypass user-mode processing to provide better throughput and lower latency. They can also offer stronger security by intercepting network traffic at a lower level, though this deep integration also increases the potential security risk if the VPN software is compromised. |\n| Development and Debugging Tools | Development and debugging tools may utilize kernel-level access to provide essential low-level system access and debugging capabilities for system-level programming, driver development, and operating system internals analysis. These tools can inspect and modify kernel memory, set hardware breakpoints, and analyze system crashes.                                                                                                                       |"
    }), "\n", _jsx(_components.h2, {
      children: "Be Aware"
    }), "\n", _jsx(_components.p, {
      children: "While kernel access provides powerful capabilities, it's important to recognize the risks involved. The path of least resistance is not always the most straightforward or most secure, and a handful of incumbent kernel architectures will dominate the market in the foreseeable future."
    }), "\n", _jsx(_components.p, {
      children: "In the meantime, there is plenty of room for innovation in the kernel design space. I'm most interested in multi-layered kernel designs that can provide the performance of a monolithic kernel with the security and modularity of a microkernel. There may also be a demand for kernels specifically designed for a real-time data processing use case, such as high-frequency trading or blockchain validation."
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
2:["$","div",null,{"className":"content-page font-mono bg-gradient-to-b from-background to-surface/30","children":["$","main",null,{"className":"container mx-auto","children":["$","$L8",null,{"article":{"id":"kernel-access","slug":"kernel-access","title":"Kernel Access","content":"$9","date":"2024-10-25","link":"/writing/kernel-access","frontmatter":{"title":"Kernel Access","date":"2024-10-25","featured":false,"draft":false,"description":"Everything You Need to Worry About","tags":["tech"],"image":{"src":"/misc/placeholder.webp","alt":"Kernel Access"}},"description":"Everything You Need to Worry About","tags":"$a","image":"$b"},"serializedContent":{"compiledSource":"$c","frontmatter":{},"scope":{}}}]}]}]
