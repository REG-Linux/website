---
title: Model 3
description: Model 3 documentation for REG Linux.
---

# Model 3

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/model3.webp" alt="Model 3 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/model3.png" alt="Model 3 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Sega Model 3 arcade board arrived in 1996 as a high-end successor to Model 2, powering arcade hits such as *Sega Rally 2*, *Virtua Fighter 3* and *Star Wars Trilogy Arcade*. REG-Linux uses the `model3`/`arcade` system groups so the platform aligns with existing arcade metadata and artwork collections.

## Technical specifications
 
- CPU: Multi-processor Sega Model 3 setup using a PowerPC 603/604 main CPU with Hitachi SH-2 helper chips (Step 1) and a Hitachi SH-4 RISC core (Step 2) for 3D geometry.
- Memory: Custom board carries 32 MB of main DRAM with dedicated buffers for texture and polygon storage plus extra RAM for the geometry pipeline.
- Display: Sega CG Board capable of ~180,000 texture-mapped polygons per second with lighting and perspective correction, made for 640×480+ raster output.
- Sound: CD-quality PCM audio with multiple simultaneous streams and hardware mixing plus Yamaha/QSound-style spatial effects.

## Quick reference

- **Emulator:** Supermodel
- **ROM folder:** `/userdata/roms/model3`
- **Accepted ROM formats:** `.zip` (matching the board ROM + CRC)
- **System group:** `model3`, `arcade`

## ROMs

Drop each official Model 3 ZIP into `/userdata/roms/model3`. Supermodel expects one compressed archive per game containing the required ROM and MIPS data; do not extract the archive or rename files. Use the [Supermodel compatibility list](https://www.supermodel3.com/About.html) to verify supported titles (all officially dumped games except “Boat Race GP” are playable).

## Emulators

### Supermodel

[Supermodel](https://www.supermodel3.com/) is the dedicated Sega Model 3 emulator bundled with REG-Linux. It exposes `model3.videomode` plus the options below; configuration is also stored in `/userdata/system/configs/supermodel/supermodel.ini`.

| ES setting name | REG-Linux.conf_key | Description & values |
| --- | --- | --- |
| 3D ENGINE | `model3.engine3D` | Select Legacy3D (`legacy3d`) or New3D (`new3d`). |
| QUAD RENDERING | `model3.quadRendering` | Enable modern quad rendering (`0` Off, `1` On). |
| ENABLE WIDESCREEN | `model3.wideScreen` | Stretch to widescreen (glitches may appear). |
| CROSSHAIRS | `model3.crosshairs` | Toggle shooting-game crosshairs per player. |
| ENABLE FORCE FEEDBACK | `model3.forceFeedback` | Allow force feedback on supported controllers. |
| MODERN PEDAL CONTROLS | `model3.pedalSwap` | Swap accelerator / brake to triggers. |
| POWERPC FREQUENCY | `model3.ppcFreq` | Adjust emulated PPC speed (25–150). |

Supermodel also supports save states (F5 save, F7 load, select slot with F6) stored under `/saves/supermodel/`. Non-volatile settings (high scores, config) persist in `/system/configs/supermodel/NVRAM/`.

## Controls

The default arcade layout maps to the REG-Linux Retropad; heavy use of keyboard (F5–F12) handles save states and volume controls. Use the overlays in `docs/images/controller-overlays/model3.png` for a visual guide.

![Model3 controller overlay](../images/controller-overlays/model3.png)

## Troubleshooting

- Refer to the [Supermodel FAQ](https://www.supermodel3.com/FAQ.html) for game-specific fixes.
- Use the service menu (`6`) when prompted, navigate with `5`/`6`, and exit via the **Exit** option.
- If “Network Board Not Present” appears, set **Game Assignments → Link ID** to “Single” to bypass multiplayer checks.
- For light-gun reloads, press the right mouse button when using pointer input. For further help, see the generic support pages.
