# Plug and Play TV Games

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/plugnplay.webp" alt="Plug and Play TV Games icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/plugnplay.png" alt="Plug and Play TV Games logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

This grouping covers self-contained Plug ‘n’ Play TV game units such as Jakks Pacific/AtGames dongles that run off built-in ROMs. Because those systems are hardware-specific, REG-Linux launches them through MAME and tags everything as `plugnplay` so themes know which artwork to use.

## Technical specifications

- Manufacturer: Various
- Release year: 2002
- Hardware type: console

### Quick reference

- **ROM folder:** `/userdata/roms/plugnplay`
- **Accepted formats:** `.zip`, `.7z`
- **Emulator:** MAME
- **System group:** `plugnplay`

## ROMs

Drop each ROM archive into `/userdata/roms/plugnplay` and refresh EmulationStation so the new entries appear. EmulationStation treats these as MAME games, so include any ZIP/7z container that holds the plug-and-play image.

## Native Linux ports

REG-Linux also accepts native Linux ports under the same system. Place the unpacked game data in `/userdata/roms/ports/.data/<Game>` and create an executable launcher script in `/userdata/roms/ports/` that changes into the `.data/<Game>` directory before launching the binary. After marking the script executable (`chmod +x <script>.sh`), refresh the gamelist and launch the script from EmulationStation.

## Emulators

### MAME

MAME handles both the plug-and-play archives and the native Linux port wrappers. Configure options through the in-game menu (`[HOTKEY]` + south face button or `[Tab]`) or via `mame.ini`. REG-Linux exposes shared settings such as `plugnplay.videomode`, `plugnplay.decoration`, `plugnplay.padtokeyboard`, and BGFX options (`plugnplay.video`, `plugnplay.bgfxbackend`, `plugnplay.bgfxshaders`, `plugnplay.switchres`). Tweak rotation (`plugnplay.rotation`) and D-pad orientation (`plugnplay.altdpad`) when needed.

## Controls

Plug-and-play titles shipped with proprietary controllers, so MAME indexes the inputs numerically. Use `/remapping_controls_per_emulator` to swap buttons if the layout feels wrong; the default overlay is the generic MAME mapping shown inside the repository.

## Troubleshooting

- If a new ROM does not appear, re-run **Refresh Gamelist** from the `[START]` → **Game Settings** menu to rebuild the list.
- Vulkan-based native ports require Vulkan 1.1+ hardware; they will not run on GPUs without adequate support.
- For general issues consult the arcade guide and the generic support pages.
