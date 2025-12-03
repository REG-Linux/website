# Thomson (MO/TO / Theodore)

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/thomson.webp" alt="Thomson - MO/TO (Theodore) icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/assets/systems/logos/thomson.png" alt="Thomson - MO/TO (Theodore) logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Thomson MO/TO (a.k.a. Theodore) family are 1980s French home computers built around the Motorola 6809. REG-Linux exposes the `thomson` metadata group and runs the `libretro: theodore` core so their cassette/disk images are playable.

## Technical specifications

- CPU: Motorola 6809E running at 1.79 MHz in the MO5/MO6/Tutor series with bank switching for memory extensions.
- Memory: 48 KB RAM (expandable via side cartridges and floppy expansions) plus 32 KB ROM for the built-in BASIC interpreter.
- Display: Thomson VDG offering 320×200 or 320×240 graphics with 16 colors plus firmware-assisted text modes.
- Sound: Texas Instruments SN76489A PSG providing three tone channels and one noise channel through the onboard speaker.

### Quick reference

- **ROM folder:** `/userdata/roms/thomson`
- **Accepted formats:** `.fd`, `.sap`, `.k7`, `.m7`, `.m5`, `.rom`, `.zip`, `.7z`
- **Emulator:** `libretro: theodore`
- **System group:** `thomson`, `arcade`

## ROMs

Copy Thomson cassette (`.k7`, `.m7`) and disk (`.fd`) dumps into `/userdata/roms/thomson`. The core accepts zipped archives as long as the ROM files live at the archive root, so do not nest directories inside the zip.

## Emulator settings

RetroArch’s Quick Menu (`[HOTKEY]` + south face button) controls video, shader, audio and input options through the `thomson.*` option tree. The core also exposes `global.thodor_*` features for rewinding, pad-to-keyboard mapping, and lightgun emulation where needed.

## Controls

Consult the Thomson keyboard overlay (from the controller overlay repo) to map keys or use `/remapping_controls_per_emulator` for any custom assignments when a game relies on special buttons.

## Troubleshooting

- Ensure each archive contains clean `.rom` or `.fd` files; rename them to match the original release when necessary.
- Toggle `thomson.video_allow_rotate` if the display orientation seems flipped.
- Visit the [generic support pages](/support) for additional RetroArch assistance.
