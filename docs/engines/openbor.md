# OpenBOR

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/openbor.webp" alt="OpenBOR icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/openbor.png" alt="OpenBOR logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

OpenBOR (Open Beats of Rage) is the fan-made beat ’em up engine that extends the Streets of Rage formula with new characters, stages, and Lua-powered scripting. REG-Linux exposes the `openbor` metadata group so the port keeps its own artwork and name in the `engines` section.

### Quick reference

- **ROM folder:** `/userdata/roms/openbor`
- **Accepted format:** `.pak`
- **Engines:** `openbor4432`, `openbor6330`, `openbor6412`, `openbor6510`
- **System group:** `engines`

## BIOS

None.

## Game files

Drop `.pak` archives into `/userdata/roms/openbor`. Saves are stored under `/userdata/saves/openbor/<pak-folder>/`. Keep the pack structure intact (each `.pak` usually contains sprites, sounds, stages, and script files) and avoid renaming them to preserve compatibility.

### Configuration files

OpenBOR reads configs from `/userdata/system/configs/openbor/`:

| File | Purpose |
| --- | --- |
| `config.ini` | Shared defaults for every OpenBOR core. |
| `config4432.ini` | Overrides used by the older `openbor4432` build. |

## Engines

### OpenBOR cores

Each core provides a different build target (OpenBOR 2009/2010/2014) for extra compatibility. REG-Linux automatically launches the appropriate core with the chosen `.pak` file.

### Options

Standardized controls: `openbor.videomode`, `openbor.ratio`, `openbor.filter`.

| Setting | Description |
| --- | --- |
| `openbor.ratio` | Choose Normal or Stretch aspect ratio. |
| `openbor.filter` | Apply filters such as Bilinear, 2xSaI, Super 2xSaI, Hq2x, or ScanLines. |

## Controls

The default overlay matches beat ’em up layouts: D-pad/analog for movement, face buttons for attack/jump/special. Adjust the mapping via `/remapping_controls_per_emulator` if you need additional combos.

## Troubleshooting

- Ensure each `.pak` resides inside `/userdata/roms/openbor/` and keep the save folder structure unchanged.
- See the [generic support pages](/support) for general tips when a pack refuses to load.
