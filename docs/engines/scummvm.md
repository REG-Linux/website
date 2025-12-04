# ScummVM

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/scummvm.webp" alt="ScummVM icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/scummvm.png" alt="ScummVM logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

ScummVM reimplements the classic adventure and RPG engines from LucasArts, Sierra, Cyan, Westwood, and more. REG-Linux exposes the `scummvm` group so each supported title gets its own entry once you add the launcher file.

### Quick reference

- **ROM folder:** `/userdata/roms/scummvm`
- **Save folder:** `/userdata/saves/scummvm`
- **Accepted formats:** Game folders or `.squashfs` archives that include a `.scummvm` launcher file.
- **Engines:** ScummVM standalone, `libretro: ScummVM`
- **System group:** `engines`

## BIOS

No BIOS required. For Roland MT-32 MIDI support, drop the MT32 ROM files (GM.DAT, MT32_CONTROL.ROM, etc.) into `/userdata/bios/` and point ScummVM at them in the MIDI options.

## ROMs

Create one directory per game under `/userdata/roms/scummvm/`. Copy the original data files (DOS/Windows or Mac release) into that folder and create a blank launcher file named `<GameID>.scummvm` (e.g., `tentacle.scummvm` for Day of the Tentacle). The launcher tells REG-Linux which GameID to use, which is critical when multiple language variants exist.

ScummVM can also read `.squashfs` archives; the archive must contain the same `.scummvm` file inside so the emulator can register it automatically.

Autodetection (default in REG-Linux v42+) will scan the folder when no launcher is present, but it may pick the first entry it finds, so keep only the desired release in each directory until you confirm the ID.

## Setup helpers

Use the `scummvm-addgames-v2.sh` script (place it in `/userdata/roms/scummvm/`, `chmod +x`, then run `./scummvm-addgames-v2.sh <gamefolder> auto`) to batch-add games. Choose `standalone`, `libretro`, or `random` mode depending on whether you want the standalone client or the RetroArch core to manage the generated `scummvm.ini`.

## Engines

### ScummVM (standalone)

Launch it from EmulationStation and open `[F1] > Applications > scummvm` to add folders, inspect GameIDs, and adjust global settings.

### RetroArch / libretro: ScummVM

The libretro core uses the same GameIDs and saves as the standalone build. Press `[HOTKEY]` + ![south](/wiki/south.png) to open the Quick Menu for shaders, bezels, or controller remaps.

## Controls

Point-and-click adventure controls rely on cursor movement. The default overlay mirrors the mouse + menu layout, but you can remap keys or button combinations with `/remapping_controls_per_emulator`. Use the emulator’s in-game options to adjust mouse speed or key bindings if a title feels sluggish.

## Troubleshooting

- Delete `scummvm.ini` inside a game folder and rerun the setup script when the launcher file is ignored.
- Run `scummvm --add --recursive --path=/userdata/roms/scummvm` after moving directories to refresh the game list.
- Ensure Roland MT-32 files exist inside `/userdata/bios/` when launching MIDI-based titles.
- Refer to the [generic support pages](/support) for other issues.
