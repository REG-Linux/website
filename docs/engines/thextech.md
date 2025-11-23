# TheXTech

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/thextech.webp" alt="TheXTech icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/thextech.png" alt="TheXTech logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

TheXTech is an open-source recreation of Super Mario Bros. X (SMBX), bringing the classic fan-made Mario platformer to new platforms. It loads `smbx` worlds, handles tile-based physics, bosses, and NPC scripts, and adds optional modern features such as widescreen resolutions, touch support, and an integrated level editor. Learn more at the [TheXTech website](https://thextech.com).

## Supported formats

- `smbx` – archive format containing SMBX game worlds, levels, music, and Lua scripts.
- `zip` – zipped SMBX content that the engine can unpack when launched.

## Example worlds

* `Mario Adventure`: the flagship SMBX campaign with custom graphics.
* `New Super Mario Bros. U Remix`: fan upgrade that mixes SMBX levels with NSMBU-style art.
* `Super Mario 64 Remake`: tribute world built inside the SMBX engine.
* `Metroid & Mario Crossover`: experimental mash-up using TheXTech scripting.

## Engines

- **thextech** – Requires `BR2_PACKAGE_THEXTECH`. The binary expects a `System` folder with `Smbx2.exe` equivalents and reads Lua-based level scripts plus `Game.ini`.

## Notes

- Keep the `System/Scripts/` and `Worlds/` folders as shipped; renaming may break Lua references used by custom bosses or NPCs.
- TheXTech includes online mode support and its own launcher; reuse the same file structure when dropping worlds into REG Linux.

---
