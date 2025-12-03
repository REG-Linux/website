# Sonic 3 A.I.R.

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/sonic3-air.webp" alt="Sonic 3 A.I.R. icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/sonic3-air.png" alt="Sonic 3 A.I.R. logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Sonic 3 A.I.R. (Angel Island Revisited) is the fan remaster of Sonic the Hedgehog 3 & Knuckles running on RSDKv5. REG-Linux treats it as a `ports` entry that loads the binary plus your original game ROM.

### Quick reference

- **ROM folder:** `/userdata/roms/sonic3-air`
- **Accepted format:** `.s3air`
- **Emulator:** `sonic3-air`
- **System group:** `ports`

## ROMs

Place `Sonic_Knuckles_wSonic3.bin` (the merged ROM from the original release) into `/userdata/roms/sonic3-air/` and create the marker file:

```
touch "/userdata/roms/sonic3-air/Sonic 3 - Angel Island Revisited.s3air"
```

The entry will scrape artwork and launch using that ROM entry. Keep the binary name exact so the port recognizes it.

## Shaders

Sonic 3 A.I.R. uses RSDKv5 shaders (e.g., the `GLShaders` mod) to render filters and cinematic movies correctly. Create the following mod structure inside `/userdata/roms/sonic3-air/mods/`:

```
mods/GLShaders/
  ├── mod.ini
  └── Data/
      └── Shaders/
```

Inside `mod.ini`, add:

```
Name=GLShaders
Description=GL3 shaders to enable filters and stuff
Author=Ducky
Version=1.0.0
TargetVersion=5
```

Copy the original `RSDKv5/Shaders` folder into `mods/GLShaders/Data/` so the filter assets stay with the mod.

## Emulators

### Sonic3-AIR

REG-Linux runs the Sonic3-AIR executable (`sonic3-air`). Use the Quick Menu for display, shader toggles, and controller remapping.

## Controls

The port is built for gamepads, but keyboard input is also supported. Open the in-game controls menu to bind Grab, Spin Dash, and special moves to your preferred buttons before launching.

## Troubleshooting

- Ensure `Sonic_Knuckles_wSonic3.bin` remains in the ROM folder and matches the expected filename.
- If movies or shaders fail to load, double-check the mod structure and the `mod.ini` entries.
