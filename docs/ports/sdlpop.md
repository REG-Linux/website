# SdlPop

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/sdlpop.webp" alt="SdlPop icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/sdlpop.png" alt="SdlPop logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

SdlPop is the open-source port of the original Prince of Persia. REG-Linux links it to the `ports` group and expects the original assets inside the `sdlpop` directory.

### Quick reference

- **ROM folder:** `/userdata/roms/sdlpop`
- **Accepted formats:** `.sdlpop`, `.squashfs`
- **Emulator:** `sdlpop`
- **System group:** `ports`

## BIOS

No BIOS is required.

## ROMs

Drop a valid `.sdlpop` archive—or a `.squashfs` container that includes it—into `/userdata/roms/sdlpop/`. The core reads the archive directly; no additional folders or config files are needed.

## Emulators

### SDLPop

The SDLPop binary exposes the usual video/input overrides (`sdlpop.videomode`, `sdlpop.ratio`, `sdlpop.padtokeyboard`, `sdlpop.decoration`). Use the Quick Menu (`[HOTKEY]` + ![south](/wiki/south.png)) or the EmulationStation advanced options to adjust shaders, scaling, or controller mapping.

## Controls

The default overlay maps movement to the d-pad and actions to the face buttons, with shoulder buttons triggering jump or sword swings. Refer to the overlay if you need to remap the controls.

## Troubleshooting

- If SDLPop fails to launch, double-check the `.sdlpop` file is intact and case-sensitive.
- Visit the [generic support pages](/support) if you encounter odd input or video behavior.
