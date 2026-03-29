---
layout: post
title: "Two Years In, Approaching Release"
date: 2026-03-29
author: REG Linux Team
description: "REG Linux has been in development for two years. Here's what we built, where we are, and what's next."
tags: [news, release, milestone]
---

REG Linux started in early 2024 as a Buildroot-based retrogaming OS with a simple idea: support as many devices as possible, keep the system minimal, and make it work out of the box. Two years later, we're approaching a stable release.

Here's what happened between then and now.

## The numbers

- **186 supported devices** across 49 brands and 4 CPU architectures (ARM, AArch64, RISC-V, x86_64)
- **52 SoCs** with tested board support packages
- **176 pull requests** merged on the main repo
- Buildroot toolchain maintained in sync with upstream, kernel forks for dozens of SoCs
- EmulationStation frontend, RetroArch, and 60+ standalone emulators and game engines

## What we shipped

The first public images landed in mid-2024 with the **24.06** and **24.07** releases, covering a handful of ARM handhelds and SBCs. Device support expanded fast after that — every few weeks, another batch of boards got working images.

Some milestones along the way:

**RISC-V support.** We added images for the Milk-V Mars, Milk-V Meles, StarFive VisionFive 2, and SpacemiT K1 boards. REG Linux is still the only retrogaming OS running on RISC-V. It's early, but the 8-bit and 16-bit emulators run at full speed and PS1 is playable on the faster boards.

**TV box support.** Cheap Amlogic-based Android TV boxes can run REG Linux. We added a `tvbox` device class and images for the Beelink GT-King, GT-King Pro, and others. These are $30-50 boxes with good SoCs that make decent emulation stations.

**x86_64 and PC gaming handhelds.** Steam Deck, ROG Ally, and AYANEO devices are supported alongside standard x86_64 PCs. Unified GRUB boot, Secure Boot shim signing, and proper GPU detection for Intel, AMD, and NVIDIA hardware.

**Immutable root filesystem.** The system partition is read-only at runtime. Power loss during a session doesn't corrupt the OS. User data lives on a separate partition. This was an architectural decision from the start and it's paid off in reliability.

**Compatibility matrix.** We built [compat.reglinux.org](https://compat.reglinux.org) — a live dashboard where every device has per-feature status tracking (boot, WiFi, Bluetooth, display, GPU, suspend, audio, USB, and more). Devices can self-report their hardware compatibility automatically after boot. No manual testing spreadsheets.

**Website and wiki overhaul.** The [reglinux.org](https://reglinux.org) site was rebuilt from scratch with device pages, download links resolved directly from GitHub releases, an embeddable compatibility widget, and a full wiki generated from device metadata.

## What's left

The **25.09-preview** tag is on the current development branch. Before we call it stable:

- Fill in the compatibility matrix with real test data from more devices
- Complete the remaining device images that don't have clean boot
- Polish the EmulationStation theme and defaults for smaller screens
- Documentation pass on the wiki for the most popular devices
- Ship the `reglinux-compat` package in a build so devices auto-report

The foundation is solid. The toolchain builds, the images boot, the emulators run. What remains is testing breadth and polish.

## Get involved

If you have a supported device, the best thing you can do is flash an image, test it, and report what works. The [compatibility matrix](https://compat.reglinux.org) accepts submissions from anyone with a GitHub account.

Bug reports and pull requests go to [GitHub](https://github.com/REG-Linux/REG-Linux). Discussion happens on [Discord](https://discord.gg/a9HH4ZpVqp).

Two years of building. 186 devices. Four architectures. Approaching release. Grab an image from the [download page](/download/) and try it.
