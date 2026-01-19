---
title: Dreamcast VMU
description: Dreamcast VMU documentation for REG Linux.
---

# Dreamcast VMU

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/vemulator.webp" alt="Dreamcast VMU icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/vemulator.png" alt="Dreamcast VMU logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

VEmulator replicates the Sega Dreamcast VMU (Visual Memory Unit), the memory card with a monochrome LCD that also plays mini-games. REG-Linux exposes it as `vemulator` so you can launch the dedicated frontend and keep the small `.vms` apps organized.

### Technical specifications

- Manufacturer: Sega
- Release year: 1998
- Hardware type: console

## Quick reference

- **ROM folder:** `/userdata/roms/vemulator`
- **Accepted formats:** `.vms`, `.dci`, `.bin`
- **Emulator:** `libretro: vemulator`
- **System group:** `vemulator`, `dreamcast`

## ROMs

Dump each VMU application into `/userdata/roms/vemulator`. `.vms` is the native format, but `.dci` or `.bin` files exported from Dreamcast tools also work. Keep zipped archives flat with exactly one VMU image inside.

## Emulator

`libretro: vemulator` runs the VMU software with accurate screen and button handling. Use `[HOTKEY]` + south face button to open RetroArch’s Quick Menu and adjust video settings (`vemulator.videomode`, `vemulator.ratio`, `vemulator.shaders`). EmulationStation mirrors backend/latency controls (`vemulator.gfxbackend`, `vemulator.audio_latency`, `vemulator.video_threaded`) as well.

## Controls

The emulator maps the Dreamcast controller’s D-pad and face buttons directly. If a mini-game uses soft keys, save a custom remap through `/remapping_controls_per_emulator` to match your physical gamepad.

## Troubleshooting

- Confirm the VMU image is in the correct format and exists at the archive root.  
- Toggle the video backend between OpenGL/Vulkan if the tiny screen looks distorted.  
- Consult the generic support pages for additional RetroArch troubleshooting.
