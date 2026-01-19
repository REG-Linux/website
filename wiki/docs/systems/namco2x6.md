---
title: Namco System 246/256
description: Namco System 246/256 documentation for REG Linux.
---

# Namco System 246/256

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/namco2x6.webp" alt="Namco System 246/256 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/namco2x6.png" alt="Namco System 246/256 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Sony/Namco’s System 246/256 arcade hardware (2000-era) runs the polished fighting, racing and shooter cabinets such as *Tekken 4* and *House of the Dead 2*. REG-Linux bundles them as `namco2x6` so they share common metadata and art.

### Quick reference

* **ROM folder:** `/userdata/roms/namco2x6`
* **Accepted formats:** `.zip` plus matching `.chd`/`.iso` files
* **Emulator:** [Play!](#play)
* **System group:** `ports`

## Technical specifications

- CPU: PlayStation 2-derived Emotion Engine (MIPS III) main processor clocked around 294 MHz with a dedicated I/O controller.
- Memory: 32 MB of RDRAM plus 4 MB embedded frame buffer and texture memory.
- Display: Graphics Synthesizer GPU (147 MHz) capable of 2D/3D at 640×480 with 16.7 million colors.
- Sound: SPU2 multi-channel audio (48 channels) with ADPCM and PCM playback synchronized to the GPU.

## ROM layout

Each title expects a ZIP archive plus its data disk under a folder that matches the arcade ID:

```
/userdata/roms/namco2x6/
├─ tekken4.zip
├─ tekken4/tef1dvd0.chd
└─ soulcalibur.zip
   └─ soulcalibur/scldvd0.chd
```

The ZIP should include the arcade core files while the subfolder holds `.chd`/`.iso` media. Download required extras (`extras.pak`) from
the [xash-extras releases](https://github.com/FWGS/xash-extras/releases/latest) when prompted.

## Emulators

### Play!

The Play! emulator is the supported binary for Namco 246/256 titles. Open `[SELECT]` → **Advanced System Options** to adjust the `namco2x6.*` flags for graphics API (OpenGL/Vulkan), render resolution, vsync, widescreen hacks and smoothing.

## Controls & troubleshooting

The default arcade overlay is shared with other `ports` systems. If a title fails to start:

1. Confirm the ZIP and `.chd` images use the same arcade ID/name.
2. Switch between OpenGL and Vulkan renderers inside the advanced options.

Stay current with the [Play! issue tracker](https://github.com/libretro/Play) for compatibility notes and consult the generic support pages
for general issues.
