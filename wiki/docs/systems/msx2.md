---
title: MSX2
description: MSX2 documentation for REG Linux.
---

# MSX2

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/msx2.webp" alt="MSX2 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/msx2.png" alt="MSX2 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Microsoft updated the original MSX1 in 1985 with the MSX2 standard, bringing better video and mapper support. REG-Linux keeps it under the `msx2` tag so metadata stays in sync.

### Quick reference

* **ROM folder:** `/userdata/roms/msx2`
* **Accepted ROM formats:** `.dsk`, `.mx2`, `.rom`, `.zip`, `.7z`, `.cas`, `.m3u`
* **Emulators:** RetroArch (`libretro: bluemsx`, `libretro: fmsx`), [openMSX](#openmsx), [CLK](#clk)
* **System group:** `msx`

| Emulator/Core | Notes |
| --- | --- |
| `libretro: bluemsx` | High-accuracy MSX2 emulation with sprite limit toggles |
| `libretro: fmsx` | Speed-friendly core with netplay |
| `openmsx` | Official openMSX implementation supporting MSX2 |
| `CLK` | Clock Signal still leverages MSX2 BIOS dumps as of REG-Linux 42 |

## Technical specifications

- CPU: Zilog Z80-compatible (typically 3.58 MHz) with the same 8-bit bus as MSX1.
- Memory: 64–512 KB of main RAM with mapper expansions up to 4 MB.
- Display: Yamaha V9938 VDP supporting 256×212/512×212 resolutions, 256 colors per palette and smooth hardware scrolling.
- Sound: AY-3-8910 PSG reused from MSX1 families.

## Supported ROM extensions

`dsk`, `mx2`, `rom`, `zip`, `7z`, `cas`, `m3u`, `ogv`, `openmsx`

## ROMs

Place MSX2 titles inside `/userdata/roms/msx2`. Wrap multi-disk games in `.m3u` playlists for a cleaner EmulationStation entry (see `/cd_image_formats#multi-disc_games`).

## BIOS

MSX2 uses the same BlueMSX/FMSX ROM bundle detailed in `msx1.md`. Copy BlueMSX’s `Databases`/`Machines` into `/userdata/bios` and drop the FMSX files from that page as well.

CLK also checks for these MSX2-exclusive binaries:

| MD5 checksum                       | Share file path      | Description |
|------------------------------------|----------------------|-------------|
| `ec3a01c91f24fbddcbcab0ad301bc9ef` | `bios/MSX2.ROM`      | MSX2 BIOS (BlueMSX/openMSX) |
| `2183c2aff17cf4297bdb496de78c2e8a` | `bios/MSX2EXT.ROM`   | MSX2 extension BIOS |

## Emulators

### RetroArch

RetroArch runs `libretro: bluemsx` and `libretro: fmsx` for MSX2; the shared `msx2.*` options match those described in `msx1.md`.

#### libretro: bluemsx

Use `global.bluemsx_nospritelimits` to remove the per-line sprite limit and the same rewinding/autosave/achievements
options (`msx2.rewind`, `msx2.autosave`, `msx2.padtokeyboard`, `msx2.cheevos`).

#### libretro: fmsx

fMSX mirrors the option set and adds `msx2.netplay`.

### openMSX

openMSX shares the `msx2.*` configuration tree and uses the MSX2 BIOS files recorded above.

### CLK

CLK (Clock Signal) included MSX2 support in REG-Linux 42. It uses the BIOS table above and exposes the usual `msx*` option set.

## Controls

Use the REG-Linux RetroPad overlay for MSX2 games; the Turbo-R/MX1 overlays apply equally.

## Troubleshooting

See the generic support pages if you need extra help.
