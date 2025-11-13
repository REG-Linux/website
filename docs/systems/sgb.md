# Super Game Boy

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/sgb.webp" alt="Super Game Boy icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/sgb.png" alt="Super Game Boy logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1994 by Nintendo, the Super Game Boy was a console system. It is grouped with snes titles in EmulationStation.

## Technical specifications

- CPU: Sharp LR35902 (Game Boy) core clocked at 4.19 MHz inside the Super Game Boy cartridge.
- Memory: 8 KB work RAM plus 8 KB video RAM inherited from the Game Boy hardware.
- Display: Original 160×144 Game Boy screen rendered through the SNES PPU with decorative borders.
- Sound: Game Boy APU with two pulse, one wave, and one noise channel routed through the SNES audio pipeline for stereo output.

## Supported ROM extensions

gb, gbc, zip, 7z

## Emulators

- **mesen-s** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MESENS
- **mgba** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MGBA

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
