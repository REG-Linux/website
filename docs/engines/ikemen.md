# IKEMEN

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/ikemen.webp" alt="IKEMEN icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/ikemen.png" alt="IKEMEN logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

IKEMEN (https://github.com/Ikemen-Next/Ikemen-GO) is an open-source evolution of the M.U.G.E.N fighting engine. It keeps the familiar `.def` configuration format while introducing rollback netcode, Lua scripting hooks, and higher framerates. REG Linux uses IKEMEN to run the vast amount of community-made content originally written for Elecbyte’s M.U.G.E.N, including character sprites, stages, and gameplay logic.

## Supported content

* Community lineups such as Street Fighter (Ryu, Ken), King of Fighters (Kyo, Mai), and Guilty Gear characters ported from M.U.G.E.N arcs.
* Custom teams, tag mechanics, and story mode scripts built with Ikemen GO’s Lua API.
* Tournaments like EVO-inspired collabs, which plug straight into the engine using `.def`, `.air`, and `.cmd` definition files.

## Engine requirements

- **ikemen** – Requires `BR2_PACKAGE_IKEMEN`. The core binary loads `system.def`, character folders, palettes, and stage `.def` files just like traditional M.U.G.E.N.

## Notes

- Point IKEMEN at a folder containing `system.def` plus subfolders for each character/stage.
- Additional scripts such as `data/SFX.def` or `system.cfg` fine-tune audio, display resolution, and controller configuration.

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
