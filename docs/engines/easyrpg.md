# EasyRPG

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/easyrpg.webp" alt="EasyRPG icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/easyrpg.png" alt="EasyRPG logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

EasyRPG is the open-source implementation of the RPG Maker 2000/2003 runtime. Instead of relying on the proprietary interpreter, the engine replays events, audio, tilesets, and battle scripts with modern rendering (OpenGL), controller mappings, and save/load hooks so REG Linux can run the classic JRPG toolset on contemporary hardware. Visit the [EasyRPG site](https://easyrpg.org) for downloads.

## Supported formats

- `easyrpg` (folder manifest) – folder-based projects that include `RPG_RT.exe` or its data equivalents.
- `zip` / `zar` – compressed files that are extracted or streamed at runtime.

## Example games

* `To the Moon`
* `Corpse Party` (original prototype)
* `LISA: The First`
* `Ib`
* `The Witch's House`

Thousands of other titles are listed on the [EasyRPG compatibility wiki](https://wiki.easyrpg.org/compatibility), so check the official catalog for the latest compatibility status.

## Engines

- **easyrpg** (native) – Requires `BR2_PACKAGE_EASYRPG_PLAYER`. Runs unpacked project directories.
- **easyrpg** (libretro) – Requires `BR2_PACKAGE_LIBRETRO_EASYRPG`. Use when REG Linux fronts RetrolArch.

## Notes

- Drop the full RPG Maker project inside the ROM tree and append `.easyrpg` to let the launcher detect it automatically.
- Keep `Game.ini`, `System.lmu`, and `RPG_RT.ldb` intact; EasyRPG reads them to configure resolution, audio, and event scripts.

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
