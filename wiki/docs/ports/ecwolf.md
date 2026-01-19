---
title: ECWolf
description: ECWolf documentation for REG Linux.
---

# ECWolf

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/ecwolf.webp" alt="ECWolf icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/ecwolf.png" alt="ECWolf logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

ECWolf is a modernized Wolfenstein 3D engine that builds on Wolf4SDL and adds mod support, modern input controls, and configuration polish. REG-Linux keeps it under the `ports` heading with its own `ecwolf` metadata group.

### Quick reference

- **ROM folder:** `/userdata/roms/ecwolf`
- **Accepted formats:** `.ecwolf`, `.pk3`, `.squashfs`
- **Saves:** `/userdata/saves/ecwolf/[romname]/`
- **Emulator:** `ecwolf`
- **System group:** `ports`

## BIOS

ECWolf loads the original Wolfenstein-era data and does not need a BIOS file.

## Game files

Install Wolfenstein 3D, Spear of Destiny, or other supported collections into dedicated `.ecwolf` folders inside `/userdata/roms/ecwolf/`. Each folder holds the data archives for that release (e.g., `audiohed.wl6`, `config.sod`, `gamemaps.sod`, `vgagraph.n3d`, etc.), so the hierarchy might look like:

```
/userdata/roms/ecwolf/Wolfenstein 3D.ecwolf/
  audiohed.wl6
  audiot.wl6
  ...

/userdata/roms/ecwolf/Spear of Destiny.ecwolf/
  audiohed.sod
  audiot.sod
  dgamemaps.sd2
  ...

/userdata/roms/ecwolf/Super 3D Noah's Ark.ecwolf/
  audiohed.n3d
  ...
```

ECWolf also accepts `.pk3` mods placed alongside the base data. When mixing HD packs, high-detail textures, or campaign mods, wrap the command line in a `.ecwolf` script that contains the arguments you normally pass to the binary (for example, `--data wl6 --file ../HD/pack.pk3`). This makes it easy to combine multiple `.pk3` files while preserving the base dataset.

Really custom setups can mix `.pk3` archives directly next to the `.ecwolf` folder, but the wrapper files give you full control over command-line switches such as `-gamegrp`, `-data`, and `-file`.

## Emulators

### ECWolf

REG-Linux bundles the ECWolf binary with the standard `ecwolf.*` ES options (`videomode`, `padtokeyboard`, `decoration`, etc.). Most tuning is done inside ECWolf’s native menu or by editing its `config.wl6`/`config.sod` files.

## Controls

Mouse and keyboard remain the primary controls, but you can bind retropad buttons with the Quick Menu and global controller configuration. The default overlay shows the classic keyboard layout; adjust as needed from within ECWolf’s Options screen.

## Troubleshooting

- If a folder fails to launch, verify that the expected `.wl6`, `.sod`, `.n3d`, or `.pk3` files are present and that their extensions match the title you are starting.
- When combining mods, keep track of file order in the `.ecwolf` wrapper; typos or missing paths cause ECWolf to ignore the custom pack.
- For deep dives on modding or data structures, refer to the ECWolf wiki and the modding guides linked in the original documentation.
