---
title: REminiscence
description: REminiscence documentation for REG Linux.
---

# REminiscence

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/reminiscence.webp" alt="REminiscence icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/reminiscence.png" alt="REminiscence logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

REminiscence is the libretro wrapper around Gregory Montoir’s Flashback engine. It uses the original Flashback PC data with improved compatibility and modern controller handling. REG-Linux associates it with the `reminiscence` metadata group inside the `ports` collection.

### Quick reference

- **ROM folder:** `/userdata/roms/reminiscence`
- **Accepted format:** `.rem`
- **Emulator/Core:** `libretro: reminiscence`
- **System group:** `ports`

## BIOS

No BIOS is needed.

## ROMs

Copy the `DATA/` directory from your Flashback installation into `/userdata/roms/reminiscence/DATA/` and ensure the essential files (`FLORI.INS`, `GLOBES.POL`, `STRING2.INS`, etc.) exist. Next, create a blank placeholder file such as:

```
touch "/userdata/roms/reminiscence/Flashback.rem"
```

The `.rem` file acts as the launcher while the real assets stay in the `DATA/` folder. Keep the directory relative to the launcher so the core can load the files without needing absolute paths.

## Emulators

### RetroArch / libretro: REminiscence

The core exposes the usual RetroArch options (`reminiscence.videomode`, `reminiscence.ratio`, `reminiscence.shaders`, etc.). Simply open the Quick Menu (`[HOTKEY]` + south button) to swap aspect ratios, toggle shaders, or remap the controller.

## Controls

REminiscence supports both keyboard/mouse and gamepads. Use the in-game controls screen to bind actions to additional buttons if the default layout is not enough.

## Troubleshooting

- If the game refuses to start, double-check that the `DATA/` folder contains all the Flashback files and that the `.rem` launcher sits alongside it.
- The core is case-sensitive; verify that your file names match the ones referenced in the `DATA/` directory.
- Consult the [REminiscence GitHub](https://github.com/libretro/reminiscence) for core-specific notes if you run into compatibility issues.
