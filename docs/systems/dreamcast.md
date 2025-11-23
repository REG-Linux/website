# Dreamcast

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/dreamcast.webp" alt="Dreamcast icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/dreamcast.png" alt="Dreamcast logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1998 by Sega, the Dreamcast was a console system.

## Technical specifications

- CPU: Hitachi SH-4 32-bit RISC processor at 200 MHz with integrated FPU and SIMD extensions.
- Memory: 16 MB main RAM plus 8 MB video RAM and 2 MB sound RAM shared with the PowerVR2 GPU/dac.
- Display: PowerVR2 CLX2 GPU delivering 640×480 resolution with programmable T&L, 3D textures, and alpha blending.
- Sound: Yamaha AICA chip with 64-channel ADPCM audio and a dedicated ARM7 co-processor for streaming CD-quality audio.

## Supported ROM extensions

cdi, cue, gdi, chd, m3u

## Emulators

- **flycast** (flycast)
- **flycast** (libretro)
- **flycastvl** (libretro)

## ROM layout and BIOS

Dreamcast titles live in `roms/dreamcast` and keep the extensions listed above; that folder is the default path EmulationStation and any front end scans when they mount the Dreamcast collection.

Flycast and RetroArch require the official BIOS files described in the libretro documentation (see `docs.libretro.com/library/flycast/#bios`). Drop those files inside your ROM tree so the emulator can locate them without additional configuration.

## Notes