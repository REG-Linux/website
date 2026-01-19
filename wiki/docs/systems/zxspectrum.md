---
title: ZX Spectrum
description: ZX Spectrum documentation for REG Linux.
---

# ZX Spectrum

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/zxspectrum.webp" alt="ZX Spectrum icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/zxspectrum.png" alt="ZX Spectrum logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Sinclair ZX Spectrum debuted in 1982 with an affordable, keyboard-first design and distinctive attribute-based colors. REG-Linux lists ZX Spectrum entries under `zxspectrum`, with hand-picked ROMs powering the `libretro: fuse` core and an optional low-latency `Clock Signal` plugin.

## Technical specifications

- CPU: Zilog Z80A clocked at 3.5 MHz.
- Memory: 16 KB RAM in the 16K model, 48 KB or 128 KB RAM in later variants, with banked ROM/RAM in the 128K models.
- Display: 256×192 pixel color display with an attribute grid limiting colors to 8 per 8×8 block from a 15-color palette.
- Sound: Single-channel beeper (later models add AY-3-8912 PSG) for simple square waves and noise.

### Quick reference

- **ROM folder:** `/userdata/roms/zxspectrum`
- **Accepted formats:** `.tzx`, `.tap`, `.z80`, `.rzx`, `.scl`, `.trd`, `.dsk`, `.zip`, `.7z`
- **Emulators:** `libretro: fuse`, `Clock Signal`
- **System group:** `zxspectrum`

## BIOS

Clock Signal requires a set of Spectrum ROMs stored under `/userdata/bios/ZXSpectrum/`. Copy the following files so both +2/+3 and 48K/128K modes can boot:

| Filename       | Model |
|----------------|-------|
| `plus3.rom`    | +3 ROM |
| `plus2.rom`    | +2 ROM |
| `128.rom`      | 128K ROM |
| `48.rom`       | 48K ROM |

RetroArch’s Fuse core does not need external BIOS files.

## ROMs

Place Spectrum tapes, snapshots, or zipped collections inside `/userdata/roms/zxspectrum`. Fuse scans for the root `.tzx/.tap/.z80` file, so keep single-game archives uncompressed or ensure the image sits at the archive root.

## Emulators

### libretro: fuse

Fuse exposes the standard `zxspectrum.` RetroArch options (`videomode`, `shaders`, `pixel_perfect`, etc.). Use the Quick Menu (`[HOTKEY]` + south button) to toggle joysticks, swap palettes, or force 48K/128K behavior through the shader/input overrides.

### Clock Signal

Clock Signal provides a very low-latency alternative. It uses every ROM listed above and the same ROM folder structure; enable it when you want precise input timing. The Quick Menu still controls the input assignment.

## Controls & options

- Use `[HOTKEY]` + south button to remap the cursor keys to joysticks or to open the on-screen keyboard for text-heavy adventures.
- When playing keyboard-driven titles, assign `User 3` to `Sinclair Keyboard` and leave users 1–2 on joysticks to keep both keyboard and controller inputs responsive.
- Fuse offers several joystick presets (Cursor, Kempston, Sinclair 1/2, Timex, Fuller). Pick the one that matches the game you’re launching.

## Troubleshooting

- If input conflicts occur, set `User 1` to the desired joystick type and switch other users to `None`.
- Some games require the full 128K ROM set; keep all four BIOS files even if you mostly play 48K releases.
- Consult the generic support pages whenever RetroArch refuses to detect the ROM folder or if Clock Signal crashes on startup.
