# SAM Coupé

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/samcoupe.webp" alt="SAM Coupé icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/samcoupe.png" alt="SAM Coupé logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The British SAM Coupé (1989) mixes a Z80-compatible CPU with a palette richer than the ZX Spectrum, aiming squarely at home and hobbyist programmers. REG-Linux includes it under the `samcoupe` metadata tag so the themed art appears alongside the rest of the retro computers.

## Technical specifications

- CPU: Zilog Z80B running at 6 MHz with support for banked ROMs and hardware sprites.
- Memory: 256 KB of RAM on board (expandable to 512 KB and beyond) plus 48 KB ROM for the OS.
- Display: Custom Video Display Generator offering 256×192 resolution, 256 colors from a 4096 palette, and sprite-based zoom/scroll support.
- Sound: General Instrument AY-3-8912 PSG with three tone channels and noise, routed through stereo outputs.

### Quick reference

- **ROM folder:** `/userdata/roms/samcoupe`
- **Accepted formats:** `.cpm`, `.dsk`, `.sad`, `.mgt`, `.sdf`, `.td0`, `.sbt`, `.zip`
- **Emulator:** `samcoupe`
- **System group:** `samcoupe`

## ROMs

Drop disk, tape or cartridge dumps into `/userdata/roms/samcoupe`. The emulator recognizes CPM/TIP images without renaming, so leave the files as you obtained them.

## Emulator

### samcoupe

The integrated core reproduces the original keyboard, joystick and expansion chips. It runs inside EmulationStation with sensible defaults; use `/remapping_controls_per_emulator` to tweak the keyboard or joystick mapping when necessary.

## Controls

Refer to the controller overlay for the keyboard-inspired layout and single-button joystick reference if you need to map keys manually.

## Troubleshooting

- Ensure your archive contains the expected disk types (e.g., `.sad`, `.td0`).
- Consult the [generic support pages](/support) if a title refuses to load.
