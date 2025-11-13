# Camputers Lynx

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/camplynx.webp" alt="Camputers Lynx icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/camplynx.png" alt="Camputers Lynx logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 1983 by Camputers, the Camputers Lynx was a computer system.

## Technical specifications

- CPU: Zilog Z80A clocked at 4 MHz with banked memory support for BASIC/CP/M states.
- Memory: 64 KB RAM standard with 16 KB ROM plus up to 128 KB of video memory in extended models.
- Display: 256×192 resolution with eight colors per line, handled by a dedicated video controller inspired by Sinclair/Amstrad.
- Sound: AY-3-8912 PSG providing three square-wave audio channels plus noise.

## Supported ROM extensions

wav, tap, ldf, zip, 7z

## Emulators

- **mame** (libretro) – Requires BR2_PACKAGE_LIBRETRO_MAME, BR2_PACKAGE_HAS_LIBRETRO_MAME
- **mame** (mame) – Requires BR2_PACKAGE_MAME, BR2_PACKAGE_HAS_MAME

## Notes

Requires MAME BIOS files lynx128k.zip, lynx96k.zip, lynx48k.zip
Using software list mode is recommended.

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
