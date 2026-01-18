# Sonic Retro Engine

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/sonicretro.webp" alt="Sonic Retro Engine icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/sonicretro.png" alt="Sonic Retro Engine logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Sonic Retro Engine (formerly Star Engine) bundles modern builds of Sonic 1, Sonic 2, and Sonic CD using RSDKv5. REG-Linux deploys both `sonic2013` (for `.son`) and `soniccd` (for `.scd`) cores so the ports appear under the `sonicretro` metadata group alongside the other `ports` entries.

### Quick reference

- **ROM folder:** `/userdata/roms/sonicretro`
- **Accepted formats:** `.son`, `.scd` (zip/squashfs archives are allowed as long as the directory structure stays intact)
- **Emulators:** `sonic2013` (RSDKv5 for Sonic 1/2), `soniccd` (RSDKv3/4 for Sonic CD)
- **System group:** `ports`

## ROMs

Extract the `Data.rsdk` assets from the Android/iOS/Steam packages and place them into folders named `<Game>.son` or `<Game>.scd`. For example:

- `/userdata/roms/sonicretro/Sonic 1.son/Data.rsdk`
- `/userdata/roms/sonicretro/Sonic CD.scd/Data.rsdk` plus the `videos/*.ogv` files from the Steam release if you want the cutscenes.

The Android assets live inside `assets/Data.rsdk.xmf`; rename them to `Data.rsdk` after extraction. Keep the `Framework` and related subfolders exactly as shipped.

Use the included MD5 table values to verify you have a compatible release (e.g., `f679e87477bbed17ff1bdb9a6793f49c` for Sonic 1 iOS, `2b2e44eaacbed7a12823e87a500f236f` for Sonic 2 Android).

## Emulators

### sonic2013 (`.son` folders)

This core handles Sonic 1/2 data. Exposed options include:

| Setting | Description |
| --- | --- |
| `sonicretro.language` | Choose localization (English, French, German, etc.). |
| `sonicretro.vsync` | Toggle vsync. |
| `sonicretro.scalingmode` | Pick a pixel scaling mode (Nearest, Integer, Bilinear). |
| `sonicretro.hqmode` | Enable HQ filtering in special stages. |
| `sonicretro.skipstart` | Skip the launcher menu. |
| `sonicretro.devmenu` | Show the developer/mod menu (useful for mods). |

### soniccd (`.scd` folders)

This core expects Sonic CD data plus optional cutscenes. Supported options include the same scaling/language flags plus `sonicretro.spindash` to mimic Sonic 2/CD-style spin dash behavior.

REG-Linux auto-selects the correct core based on the folder extension (`.son` → `sonic2013`, `.scd` → `soniccd`). Manually picking the wrong emulator will not launch the game.

## Controls

The overlay mirrors the classic Sonic controller. Use `[HOTKEY]` + south button to access the Quick Menu if you need to remap jump, spin dash, or action buttons before loading mods.

## Troubleshooting

- Always match `.son` folders with `sonic2013` and `.scd` folders with `soniccd`.
- Verify your `Data.rsdk` MD5 matches a known-good release to avoid launch failures.
- Include the `videos/` folder when using Steam’s Sonic CD so the cutscenes play correctly.
- Enable the Dev Menu via `sonicretro.devmenu` before installing mods; otherwise, it stays hidden.
