# Wii

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/wii.webp" alt="Wii icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/wii.png" alt="Wii logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2006 by Nintendo, the Wii was a console system.

## Technical specifications

- Manufacturer: Nintendo
- Release year: 2006
- Hardware type: console

## Supported ROM extensions

gcm, iso, gcz, ciso, wbfs, wad, rvz, elf, dol, m3u, json

## Emulators

- **dolphin** (dolphin) – Requires BR2_PACKAGE_DOLPHIN_EMU
- **dolphin** (libretro) – Requires BR2_PACKAGE_LIBRETRO_DOLPHIN

## Notes

To use a virtual horizontal wiimote, include ".side." in the filename (for example ".side.iso").
You can choose the axis controls among i(nfrared), s(wing), t(ilt) or n(unchuk) :
    for example, to play mariokart wii, rename it mario_kart.side.ti.iso (to get the tilt on the first axis and infrared on the 2nd one (ti))
    for example, to play mario galaxy, rename it mario_galaxy.ni.iso (got get the nunchuk on the first axis and infrared on the 2nd one (ni))
To use custom textures, put them in /userdata/saves/dolphin-emu/Load/Textures/<game id>.

For more info: https://wiki.batocera.org/systems:wii

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
