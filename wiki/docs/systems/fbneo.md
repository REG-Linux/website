# FinalBurn Neo

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/fbneo.webp" alt="Final Burn Neo icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/fbneo.png" alt="Final Burn Neo logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

FinalBurn Neo (FBNeo) is a multi-arcade emulator forked from FinalBurn Alpha designed for accuracy and performance. REG-Linux treats FBNeo as part of the `arcade` group and exposes the `fbneo` theme assets when available.

## Quick reference

- **Folders:** `/userdata/roms/fbneo`, `/userdata/roms/neogeo`
- **Accepted formats:** `.zip`, `.7z`
- **Emulators:** libretro: FBNeo, libretro: FBAlpha, fba2x

## BIOS

FBNeo requires several BIOS archives depending on the ROMset version. Ensure the following files exist in `/userdata/roms/fbneo/` and match the release you are running (see `/arcade` guide for the exact set per REG-Linux release):

- `neogeo.zip`, `pgm.zip`, `skns.zip` (FBNeo v1.0.0.0)
- Additional archives for v1.0.0.2+: `bubsys.zip`, `cchip.zip`, `decocass.zip`, `isgsm.zip`, `midssio.zip`, `namcoc69.zip`, `namcoc70.zip`, `namcoc75.zip`, `neogeo.zip`, `nmk004.zip`, `pgm.zip`, `skns.zip`, `ym2608.zip`.

Do not extract the ZIPs. Maintaining the correct BIOS ensures FBNeo can boot each driver.

## ROMs

FBNeo uses CLRMAME-compatible ROMsets; the specific version needed is listed in the arcade guide. Keep ROM archives zipped (`.zip`, `.7z`)—do not extract their contents. Place Neo Geo titles in `/userdata/roms/neogeo` or the same `fbneo` folder if you want a unified list.

## Emulators

### RetroArch / libretro: FBNeo

The preferred core for FBNeo is `libretro: FBNeo`. Open the Quick Menu (`[HOTKEY]` + south button) to adjust options, DIP switches and inputs.

| ES setting name REG-Linux.conf_key | Description => ES option key_value |
| --- | --- |
| CPU CLOCK `global.fbneo-cpu-speed-adjust` | Overclock/underclock the emulated CPU. | 30%–200% choices |
| FRAMESKIP `global.fbneo-frameskip` | Skip frames to improve performance. | 0–4 |
| CROSSHAIR `global.fbneo-lightgun-hide-crosshair` | Show/hide gun crosshairs. | Off `enabled`, On `disabled` |
| NEOGEO MODE `neogeo.fbneo-neogeo-mode-switch` | Select AES/MVS/Universe BIOS. |
| MEMORY CARD MODE `neogeo.fbneo-memcard-mode` | Choose shared or per-game save files. |

Per-game DIP switches are in the Quick Menu → Options → Dip Switch Settings.

### Libretro: FBAlpha

The older `libretro: FBAlpha` (also referred to as `fbalpha2012`) still ships with REG-Linux; it targets very low-power devices.

### fba2x

`fba2x` is a standalone FBAlpha-based emulator aimed at weaker hardware; use it only if the libretro cores do not perform well.

## How FBNeo differs from MAME

- FBNeo focuses on speed, with a slightly smaller but still extensive library.
- MAME emphasizes accuracy and covers more hardware.
- FBNeo supports RetroAchievements; MAME does not.
- If a game misbehaves on one emulator, test it on the other (MAME vs FBNeo) as they use different ROMsets and timings.

## Controls

The default FBNeo controller mapping uses the REG-Linux Retropad overlay: any standard arcade buttons can be mapped via the emulator menus or RetroArch Quick Menu.

## Troubleshooting

- Verify your ROMset version matches the one listed in the arcade guide and the CRCs in `FinalBurn Neo (ClrMame Pro XML, Arcade only).dat`.
- Ensure all required BIOS ZIPs are present (`neogeo.zip`, `pgm.zip`, etc.).
- If a game is missing or fails to start, retry with the equivalent MAME set to see whether the issue is emulator-specific.
- Consult the [FBNeo FAQ](https://github.com/libretro/FBNeo/blob/master/src/burner/libretro/README.md#frequently-asked-questions) and the arcade guide for additional help.
