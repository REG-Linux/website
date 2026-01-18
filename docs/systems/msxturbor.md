# MSX Turbo-R

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/msxturbor.webp" alt="MSX Turbo-R icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/msxturbor.png" alt="MSX Turbo-R logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The MSX Turbo-R closed the MSX era in 1990 with a high-speed R800 processor plus Z80 compatibility. REG-Linux assigns it to the `msxturbor` platform group so metadata, art, and configs stay aligned.

### Quick reference

* **ROM folder:** `/userdata/roms/msxturbor`
* **Accepted ROM formats:** `.dsk`, `.mx2`, `.rom`, `.zip`, `.7z`
* **Emulators:** RetroArch (`libretro: bluemsx`), [openMSX](#openmsx)
* **System group:** `msx`

| Emulator/Core | Notes |
| --- | --- |
| `libretro: bluemsx` | Turbo-R accuracy in RetroArch with sprite limit and rewinding options |
| `openmsx` | openMSX exposes the same option set and BIOS requirements |

## Technical specifications

- CPU: R800 (a 16-bit upgraded Z80) at 7.16 MHz plus a secondary Zilog Z80 for backward compatibility.
- Memory: 64 KB main RAM with bank-switching, 32 KB dedicated for video/ROM, and optional cartridge RAM.
- Display: Yamaha V9958 VDP with 192 colors on-screen, hardware sprite scaling and interlaced 512 resolutions.
- Sound: AY-3-8910 PSG plus PCM channels exposed via the V9958 DACs.

## Supported ROM extensions

`dsk`, `mx2`, `rom`, `zip`, `7z`, `openmsx`, `m3u`

## ROMs

Keep Turbo-R cartridge dumps in `/userdata/roms/msxturbor`. Wrap multi-disk packages with `.m3u` playlists so EmulationStation presents a single listing.

## BIOS

Turbo-R depends on the same BlueMSX/FMSX ROM set outlined in `msx2.md`. In addition to `MSX2.ROM` and `MSX2EXT.ROM`, include `MSX2P.ROM` plus the rest of the FMSX ROMs in `/userdata/bios`.

## Emulators

### RetroArch

RetroArch ships `libretro: bluemsx` for Turbo-R. Standard options refer to the `msxturbor.*` prefix (`msxturbor.rewind`,
`msxturbor.autosave`, `msxturbor.padtokeyboard`, `msxturbor.cheevos`) while the sprite limit toggle remains
`global.bluemsx_nospritelimits`.

### openMSX

openMSX exposes the `msxturbor.*` option set, reusing the same BIOS files as the earlier MSX cores.

## Controls

Turbo-R uses the same REG-Linux RetroPad overlay as the MSX1/2 family.

## Troubleshooting

If issues persist, consult the generic support pages.
