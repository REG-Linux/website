# Cannonball

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/cannonball.webp" alt="Cannonball icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/cannonball.png" alt="Cannonball logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Cannonball is a modern OutRun engine that targets REG-Linux as a “ports” entry.
It boots the 1986 Sega racer by reading the original ROM set with enhancements
like higher refresh rates and widescreen scaling. The system entry lives in the
`ports` group and expects the `cannonball` theme artwork when available.

### Quick reference

- **ROM folder:** `/userdata/roms/cannonball`
- **Accepted format:** `.cannonball`
- **Emulators:** `cannonball`
- **System group:** `ports`

## BIOS

No external BIOS files are required for Cannonball.

## ROMs

Copy the OutRun Revision B ROM files into `/userdata/roms/cannonball/`. Cannonball
must access the original `epr-10187.88`, `epr-10327a.76`, and related files,
so unzip them directly into this directory rather than leaving them inside archives.
Once the ROMs are in place, rename the shipped `Cannonball.cannonball.disabled`
to `Cannonball.cannonball` to make the system entry usable again.

The official project Github lists every required ROM by name and MD5, but the
three main archives below are commonly used to extract the needed files:

| MD5 checksum                       | Archive name        |
|------------------------------------|---------------------|
| `fe803998a14837227be83d0f30f29a23` | `outrun.zip`        |
| `dbf3c379a3664d9c920cada5dc4cdc23` | `outrun.zip`        |
| `a7060972e1cb854c111a435cc965cf29` | `cannonball.zip`    |

Refer to Cannonball’s README/`roms.txt` for the current list of ROM filenames.

## Emulators

### Cannonball

`cannonball` is the dedicated PC port bundled with REG-Linux. Its EmulationStation
entry exposes `cannonball.videomode`, `cannonball.ratio`, and the `cannonball.highResolution`
option so you can crank up the internal rendering resolution when needed.

## Controls

The provided overlay reproduces the arcade wheel and two-button layout. You can
remap buttons through the global controller configuration if a standard gamepad
doesn’t feel right.

## Troubleshooting

- If the entry remains disabled, make sure `Cannonball.cannonball.disabled` is renamed so EmulationStation sees the ROM.
- Double-check that the ROM set matches one of the MD5 values above; missing files stop the port from starting.
- For developer or input questions, visit the generic support pages.
