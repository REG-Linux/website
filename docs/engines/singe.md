# Singe (Hypseus)

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/singe.webp" alt="Singe icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/singe.png" alt="Singe logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Hypseus Singe is the active fork of the Singe engine (full-motion-video, Lua-driven history of LaserDisc-style games). REG-Linux exposes works under the `singe` metadata group and loads `.daphne` packs through the Daphne-compatible core so cinematic shoots like _Mad Dog McCree_ and _Dragon’s Lair_ stay playable.

### Quick reference

- **ROM folder:** `/userdata/roms/singe`
- **Accepted formats:** `.daphne`, `.squashfs`
- **Engine:** Hypseus Singe
- **System group:** `engines`

## ROMs

Copy each `.daphne` folder into `/userdata/roms/singe/`. The pack bundles video (`.m2v`), audio (`.ogg`), script (`.singe`), and overlay assets, as well as a `Framework` directory. Keep the original structure intact (including `Video`, `Sound`, `Script`, etc.) so the launcher finds the assets automatically.

Download asset packs from the official Hypseus Singe data releases (choose the version that matches your REG-Linux release). Some packs require `Framework` data from the `Hypseus Singe Data` repository; place it inside the same directory as the `.daphne` folder.

## Engines

### Hypseus Singe

The Hypseus rendering core reads the `.daphne` scripts and plays video using SDL textures. Quick Menu options cover the usual REG-Linux overrides plus Singe-specific controls:

| Setting | Description |
| --- | --- |
| `daphne.gfxbackend` | OpenGL or Vulkan renderer. |
| `daphne.daphne_ratio` | Normal or stretch aspect ratio. |
| `daphne.daphne_rotate` | Rotate the output (0/90/270). |
| `daphne.bilinear_filter` | Apply bilinear scaling. |
| `daphne.daphne_scanlines` | Show scanlines when stretching. |
| `daphne.overlay_size` | Scale the overlay HUD (small vs large). |
| `daphne.abs_mouse_input` | Use absolute coordinates for light-gun cursors. |
| `daphne.singe_crosshair` | Toggle the crosshair overlay on/off. |
| `daphne.singe_joystick_range` | Adjust analog cursor sensitivity. |

Toggle these via `[HOTKEY]` + ![south](/wiki/south.png) or through EmulationStation’s advanced options.

## Controls

Gun-based games expect a mouse or light gun; REG-Linux maps the Retropad buttons to emulate light-gun triggers, start, and special actions. Use `/remapping_controls_per_emulator` when you want to move crosshair commands to shoulder buttons or analog sticks.

## Troubleshooting

- Ensure the `Framework` folder is present for Singe 2.x packs; missing files cause Lua scripts to fail.
- Keep the `.daphne` directory and its `.m2v`/`.ogg` assets together after copying; moving them breaks the loader.
- Toggle `daphne.bilinear_filter` or `daphne.ratio` if colors or scaling look off.
- For general issues, visit the [generic support pages](/support).
