# Quake II (VitaQuake2)

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/vitaquake2.webp" alt="Quake II icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/vitaquake2.png" alt="Quake II logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

VitaQuake2 is the libretro port that runs Quake II and its mission packs (Xatrix, Rogue, Zaero). REG-Linux exposes it in the ports section and uses the base and subdirectories to identify each episode.

### Quick reference

- **ROM folder:** `/userdata/roms/vitaquake2`
- **Accepted formats:** `.pak`, `.zip`, `.7z`
- **Emulator/Core:** `libretro: vitaquake2`
- **System group:** `ports`

## ROMs

The base game resides inside the `baseq2/` folder, while the mission packs live in their own directories (`xatrix/`, `rogue/`, `zaero/`). Drop the `.pak` files into the appropriate subfolders so the core can detect them. VitaQuake2 automatically loads the folder when you navigate to the entry.

## Emulators

### RetroArch / libretro: VitaQuake2

The core honors the usual `vitaquake2.*` overrides. Adjust video, shaders, and controllers through the Quick Menu or EmulationStation advanced options.

## Controls

The overlay demonstrates the FPS layout; configure movement, jump, and fire through the standard `remapping_controls_per_emulator` workflow if you need adjustments.

## Troubleshooting

- Verify each mission pack folder contains the proper `.pak` files for that episode.
- Use the shareware `baseq2` data to confirm the core works before adding the mission packs.
