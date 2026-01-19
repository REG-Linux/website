# Rise of the Triad

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/rott.webp" alt="Rise of the Triad icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/rott.png" alt="Rise of the Triad logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Rise of the Triad is launched through the `taradino` port and stays grouped with the other `ports` entries in REG-Linux. It relies on the commercial game files to reproduce the original fast-paced shooter.

### Quick reference

- **ROM folder:** `/userdata/roms/rott`
- **Accepted format:** `.rott`
- **Emulator:** `taradino`
- **System group:** `ports`

## BIOS

No BIOS is necessary.

## ROMs

Copy the licensed Rise of the Triad files (`DARKWAR.WAD`, `DARKWAR.RTL`, `DARKWAR.RTC`, `REMOTE1.RTS`, etc.) into `/userdata/roms/rott/`. Once the data is in place, create a placeholder marker:

```
touch "/userdata/roms/rott/Rise of the Triad.rott"
```

The `.rott` file signals EmulationStation to show the entry. Keep filenames in the directory either uppercase or lowercase—ROT accepts both.

## Emulators

### Taradino

The `taradino` binary launches the port. Adjust video and input options from the Quick Menu and let the engine handle the rest.

## Controls

Rise of the Triad requires a mouse and keyboard at launch. Controller compatibility is limited, so configure the necessary actions via the in-game options if you need a pad.

## Troubleshooting

- Ensure the `tar` files and `DARKWAR.*` archives exist and are not corrupted.
- Delete `/userdata/system/configs/taradino/` if you need to reset controls or video settings after switching installs.
