# Xash3D-FWGS

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/xash3d_fwgs.webp" alt="Xash3D-FWGS icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/xash3d_fwgs.png" alt="Xash3D-FWGS logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Xash3D-FWGS is a fork of the Half-Life/Source engine that runs Half-Life, Blue Shift, Opposing Force, and other compatible mods. REG-Linux groups it under `ports` and relies on your licensed data folders.

### Quick reference

- **ROM folder:** `/userdata/roms/xash3d_fwgs`
- **Accepted format:** `.game`
- **Emulator:** `xash3d_fwgs`
- **System group:** `ports`

## Game data setup

1. Copy a game directory from your Steam install (e.g., `Half-Life/`, `bshift/`, `cstrike/`) into `/userdata/roms/xash3d_fwgs/<game folder>/`.
2. Create a matching `.game` placeholder in the same destination (e.g., `/userdata/roms/xash3d_fwgs/Half-Life.game`).
3. Download `extras.pak` (https://github.com/FWGS/xash-extras/releases/latest/download/extras.pak) and drop it into `/userdata/roms/xash3d_fwgs/extras.pak`.
4. Repeat for every mod or Source game you want to install.

The resulting layout looks like:

```
roms/xash3d_fwgs/
├─ Half-Life/
├─ Half-Life.game/
├─ bshift/
├─ bshift.game/
├─ extras.pak
└─ gamelist.xml (optional)
```

## Emulators

### Xash3D-FWGS

The binary automatically runs the selected `.game` entry and uses the data folder next to it. Use the Quick Menu to adjust performance or to remap controller bindings.

## Controls & Troubleshooting

The default overlay covers the FPS-style controls. If Xash3D refuses to start, confirm every `.game` folder pairs with a proper data directory and that `extras.pak` is present. For general issues, consult the generic support pages.
