---
title: 'Kernel Access'
date: '2024-08-04'
image:
  src: '/images/placeholder.webp'
  alt: 'Kernel Access'
description: 'Everything You Need to Worry About'
category: 'technology'
tags: ['computing']
takeaways:
  - 'Kernel access is a powerful capability that allows software to interact directly with an operating systems core.'
  - 'It can provide performance benefits and enable advanced functionality, but also has massive security risks.'
---

Kernel access is a powerful capability that allows software to interact directly with an operating system's core. While this can provide performance benefits and enable advanced functionality, it also has massive security risks.

This article is a PSA/FYI for the few types of software that may be requesting this access without your knowledge.

A recent [incident](/writing/a-simple-operating-system) involving the BSOD demonstrated the risks of kernel access for necessary software. It made me wonder which applications need kernel access and which ones could get by with only user-mode access.

# Hidden in Plain Sight

The following is a list of applications that may require kernel access. A good rule of thumb is to limit kernel access to only the most necessary applications.

| Application                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Anti-Cheat Software             | Anti-cheat software utilizes kernel-level access to monitor real-time game processes, system memory, and hardware interactions. This allows for detecting and preventing cheating methods that operate at a low level, such as memory manipulation or driver exploits.                                                                                                                                                                                           |
| Security Software               | Security software may require kernel-level access to protect the system against malware, viruses, and other threats. This allows it to monitor system calls and intercept potentially malicious activities.                                                                                                                                                                                                                                                      |
| Virtualization Software         | Virtualization software may require kernel-level access to manage virtual machines efficiently and provide near-native performance. This allows for direct hardware resource allocation, memory management, and CPU scheduling for virtual machines.                                                                                                                                                                                                             |
| Performance Monitoring Tools    | Performance monitoring tools may require kernel-level access to interact directly with hardware components and low-level system functions. This allows for accurate monitoring of CPU frequencies, temperatures, voltages, and other hardware metrics. For overclocking tools, kernel-mode operation enables manipulation of hardware settings beyond what's possible in user mode.                                                                              |
| Remote Access Software          | Some remote access solutions use kernel-level components to enhance functionality, security, and performance. Kernel access can enable features like remote desktop integration, screen capture and transmission, and secure encrypted connections.                                                                                                                                                                                                              |
| Backup and Recovery Software    | Backup and recovery software may request kernel-level access to perform system-level backups and provide data recovery features. This allows for creating exact disk images, backing up locked files, and performing bare-metal recovery operations.                                                                                                                                                                                                             |
| Disk Management Tools           | Disk management tools may require kernel-level access to perform low-level disk operations efficiently. This allows for direct manipulation of partition tables, file systems, and disk structures.                                                                                                                                                                                                                                                              |
| VPN Clients                     | Some VPN implementations use kernel-level drivers to enhance performance, security, and integration with the operating system's networking stack. Kernel-mode VPN components can bypass user-mode processing to provide better throughput and lower latency. They can also offer stronger security by intercepting network traffic at a lower level, though this deep integration also increases the potential security risk if the VPN software is compromised. |
| Development and Debugging Tools | Development and debugging tools may utilize kernel-level access to provide essential low-level system access and debugging capabilities for system-level programming, driver development, and operating system internals analysis. These tools can inspect and modify kernel memory, set hardware breakpoints, and analyze system crashes.                                                                                                                       |

Be vigilant about which software you allow this level of access to—reserve it for what's truly necessary and trust only reputable developers unless you know what you're doing.

A little caution goes a long way in keeping your systems secure.
