# GZDoom

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/gzdoom.png" alt="gzdoom logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Metadata

- Manufacturer: Ports
- Hardware: port
- Platform tag: pc
- Group: ports

## Supported ROM extensions

wad, iwad, pwad, gzdoom

## Emulators

- **gzdoom** (gzdoom) – Requires BR2_PACKAGE_GZDOOM

## Notes

Custom mods can be used by creating a new text file named after the game with the extension ''.gzdoom''. For example:
Aliens Eradication.gzdoom, which contains this single line of text:
-iwad DOOM2.WAD -file ALIENS_ERADICATION_TC_2_0.pk3 ERADICATION_MAPSET_2_0.wad

Note: The command must be on one line and the casing of the filenames and extensions must match exactly.

Additional music can be added to /userdata/system/configs/gzdoom in the fm_banks & soundfonts folders respectively.

More info: https://wiki.batocera.org/systems:gzdoom

---
Source: `gzdoom.yml`
