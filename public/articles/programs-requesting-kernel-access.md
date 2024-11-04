---
title: 'Programs Requesting Kernel Access'
date: '2024-10-25'
image: /misc/placeholder.webp
subtitle: Everything you need to worry about.
description: 'Everything you need to worry about.'
tags: ['Tech']
---

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
