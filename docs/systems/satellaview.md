# Satellaview

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/satellaview.webp" alt="Satellaview icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/satellaview.png" alt="Satellaview logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Satellaview sat in the SNES cartridge slot and streamed episodic games and broadcast content via BS-X. REG-Linux treats those titles as a distinct platform so the `satellaview` theme set can display the right artwork while still using SNES-style emulators.

## Technical specifications

- CPU: Ricoh 5A22 (WDC 65C816 derivative) running at 3.58 MHz, identical to the Super Famicom processor.
- Memory: SNES main RAM plus 512 KB of BS-X RAM and 8 MB of Flash storage for downloaded broadcasts.
- Display: SNES PPU with Mode 7/scroll layers, rendering 256×224 resolution with up to 32,768 colors.
- Sound: Sony SPC700 audio engine with 64 KB of dedicated PCM RAM for stereo playback.

### Quick reference

- **ROM folder:** `/userdata/roms/satellaview`
- **Accepted formats:** `.bs`, `.smc`, `.sfc`, `.squashfs`, `.zip`, `.7z`
- **Emulators:** `libretro: pocketsnes`, `libretro: snes9x`, `libretro: snes9x_next`, `libretro: bsnes`, `libretro: bsnes_hd`
- **System group:** `satellaview`

## BIOS

Satellaview games need the BS-X BIOS inside `/userdata/bios/`. Name the file `BS-X.bin` so the cores can locate it automatically.

| MD5 checksum                       | Filename    | Description        |
|------------------------------------|-------------|--------------------|
| `96cf17bf589fcbfa6f8de2dc84f19fa2` | `BS-X.bin`  | BS-X/Satellaview BIOS |

## ROMs

Drop `.bs` archives (or zipped packages containing them) into `/userdata/roms/satellaview`. You can keep them alongside your SNES ROMs, but keeping this folder separate makes it easier to browse just the broadcast content. CHD or SquashFS containers that wrap `.bs` files are also acceptable.

## Emulators

RetroArch loads the SNES cores listed above and uses the BS-X BIOS when the file is present. Use the Quick Menu (`[HOTKEY]` + south face button) to adjust shaders, audio, and controller overrides after selecting a Satellaview title.

## Controls

Gameplay mirrors standard SNES input, so use the SNES overlay or map the pad however you prefer. Save custom remaps through `/remapping_controls_per_emulator` whenever a title expects unusual button combos.

## Troubleshooting

- Make sure `/userdata/bios/BS-X.bin` exists with the correct checksum before expecting a broadcast to boot.
- If a `.bs` file refuses to load, double-check the archive contains a valid SNES ROM and the core supports Satellaview expansions.
- For other issues consult the generic support pages.
