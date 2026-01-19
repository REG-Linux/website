---
title: Nintendo DS
description: Nintendo DS documentation for REG Linux.
---

# Nintendo DS

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/nds.webp" alt="Nintendo DS icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/nds.png" alt="Nintendo DS logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Released in 2004, the Nintendo DS injected dual displays, touchscreen control, and backwards compatibility into handheld gaming.

### Quick reference

* **ROM folder:** `/userdata/roms/nds`
* **Accepted formats:** `.nds`, `.bin`, `.zip`, `.7z`
* **Cores:** `libretro: melonDS`, `libretro: DeSmuME`, standalone `melonDS`, `Drastic`
* **System group:** `nds`

## Technical specifications

- CPU: 67 MHz ARM946E-S with secondary 33 MHz ARM7TDMI for legacy Game Boy Advance compatibility.
- Memory: 4 MB onboard RAM and 656 KB WRAM working with the video engines.
- Display: Dual 3-inch TFT LCDs at 256×192 (upper screen touchscreen, lower for stylus) supporting 262k colors.
- Sound: Stereo DAC with 16-bit PCM samples, MIDI playback, and DS-specific hardware mixing.

## BIOS & firmware

Place the Nintendo DS firmware trio (`firmware.bin`, `bios7.bin`, `bios9.bin`) in `/userdata/bios/`, matching the MD5s shipped with REG-Linux. DSi titles additionally need `dsi_bios7.bin`, `dsi_bios9.bin`, `dsi_firmware.bin` and `dsi_nand.bin`.

## ROMs

Copy `.nds` files directly into `/userdata/roms/nds`. Zip archives are supported, but unpack them if the emulator fails to detect the game. Titles that depend on DSi enhancements require the DSi BIOS set noted earlier.

## Emulator options

### RetroArch

Both [melonDS](https://melonds.kuribo64.net/) and [DeSmuME](https://desmume.org/) rely on RetroArch’s Quick Menu (`[HOTKEY]` + south face button) to tweak internal resolution, texture filtering, screen layout and frameskip. Additional per-core options include `global.melonds_screen_layout`, `global.internal_resolution_desmume`, and `global.texture_scaling`.

### Standalone & Drastic

- **Standalone melonDS:** Adjust save slots, touchscreen calibration and per-game tweaks via the built-in UI.
- **Drastic:** Present on compatible SBC images; enable `nds.drastic_hires` for sharper graphics and `nds.drastic_threaded` to smooth out performance.

## Troubleshooting

- If you receive “BIOS missing”, make sure every firmware file resides under `/userdata/bios/`.
- Use the DSi BIOS bundle for modern ROMs that require additional features.
- See the generic support pages for general issues.
