# DXX Rebirth

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/dxx-rebirth.webp" alt="DXX Rebirth icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/dxx-rebirth.png" alt="DXX Rebirth logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview
DXX Rebirth is a modern source port for the Descent series that runs Descent 1 and Descent 2 with improved rendering, mod support, and touch-ups while still depending on the retail game data. REG-Linux lists it as a `ports` title so metadata and artwork stay in their own section.

### Quick reference

- **ROM folder:** `/userdata/roms/dxx-rebirth`
- **Accepted formats:** `.d1x`, `.d2x`
- **Emulator:** `dxx-rebirth`
- **System group:** `ports`

## BIOS

No BIOS files are needed for DXX Rebirth.

## ROMs

DXX Rebirth requires the original data archives for each Descent release. You can grab shareware/demo data from the DXX Rebirth downloads page (links below) or procure the full titles via GOG/Steam for the complete experience.

- Shareware/demo:
  - `descent-pc-shareware.zip`
  - `descent2-pc-demo.zip`
- Retail packages: purchase Descent 1 and/or Descent 2 from digital stores and copy the entire data folder.

Place each release inside its own subfolder under `/userdata/roms/dxx-rebirth/`, then add a blank launcher file that matches the `.d1x` or `.d2x` extension:

- `/userdata/roms/dxx-rebirth/Descent/Descent.d1x`
- `/userdata/roms/dxx-rebirth/Descent2/Descent2.d2x`

These launcher files appear in EmulationStation and start the corresponding game data.

## Emulators

### dxx-rebirth

DXX Rebirth runs natively via the `dxx-rebirth` binary included in REG-Linux. It exposes RetroArch-style options such as `dxx-rebirth.videomode`, `dxx-rebirth.pad_to_keyboard`, `dxx-rebirth.powermode`, and bezel/hud overrides (`dxx-rebirth.bezel`, `dxx-rebirth.hud`, etc.). Use the Quick Menu (`[HOTKEY]` + south button) for any runtime adjustments or controller remapping.

| ES setting name | Description |
| --- | --- |
| `dxx-rebirth.rebirth_vsync` | Toggle vsync to prevent tearing. |
| `dxx-rebirth.rebirth_filtering` | Choose texture filtering (Classic, Blocky, Smooth). |
| `dxx-rebirth.rebirth_anisotropy` | Enable anisotropic filtering for distant surfaces. |
| `dxx-rebirth.rebirth_multisample` | Turn on 4x multisampling when you need smoother edges. |

These options complement the global `dxx-rebirth.*` settings for display and overlays.

## Controls

The default overlay reflects the keyboard/mouse layout, but you can bind actions to a gamepad with the standard controller configuration or the in-game input menu.

## Troubleshooting

- Confirm the appropriate `.d1x` or `.d2x` launcher lives beside its data directory; missing files mean the title never appears in EmulationStation.
- If the port refuses to start, double-check that every PK5/PK4 file from the retail install is present within the matching folder.
- For detailed assistance, visit the REG-Linux [DXX-Rebirth wiki](https://wiki.reglinux.org/systems:dxx-rebirth) or the generic support pages.
