---
layout: post
title: "RISC-V Retro Gaming: The First Retrogaming OS with RISC-V Support"
date: 2026-03-29
author: REG Linux Team
description: "REG Linux is the first and only retrogaming OS to support RISC-V devices. Here's what works, what doesn't, and why RISC-V matters for open-source gaming."
tags: [risc-v, hardware, emulation]
---

REG Linux now runs on RISC-V hardware. As far as we know, no other retrogaming OS does this. It's early, it's not perfect, and it matters more than you might think.

## What RISC-V is and why it matters

RISC-V is an open instruction set architecture. Unlike ARM (licensed by Arm Ltd.) or x86 (controlled by Intel and AMD), RISC-V is royalty-free and open. Anyone can build a RISC-V chip without paying licensing fees or signing agreements.

For the retrogaming and single-board computer community, this is significant. The boards we run on — Raspberry Pi, Orange Pi, Rockchip-based handhelds — all use ARM cores with proprietary licensing. RISC-V removes that dependency. The hardware designs can be as open as the software running on them.

We're not there yet. Current RISC-V boards are slower than their ARM equivalents at the same price point. But the architecture is advancing fast, and early software support is what makes hardware ecosystems viable.

## Supported RISC-V devices

REG Linux currently supports these RISC-V boards:

- **Milk-V Mars** — StarFive JH7110 SoC, quad-core RV64GC at 1.5 GHz, IMG BXE-4-32 GPU
- **Milk-V Meles** — T-Head TH1520 SoC, quad-core C910 at 1.85 GHz, IMG BXM-4-64 GPU
- **StarFive VisionFive 2** — Same JH7110 as the Mars, different board layout
- **SpacemiT-based boards** — K1/M1 SoCs with octa-core X60 cores

You can find all of these on the [download page](/download/). Flash the image to an SD card, boot, and you're in EmulationStation.

## What works

The basics are solid. Boot, display output, SD card, USB controllers, and network all work on the supported boards. EmulationStation runs, RetroArch runs, and you can play games.

Emulators that work well on RISC-V right now:

- **8-bit and 16-bit consoles** — NES, SNES, Game Boy, Genesis, Master System. These run full speed with no issues.
- **GBA** — mGBA runs at full speed on all supported boards.
- **Arcade** — MAME and FinalBurn Neo handle CPS1, CPS2, and most Neo Geo titles without problems.
- **PS1** — PCSX-ReARMed runs many games at playable framerates on the faster boards (TH1520, SpacemiT K1).

## What doesn't work yet

Performance-intensive emulation is the main limitation:

- **N64** — Playable on some titles with the TH1520 and SpacemiT boards. Expect frame drops on complex scenes.
- **PSP** — PPSSPP runs but most 3D games are too slow for comfortable play.
- **Dreamcast, Saturn, DS** — These need more CPU and GPU power than current RISC-V boards provide.
- **GPU acceleration** — Vulkan support is incomplete on most RISC-V GPUs. OpenGL ES works via Mesa on JH7110 boards; the IMG GPUs on TH1520/Meles have proprietary driver support that's improving.

This will change. The JH7110's IMG GPU is getting better Mesa driver support month by month. SpacemiT's K1 has shown promising GPU benchmarks. And new RISC-V SoCs with stronger GPUs are on the roadmap from multiple vendors.

## How REG Linux makes this work

Supporting a new architecture isn't just about compiling for a different target. The Buildroot toolchain needs a working RISC-V cross-compiler, every emulator needs to build and run correctly on RV64, and board-specific kernel patches need to be integrated and maintained.

REG Linux handles this the same way it handles ARM and x86_64 — each board gets a tested image with the right kernel, device tree, and driver stack. The emulator builds are architecture-aware and use RISC-V optimizations where available.

The [compatibility matrix](https://compat.reglinux.org) tracks RISC-V devices alongside everything else. You can check exactly which features work on your specific board before buying.

## Who should try this

If you already have a RISC-V board sitting in a drawer, flash REG Linux and put it to use. It's a great way to play 8-bit and 16-bit games on hardware that otherwise might not have much software to run.

If you're buying specifically for retrogaming and want the best performance per dollar today, ARM handhelds are still the practical choice. A $50 Anbernic handheld will outperform a $50 RISC-V board for emulation.

But if you care about open hardware, or you want to support the ecosystem that will eventually give us truly open retrogaming devices top to bottom, RISC-V is where that future is being built. REG Linux is there now so the software is ready when the hardware catches up.

Check the [supported RISC-V devices](/download/) and grab an image.
