---
title: Vectrex
description: Vectrex documentation for REG Linux.
---

# Vectrex

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/vectrex.webp" alt="Vectrex icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/vectrex.png" alt="Vectrex logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Vectrex is the only vector-based home console, equipped with a dedicated monochrome CRT. REG-Linux highlights the system through the `vectrex` metadata group and supports it via `libretro: vecx` or MAME with vector-focused shader packs.

## Technical specifications

- CPU: Motorola 6809 running at 1.5 MHz.
- Memory: 1 KB RAM and 8 KB ROM (expanded via cartridges) plus vector buffer memory.
- Display: Custom vector CRT rendering 256×256 wireframe graphics with analog vector control.
- Sound: AY-3-8912 PSG supplying three tone channels and noise via built-in speaker.

### Quick reference

- **ROM folder:** `/userdata/roms/vectrex`
- **Accepted formats:** `.bin`, `.gam`, `.vec`, `.zip`, `.7z`
- **Emulators:** `libretro: vecx`, MAME
- **System group:** `vectrex`, `arcade`

## Technical specifications

- CPU: Motorola 6809 at 1.5 MHz.
- Memory: 1 KB RAM, 8 KB ROM (expandable via cartridges), plus vector buffer memory.
- Display: Custom vector CRT rendering 256×256 wireframe graphics with analog vector control.
- Sound: AY-3-8912 PSG delivering three tone channels plus noise through the built-in speaker.

## ROMs & BIOS

`libretro: vecx` does not require a BIOS, but MAME needs the official `vectrex.zip` archive (`exec_rom.bin`, MD5 `ab082fa8c8e632dd68589a8c7741388f` or international `exec_rom_intl_284001-1.bin`, MD5 `6a9c238473229912eb757ff3dfe6f4631`). Place the archive under `/userdata/bios/` or next to the ROM. Drop each `.bin`/`.gam` file or zipped ROM into `/userdata/roms/vectrex`.

## Emulators

### libretro: vecx

Use `libretro: vecx` inside RetroArch for accurate hardware reproduction. The core exposes `global.res_multi` to upscale vectors, and the standard `vectrex.*` backend, shader, and threaded video options. Open the Quick Menu (`[HOTKEY]` + south face button) to adjust these.

### MAME

Standalone MAME uses the `vectrex` driver with BGFX settings (`vectrex.video`, `vectrex.bgfxbackend`, `vectrex.bgfxshaders`, `vectrex.switchres`) plus `vectrex.use_guns` when needed.

## Controls & troubleshooting

The overlay at `../images/controller-overlays/vectrex.png` documents the 4-way stick plus buttons. Increase `global.res_multi` (e.g., 4x) and apply vector shaders (Flatten-Glow) when the picture looks jagged. Consult the generic support pages if the ROM fails to boot or the core lacks the BIOS.

---
