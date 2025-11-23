# OpenBOR

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/openbor.webp" alt="OpenBOR icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/openbor.png" alt="OpenBOR logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

[OpenBOR](https://www.chronocrash.com/openbor/) (Open Beats of Rage) is a community-driven 2D beat’em-up engine inspired by Sega’s “Streets of Rage” series. It loads `.pak` archives containing sprites, stages, music, and Lua scripting logic, and ships with configurable combos, AI, and multiplayer support. REG Linux uses OpenBOR to run fan-made campaigns, crossovers, and remixed beat’em-up adventures.

## Supported formats

- `pak` – archives zipped using OpenBOR’s toolchain; each file contains the engine’s scripts, textures, music, and characters.
- `pak.txt` – development manifests that point the engine to uncompressed resources.

## Example mods

* `Beats of Rage` – the original intro to the OpenBOR project.
* `Alien vs Predator` – co-op campaign reimagining the classic shooter.
* `Streets of Rage Remake` – fan tribute with combos and new moves.
* `Dragon Ball Z: Mugen` – 2D fighting action with anime sprites.
* `Castle of Illusion` – platforming spin on the OpenBOR toolset.

## Engines

- **openbor4432 / openbor6412 / openbor7142 / openbor7530** – Requires `BR2_PACKAGE_OPENBORxxxx`. Each variation corresponds to a different architecture/SDL build; the scripts copy `pak` folders and stage `openbor.pak` into the final image.

## Notes

- Place your OpenBOR `Paks/` directory inside the ROM tree; keep the archive names as shipped to avoid mod loaders needing rename hacks.
- Use the `pak.txt` development driver when editing a mod locally so you can load unpacked sprites without rebuilding the `.pak` file.

---
