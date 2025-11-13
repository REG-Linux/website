# Tutor

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/tutor.webp" alt="Tutor icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/tutor.png" alt="Tutor logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1983 by Tomy, the Tutor was a computer system.

## Technical specifications

- CPU: Motorola 6809E processor clocked at 1.79 MHz with additional gate-array support for floppy and video timing.
- Memory: 64 KB RAM standard with room for up to 512 KB via expansion cards and ROM overlays.
- Display: Thomson VDG supporting 320×200 graphics in 16 colors plus dedicated character/text modes.
- Sound: SN76489A-compatible PSG offering three tone channels and noise.

## Supported ROM extensions

bin, wav, zip, 7z

## Emulators

- **mame** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME, BR2_PACKAGE_HAS_LIBRETRO_MAME
- **mame** (mame) – Requires BR2_PACKAGE_MAME, BR2_PACKAGE_HAS_MAME

## Notes

Requires MAME BIOS file tutor.zip
To get through the loading menu, R1 will move down and A/East will select.

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
