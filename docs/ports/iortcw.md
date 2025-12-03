# Return to Castle Wolfenstein

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/iortcw.webp" alt="Return to Castle Wolfenstein icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/iortcw.png" alt="Return to Castle Wolfenstein logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

IORTCW (iouRReturn To Castle Wolfenstein) is a modernized Wolfenstein client that runs the original RTCW assets. REG-Linux exposes it as a `ports` system so the multiplayer shooter appears with the rest of the source-port collection.

### Quick reference

- **ROM folder:** `/userdata/roms/iortcw`
- **Accepted formats:** `.pk3`, `.rtcw`
- **Emulator:** `iortcw`
- **System group:** `ports`

## BIOS

No BIOS is required.

## ROMs

Copy all `.pk3` files from the `Main` folder of your Return to Castle Wolfenstein install (Steam or GOG) into `/userdata/roms/iortcw/main/`. This should include the main data pack (e.g., `pak0.pk3`) and any mission packs you own.

Create a blank launcher in `/userdata/roms/iortcw/` such as:

```
touch "/userdata/roms/iortcw/Return to Castle Wolfenstein.rtcw"
```

This `.rtcw` marker allows EmulationStation to scrape and start the game.

The `.pk3` archives must stay in the `main` subdirectory; do not rename the folder. If you want to run additional mods, drop their `.pk3` files next to the core data and add their names to the `set fs_game` command in your custom `.rtcw` file.

## Emulators

### IORTCW

REG-Linux launches the `iortcw` binary, which uses the same Quick Menu options as other ports (`iortcw.videomode`, `iortcw.padtokeyboard`, etc.). Adjust video scaling, keyboard assignments, or mouse smoothing from the Quick Menu as needed.

## Controls

Return to Castle Wolfenstein requires a mouse and keyboard at launch but you can map controllers after the first run. Use the in-game controls menu to bind strafing and fire buttons, then lock the configuration via the Quick Menu if you switch profiles.

## Troubleshooting

- Double-check that `/userdata/roms/iortcw/main/` exists and contains every `.pk3` file from the `Main` folder; missing files prevent the game from launching.
- If you change languages or want to reset your profile, delete `/userdata/system/configs/iortcw.cfg` and rerun the client.
- This entry ships only the client; you still need your own server or join public servers to play multiplayer.
