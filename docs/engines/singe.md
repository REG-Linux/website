# Singe

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/singe.webp" alt="Singe icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/singe.png" alt="Singe logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Singe is the open-source layer that runs the full-motion-video games originally produced by companies such as American Laser Games and Action Max. It is maintained inside the [Hypseus project](https://github.com/hypseus/hypseus) and emulates the Lua-based framefiles, audio codecs, and input handling these experiences rely on, while exposing proper mapping for light guns, keyboards, and gamepads.

## Supported formats

- `singe` – script-driven framefile describing when movies, sounds, and inputs play.
- `framefile.txt` / `.SRP` – metadata files that describe triggers and scoring for each scene.
- `m2v`, `ogm`, `ogg` – multimedia files ripped from the original LaserDisc or CD-ROM releases.

## Example games

* `Mad Dog McCree`
* `Crime Patrol`
* `Space Pirates`
* `Dragon's Lair`
* `Road Avenger`

## Engines

- **hypseus-singe** – Requires `BR2_PACKAGE_HYPSEUS_SINGE`. This build of Hypseus wraps the Singe compatibility layer and provides the light-gun input parser.

## Notes

- Keep the original `.singe` folder structure (e.g., `singe/maddog/maddog.singe`, `maddog.m2v`, `maddog.txt`) so the launcher can find the framefile and codec assets.
- Light guns and shooting overlays rely on accurate timing, so do not rename the `.txt` framefiles.

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
