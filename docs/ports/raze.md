# Raze

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/raze.webp" alt="Raze icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/raze.png" alt="Raze logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Raze runs classic Build engine titles through a unified launcher powered by GZDoom technology. It supports Duke Nukem 3D, Blood, Shadow Warrior, World War II GI, and other legacy shooters with modern rendering and controller helpers.

### Quick reference

- **ROM folder:** `/userdata/roms/raze`
- **Accepted formats:** `.raze`
- **Emulator:** `raze`
- **System group:** `ports`

## BIOS

No BIOS is required.

## Game data

Place each game’s data inside a dedicated subdirectory (e.g., `/userdata/roms/raze/duke/`, `/userdata/roms/raze/blood/`). Raze expects the original archives (`DUKE3D.GRP`, `BLOOD.RFF`, `SW.GRP`, `WW2GI.GRP`, etc.) along with any expansion packs you own (Cryptic Passage, Suckin’ Grits on Route 66, etc.). Some expansions are easier to keep zipped: gather the required files into the root of a `.zip` and drop it alongside the base data (e.g., `cryptic.zip`, `route66.zip`).

Optional custom music tracks (e.g., `track02.ogg`) can be placed inside each game directory to override the default soundtrack.

Each entry needs a `.raze` launcher file inside `/userdata/roms/raze/` containing the commands Raze uses to load the data. Examples:

- Blood: `FILE = /blood/BLOOD.RFF`
- Blood: Cryptic Passage: `FILE = /blood/BLOOD.RFF` and `FILE+ = /blood/cryptic.zip`
- Duke Nukem 3D base: `FILE = /duke/DUKE3D.GRP`
- Duke expansions: add `FILE+ = /duke/<expansion>.GRP`
- Shadow Warrior Team Bonus Pack: `FILE = /shadow/SW.GRP` plus the `TD.GRP` or `WD.GRP` entries as needed
- World War II GI: `FILE = /ww2gi/WW2GI.GRP` plus the Platoon Leader files (`FILE+ = /ww2gi/PLATOONL.DAT`, `CON = PLATOONL.DEF`)

Use underscores in the launcher names (e.g., `Duke_Nukem_3D.raze`) to help the scraper.

## Emulators

### Raze

The `raze` binary exposes the standard `raze.*` options for display and input. It also accepts command-line switches found inside the `.raze` files, so you can pass `-file`, `-game`, or `-nomonster` there if a mod calls for it.

## Controls

Raze defaults to keyboard + mouse, but you can map actions to a controller through the Quick Menu or the in-game controls menu. The overlay shows typical button assignments for dropping bombs, jumping, and interacting with the UI.

## Troubleshooting

- Verify that the `.raze` launcher and its referenced files exist. Missing `.GRP`, `.RFF`, or `.DAT` files cause the entry to vanish.
- When dealing with expansions packaged as `.zip`, keep the archive name consistent with the `FILE+` line in the launcher.
- Reset `/userdata/system/configs/raze/` after swapping game versions or mods to avoid stale settings.
