# Uzebox

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/uzebox.webp" alt="Uzebox icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/uzebox.png" alt="Uzebox logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2008 by Atmel, the Uzebox was a console system.

## Technical specifications

- CPU: Microchip PIC32MX360F512L (32-bit MIPS) running at 80 MHz.
- Memory: 512 KB flash for programs plus 32 KB data RAM and 16 KB of video RAM for tile maps.
- Display: Tile-based 320×240 (or stretched) display rendered by MCU-driven video engine with hardware sprites.
- Sound: Two-channel audio mixer using DAC output with PWM-driven sample playback.

## Supported ROM extensions

uze

## Emulators

- **uzem** (libretro) – Requires BR2_PACKAGE_LIBRETRO_UZEM

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
