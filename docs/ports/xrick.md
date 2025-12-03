# XRick

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/xrick.webp" alt="XRick icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/xrick.png" alt="XRick logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

XRick is the open-source remake of Rick Dangerous. REG-Linux treats it as a `ports` entry and loads your zipped data archives through the libretro core.

### Quick reference

- **ROM folder:** `/userdata/roms/xrick`
- **Accepted formats:** `.zip`
- **Emulator/Core:** `libretro: xrick`
- **System group:** `ports`

## ROMs

Place the official `data.zip` (or another XRick archive) into `/userdata/roms/xrick/`. EmulationStation scans the folder and the core reads the assets without needing to unpack the archive.

## Emulators

### RetroArch / libretro: XRick

The core exposes the standard video/input overrides. Use the Quick Menu to remap buttons or adjust shaders if you prefer a custom layout.

## Controls

The overlay replicates the arcade-style run-and-jump layout. Use `/remapping_controls_per_emulator` if you need to bind buttons differently.

## Troubleshooting

- Confirm the `.zip` file is valid and intact; corrupted archives will prevent the core from launching.
- For general issues, consult the [generic support pages](/support).
