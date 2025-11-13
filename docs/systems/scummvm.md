# ScummVM

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/scummvm.webp" alt="ScummVM icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/scummvm.png" alt="ScummVM logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1987 by LucasArts, the ScummVM was a computer system. Its platform tag is `scummvm` for proper filtering.

## Technical specifications

- Manufacturer: LucasArts
- Release year: 1987
- Hardware type: computer
- Platform tag: scummvm

## Supported ROM extensions

scummvm, zar

## Emulators

- **scummvm** (libretro) – Requires BR2_PACKAGE_LIBRETRO_SCUMM, BR2_PACKAGE_HAS_LIBRETRO_SCUMMVM
- **scummvm** (scummvm) – Requires BR2_PACKAGE_SCUMMVM, BR2_PACKAGE_HAS_SCUMMVM

## Notes

Put scummvm games in this folder.

For each game, you must create a file named from the short name of the game and with the extension ".scummvm"

Short game names can be found at http://scummvm.org/compatibility/
For example, for "Broken Sword" create the file "Broken Sword/sword1.scummvm"

If you wish to use Midi ROM's i.e. the MT-32 synth, put you files in /userdata/bios/scummvm/extra


---
Source data: REG Linux emulationstation/es-system/es_systems.yml
