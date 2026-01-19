# IKEMEN

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/ikemen.webp" alt="IKEMEN icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/ikemen.png" alt="IKEMEN logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

IKEMEN GO is a modern reimplementation of the M.U.G.E.N fighting engine that adds rollback-friendly netcode, Lua scripting, and widescreen support. REG-Linux treats it as a dedicated `engines` entry so you can download IKEMEN-based projects and launch them with the same front-end flow as other native engines.

### Quick reference

- **ROM folder:** `/userdata/roms/ikemen`
- **Accepted formats:** `.ikemen`, `.pc`
- **Engine:** IKEMEN GO native binary
- **System group:** `engines`

## BIOS

No BIOS is required.

## Game files

Place each IKEMEN project (usually distributed with a `system.def` plus character/stage folders) inside `/userdata/roms/ikemen/`. Typical folders contain `data/`, `chars/`, `portraits/`, and `save/`. The engine expects version 0.98.x content on REG-Linux v36–39 and version 0.99 or newer on v40+, so ensure your data matches the shipped engine level. If you upgrade REG-Linux and see JSON errors, delete `save/config.json` inside the game directory and rebuild the config from the in-game menu.

If your game uses `.zss` files (e.g., `action.zss`, `common1.cns.zss`, `functions.zss`), copy them from the IKEMEN GO GitHub `data/` tree so the engine has the required combat definitions.

## Engine

### IKEMEN GO

The IKEMEN binary uses the standard Quick Menu (`[HOTKEY]` + `Start`) for video/shader overrides (`ikemen.videomode`, `ikemen.bezel`, etc.) and replicates M.U.G.E.N’s `.def` structure. Command-line options remain per the original engine, but REG-Linux handles most configuration through Quick Menu overrides.

## Controls

Fighting games use the usual RETROpad layout. Bind movement to the D-pad/analog stick, assign light/medium/heavy buttons, and map `Start`/`Select` to pause or menu access. Use the IKEMEN in-game options or `/remapping_controls_per_emulator` to tweak any missing keys.

## Troubleshooting

- Delete `save/config.json` when migrating from IKEMEN 0.98 to 0.99 to fix JSON parsing errors.
- Verify required `.zss` files in `data/` for 0.99 titles; missing files trigger startup failures.
- For other issues consult the generic support pages.
