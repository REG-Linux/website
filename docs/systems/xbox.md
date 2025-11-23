# Xbox

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/xbox.webp" alt="Xbox icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/xbox.png" alt="Xbox logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2003 by Microsoft, the Xbox was a console system.

## Technical specifications

- CPU: Custom Intel Pentium III-derived 32-bit processor at 733 MHz with 3.2 MB of on-die cache.
- Memory: 64 MB of unified DDR SDRAM shared between the CPU and ATI NV2A graphics chip.
- Display: NVIDIA NV2A GPU running at 233 MHz capable of 480p/720p output with hardware transform-and-lighting and texture mapping.
- Sound: Realtek ALC650-based audio subsystem supporting Dolby Digital 5.1 pass-through and multi-channel PCM mixing.

## Supported ROM extensions

iso, zar

## Emulators

- **xemu** (xemu)

## ROM layout and BIOS

Xbox disc images belong under the default `roms/xbox` folder and the only officially recognized file type is `.iso`, which keeps RetroArch and front ends from picking up unrelated artifacts.

Xemu requires a BIOS such as `mcpx_1.0.bin` or the later `Complex_4627v1.03.bin`, and it will look for those files in the same `roms/bios/xemu/bios` tree that other REG Linux emulators use. Optional artifacts like `eeprom.bin` and `xbox_hdd.qcow2` can be staged in `roms/bios/xemu/eeprom` and `/roms/bios/xemu/hdd` if you want save partitions or HDD images to be reused across boots.

## Notes