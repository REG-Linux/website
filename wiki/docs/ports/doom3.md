---
title: Doom 3
description: Doom 3 documentation for REG Linux.
---

# Doom 3

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/doom3.png" alt="Doom 3 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Doom 3 (2004) is launched as a `ports` entry and relies on the `dhewm3` open-source engine so REG-Linux can run the modernized build with the same input/shader pipeline as the rest of the menu.

### Quick reference

- **ROM folder:** `/userdata/roms/doom3`
- **Accepted formats:** `.d3`, `.pk4`
- **Emulators:** `dhewm3`
- **System group:** `ports`

## BIOS

DHEWM3 does not require additional BIOS files.

## ROMs

Copy the Doom 3 data archives from your retail CD, Steam, or GOG install into `/userdata/roms/doom3/`. The standard layout looks like:

```
/userdata/roms/doom3/
├── base/
│   ├── pak000.pk4
│   ├── pak001.pk4
│   └── ...
└── d3xp/
    ├── pak000.pk4
    └── pak001.pk4
```

`base` holds the original release, while `d3xp` contains the Resurrection of Evil expansion. For each playable collection create a `.d3` descriptor inside `/userdata/roms/doom3/` that points to the appropriate `pak` folder (for example, `base/pak000.pk4` for Doom 3, or `d3xp/pak000.pk4` for the expansion). These `.d3` files tell REG-Linux how to launch the matching data set from the ports menu.

## Emulators

### DHEWM3

DHEWM3 is the Doom 3 engine fork maintained for modern platforms. It mirrors the front-end’s Quick Menu conventions and exposes overrides such as `dhewm3.videomode` for display scaling and `dhewm3.bezel` for framebuffer tuning.

## Controls

Doom 3 prefers a mouse + keyboard setup, but you can map movement and firing actions to a controller by editing REG-Linux’s controller profile or by running `dhewm3` with its native `autoexec.cfg`.

## Troubleshooting

- Ensure your `.d3` file references the correct folder (for example, `base/pak000.pk4`) and that the `pak` files all exist inside `base/` or `d3xp/`.
- If the expansion data is missing, remove the `d3xp` line from the `.d3` descriptor so the engine does not try to load nonexistent assets.
- Use DHEWM3’s logging (`-logfile`) to capture startup errors if the game exits before showing the menu.
