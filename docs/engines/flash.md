# Flash Player

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/flash.webp" alt="Flash Player icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/flash.png" alt="Flash Player logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Adobe Flash Player once powered interactive web experiences and light games (https://www.adobe.com/products/flashplayer), but the official plug-in reached end-of-life in 2020. REG Linux relies on open-source reimplementations such as Ruffle (https://ruffle.rs) and Lightspark (https://lightspark.github.io) to continue running SWF content safely. These engines reverse-engineer the Flash virtual machine, cover most ActionScript 1/2 features, and drop in where the legacy player used to sit.

## Supported formats

- `swf` – Flash movie archives containing ActionScript bytecode.
- `abc` / `flex` – ActionScript bytecode bundles shipped in AS3 projects and AIR builds.

## Example content

* `Alien Hominid` – Newgrounds classic packaged as a standalone SWF.
* `Fancy Pants Adventure` – physics-based platformer built in Flash.
* `Club Penguin` minigames – small interactive adventures and puzzles.
* `Homestar Runner` cartoons and mini-games.
* `Pico's School` – early indie adventure example of Flash interactive storytelling.

## Engines

- **lightspark** – Requires `BR2_PACKAGE_LIGHTSPARK`. Focuses on OpenGL rendering plus AS3 compatibility.
- **ruffle** – Requires `BR2_PACKAGE_RUFFLE`. Rust-based emulator that prioritizes ActionScript 1/2 and safety for browsers/native builds.

## Notes

- Ship SWF files inside REG Linux’s ROM tree; Ruffle and Lightspark can point at archives or unpacked directories.
- Some games request external assets, so keep their asset folders relative to the SWF file for correct loading.

---
Source data: REG Linux emulationstation/es-system/es_systems.yml
