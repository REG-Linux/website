# DevilutionX

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/devilutionx.webp" alt="DevilutionX icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/devilutionx.png" alt="DevilutionX logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

DevilutionX resurrects Diablo and its Hellfire expansion with an open-source engine that honors the original game data while adding modern QoL options. REG-Linux places it in the `ports` category so the dedicated entry keeps its own art set and metadata group.

### Quick reference

- **ROM folder:** `/userdata/roms/devilutionx`
- **Accepted formats:** `.mpq`
- **Emulators:** `devilutionx`
- **System group:** `ports`

## BIOS

No BIOS dump is needed; DevilutionX runs directly from the MPQ data archives.

## ROMs

Copy the main game files into `/userdata/roms/devilutionx/`. The required archives are:

- `DIABDAT.MPQ` – base game data from your retail CD or GOG/Steam install.
- `spawn.mpq` – optional shareware demo for players without the full game.
- `hellfire.mpq`, `hfmonk.mpq`, `hfmusic.mpq`, `hfvoice.mpq` – required only if you own Hellfire.

Place all MPQs beside each other in the root of `/userdata/roms/devilutionx/` so the engine can locate them. Optional language and font packs (e.g., `fonts.mpq`, `pl.mpq`) are dropped into the same folder and left untouched.

## Emulators

### DevilutionX

REG-Linux launches the standalone DevilutionX binary. It exposes the usual video/input options such as `devilutionx.videomode`, `devilutionx.ratio`, `devilutionx.padtokeyboard`, and `devilutionx.decoration`.

## Controls

DevilutionX ships with a PC-inspired control scheme (mouse + keyboard). You can still bind actions to controllers through the Quick Menu if you prefer to keep your pad mapped to the Retropad layout.

## Troubleshooting

- Verify that each MPQ file exists and is not nested inside subdirectories; DevilutionX will abort if it cannot find `DIABDAT.MPQ`.
- Use the shareware `spawn.mpq` only if you do not have the retail data; the full game requires the proper GOG/Steam courtesy files.
- For voice, font, or language packs download the assets from the official GitHub releases page and leave the filenames unchanged.
- Visit the [DevilutionX wiki](https://github.com/diasurgical/devilutionx/wiki) or the [generic support pages](/support) for more help.
