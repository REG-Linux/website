# MSU-MD

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/msu-md.webp" alt="MSU-MD icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/msu-md.png" alt="MSU-MD logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

MSU-MD enables “MSU-like” Mega CD streaming support on cartridge-based Mega Drive/Genesis hardware. It uses the GenesisPlusGX core to combine CD-quality audio/video streams with ROM-loaded gameplay for modern homebrew ports.

## Quick reference

- **ROM folder:** `/userdata/roms/msu-md`
- **Accepted ROM formats:** `.md`, `.zip`, `.7z`, `.squashfs`
- **Emulator/core:** `libretro: GenesisPlusGX`
- **System group:** `genesis`, `megadrive`

## ROMs

Keep each MSU-MD-compatible ZIP (matching the board ROM and CRC) in `/userdata/roms/msu-md`. Do not unpack the archive; GenesisPlusGX expects one compressed file per game. Some ports use `.squashfs` for streaming assets—those are also accepted.

## Emulators

### RetroArch (`libretro: GenesisPlusGX`)

GenesisPlusGX handles the Mega Drive, Master System, Game Gear and Mega CD libraries. Use RetroArch’s Quick Menu (`[HOTKEY]` + south face button) to access per-core options, lock-on controls, and hardware settings.

#### Relevant configuration options

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| REDUCE SPRITE FLICKERING | `global.gpgx_no_sprite_limit` | Disable the 80-sprite limit. |
| NTSC FILTER (MD) | `megadrive.gpgx_blargg_filter_md` | Choose Blargg filters (Off, Composite, SVGA, RGB). |
| FM CHIP | `mastersystem.ym2413` | Toggle YM2413 / FM-chip audio. |
| Controller types | `megadrive.controller1_md`, `megadrive.controller2_md`, `mastersystem.controller1_ms`, `mastersystem.controller2_ms` | Select pads, light guns or paddles per port. |
| LCD GHOSTING | `gamegear.lcd_filter` | Simulate Game Gear ghosting. |
| Extended screen | `gamegear.gg_extra` | Expand view area for Game Gear titles. |

## Controls

MSU-MD uses the standard Mega Drive controller mapping on the REG-Linux Retropad. Use RetroArch or EmulationStation’s input remapping for light guns, paddle controllers, or extra keys when needed.

![megadrive controller overlay](../images/controller-overlays/megadrive-1.png)

## Troubleshooting

- Verify each `.zip` contains the correct ROM set for the port
