# EDuke32

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/eduke32.webp" alt="EDuke32 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/eduke32.png" alt="EDuke32 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

EDuke32 is the Build Engine source port that runs Duke Nukem 3D, its expansions, and a wide array of official mods with improved rendering and scripting support. REG-Linux treats it as a `ports` engine so you can keep these games separated from the regular console/a rcade listings.

### Quick reference

- **ROM folder:** `/userdata/roms/eduke32`
- **Accepted format:** `.eduke32`
- **Emulator:** `eduke32`
- **System group:** `ports`

## BIOS

EDuke32 has no BIOS dependency.

## ROMs & launchers

Put each Build Engine game or mod inside a dedicated subdirectory under `/userdata/roms/eduke32/` and provide the required data files (`.grp`, `.dat`, `.def`, etc.). Common supported titles include:

- Duke Nukem 3D (`DUKE3D.GRP`)
- Duke It Out in D.C. (`DUKEDC.GRP`)
- Duke Caribbean: Life’s a Beach (`VACATION.GRP`)
- Duke: Nuclear Winter (`NWINTER.GRP`)
- Duke Nukem Atomic Edition (`DUKE3DA.GRP`)
- NAM (`NAM.GRP`, `NAM.CON`)
- Napalm (`NAPALM.GRP`, `NAPALM.CON`)
- World War II GI (`WW2GI.GRP`)
- World War II GI: Platoon Leader (`PLATOONL.DAT`, `PLATOONL.DEF`)
- Duke Nukem 3D: 20th Anniversary World Tour (via community patch)
- Plus fan-made packs such as Duke Assault and Duke!Zone.

Each entry needs a `.eduke32` launcher with commands that mirror the Build Engine’s command-line switches. The files live in the same top-level folder and look like:

```
FILE  = /duke/DUKE3D.GRP
FILE+ = /duke/DUKEDC.GRP
```

or for NAM:

```
FILE = /nam/NAM.GRP
CON  = /nam/NAM.CON
```

Use `FILE` to specify the primary group, `FILE+` for extra archives, `CON/CON+` for custom scripts, `DEF/DEF+` for replacements, and `DIR` to add search paths. Keep the commands uppercase and the paths relative to `/userdata/roms/eduke32/`. Underscore the launcher name (e.g., `Duke_Nukem_3D.eduke32`) to help the scraper match the entry.

## Saves

Save games go into `saves/eduke32/<game>` using the default Build Engine layout.

## Emulators

### EDuke32

REG-Linux launches the EDuke32 binary with the usual `eduke32.*` options (`videomode`, `pad_to_keyboard`, `bezel`, etc.). Additionally, it exposes `eduke32.nologo` so you can skip the vanilla intro movies.

## Controls

The provided overlay documents the Retropad mapping for movement and actions. Adjust bindings through the `Controls` menu inside EDuke32 if a mod repurposes a key or button.

## Troubleshooting

- Confirm each `.eduke32` launcher contains the correct commands (`FILE`, `FILE+`, `CON`, etc.) with relative paths to the target data.
- If a mod mixes multiple data archives, add multiple `FILE+` lines in the order the mod expects so the right assets load.
- Delete `system/configs/eduke32/` if you need to reset the configuration or when switching between radically different game sets.
