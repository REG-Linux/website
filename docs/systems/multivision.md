# Othello Multivision

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/multivision.webp" alt="Othello Multivision icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/multivision.png" alt="Othello Multivision logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Othello Multivision is an SG-1000 / SC-3000 compatible machine from Sega and Tsukuda Original. REG-Linux uses the `multivision` system group to keep its heritage aligned with SG-1000 titles.

## Technical specifications
 
- CPU: Zilog Z80A clocked at 3.58 MHz, the de facto standard of early 8-bit consoles.
- Memory: 2 KB of system RAM with 16 KB of VRAM dedicated to tile and sprite data.
- Display: TMS9918A-style video chip rendering 256×192 output with 16 colors and hardware sprites.
- Sound: AY-3-8912 PSG offering three square-wave channels plus programmable noise.

## Quick reference

- **ROM folder:** `/userdata/roms/multivision`
- **Accepted ROM formats:** `.bin`, `.sg`, `.zip`, `.7z`
- **Emulator/core:** `libretro: GenesisPlusGX`
- **System group:** `multivision`

## BIOS

No BIOS files are required.

## ROMs

Drop Multivision/SG-1000 ROMs into `/userdata/roms/multivision`. The same core handles related Sega 8-bit content.

## Emulators

### RetroArch

RetroArch runs the `libretro: GenesisPlusGX` core for Multivision titles. Standard SG-1000 options include `sg1000.videomode`, `sg1000.ratio`, `sg1000.shaders`, `sg1000.pixel_perfect`, `sg1000.decoration`, `sg1000.game_translation`, `sg1000.audio_latency`, and `sg1000.video_threaded`.

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| GRAPHICS BACKEND | `sg1000.gfxbackend` | Choose OpenGL (`opengl`) or Vulkan (`vulkan`). |
| AUDIO LATENCY | `sg1000.audio_latency` | Buffer in milliseconds (256, 192, 128, 64, 32, 16, 8). |
| THREADED VIDEO | `sg1000.video_threaded` | Enable threaded rendering (`true`, `false`). |

GenesisPlusGX shares the same options as listed in `megadrive.md` for sprite limits, controller types and NTSC filters.

## Controls

Use the REG-Linux Retropad overlay for the default Multivision pad layout.

