# Jazz Jackrabbit 2

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/jazz2.webp" alt="Jazz Jackrabbit 2 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/jazz2.png" alt="Jazz Jackrabbit 2 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Jazz Jackrabbit 2 is a 2D platformer that the native Jazz2 engine replays on modern machines. REG-Linux groups it under `ports` and relies on the original DOS data so the experience matches the classic release.

### Quick reference

- **ROM folder:** `/userdata/roms/jazz2`
- **Accepted format:** `.game`
- **Emulator:** `jazz2` (native)
- **System group:** `ports`

## BIOS

Jazz2 does not require a BIOS dump.

## ROMs

Copy your Jazz Jackrabbit 2 installation (Steam, GOG, or disc) to `/userdata/roms/jazz2/`. The folder should include the full game files—`J2Config.exe`, `J2Snippet.dat`, etc. Once the data is in place, create an empty marker file such as:

```
touch "/userdata/roms/jazz2/Jazz Jackrabbit 2.game"
```

This tells EmulationStation to list Jazz Jackrabbit 2 in the ports section. Keep the file names and capitalization as they appear on Windows to avoid mismatches.

## Emulators

### Jazz2 Native

The `jazz2` binary (`BR2_PACKAGE_JAZZ2_NATIVE`) runs the port. It respects standard video/input options, so use the Quick Menu to adjust scaling, shader overrides, or controller bindings.

## Controls

Jazz Jackrabbit 2 was designed for keyboard (arrow keys + Z/X) but also supports controllers. Assign jump/shoot to face buttons via REG-Linux’s controller settings and keep the D-pad/analog stick for movement.

## Troubleshooting

- If the title does not appear, make sure the `.game` file exists and that the ROM folder contains the complete installation (including data directories).
- Delete `/userdata/system/configs/jazz2/` to clear user-specific tweaks when switching between releases or mods.
