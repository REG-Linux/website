# GZDoom

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/gzdoom.png" alt="GZDoom logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

GZDoom is a modern source port that extends the Doom engine with slopes, true 3D floors, uncapped framerates, and broad mod compatibility. REG-Linux keeps it grouped under `ports` so you can launch Doom, Heretic, Hexen, Strife, or custom projects with the same interface.

### Quick reference

- **ROM folder:** `/userdata/roms/gzdoom`
- **Accepted formats:** `.wad`, `.iwad`, `.pwad`, `.pk3`, `.gzdoom`
- **Emulator:** `gzdoom`
- **System group:** `ports`

## BIOS

GZDoom requires no BIOS files.

## ROMs

Drop your Doom/Heretic/Hexen/Strife data into `/userdata/roms/gzdoom/`. GZDoom needs the main `IWAD` for each game (doom.wad, doom2.wad, heretic.wad, hexen.wad, strife1.wad, etc.) plus any `.pk3` or `.pwad` mods you want to load.

A `.gzdoom` wrapper tells the port exactly which command-line arguments to pass. Each file contains a single line such as:

```
-iwad DOOM2.WAD -file ALIENS_ERADICATION_TC_2_0.pk3 ERADICATION_MAPSET_2_0.wad
```

Use wrappers when combining multiple mods, keeping filenames and case exactly as they appear on disk. GZDoom also opens `.zip`, `.7z`, or `.pk3` files directly, so compressing a bundle is fine as long as the engine can read it.

Custom `IWADINFO` lumps let the port detect fan-made IWADs (`.iwad` or `.ipk3`) without needing the original base files. Place those alongside the main archives inside `/userdata/roms/gzdoom/`.

You can add alternate music banks or soundfonts by dropping files into `/userdata/system/configs/gzdoom/fm_banks/` and `/userdata/system/configs/gzdoom/soundfonts/`.

## Supported titles (examples)

- Doom (doom.wad, doom1.wad, doom2.wad)
- Heretic / Hexen (`heretic.wad`, `hexen.wad`, mission packs)
- Strife (`strife1.wad`)
- FreeDoom and community Total Conversions (Urban Brawl, Harmony, etc.)

## Saves

Save files go to `saves/gzdoom/<mod name>/`.

## Emulators

### GZDoom

REG-Linux launches the GZDoom executable with the usual `gzdoom.*` options (`videomode`, `padtokeyboard`, `bezel`, etc.) plus `gzdoom.nologo` for skipping intro videos. The Quick Menu allows you to swap IWADs or add/remove `.pk3` files on the fly.

## Controls

The default overlay maps the Retropad buttons to Doom actions. Use the in-game controls menu to fine-tune aiming, voice toggles, or to bind the joystick to the strafe buttons.

## Troubleshooting

- If the port complains about a missing IWAD, double-check that the name matches one of the expected filenames and that the file is not nested inside another folder.
- Custom mods may require you to prefix command lines inside `.gzdoom` wrappers with `-file` or `-merge`. Keep the line to a single command and preserve case sensitivity.
- Need new config values? Delete `/userdata/system/configs/gzdoom/` and let GZDoom regenerate them on the next launch.
