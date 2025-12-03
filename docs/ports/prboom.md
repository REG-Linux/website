# PrBoom

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/prboom.webp" alt="PrBoom icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/prboom.png" alt="PrBoom logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

PrBoom is the libretro-based source port that lets you run Doom, Doom II, and their mods with modern enhancements. REG-Linux ships the shareware IWAD (doom.wad) with the core and keeps the port inside the `ports` group so it remains separate from consoles.

### Quick reference

- **ROM folder:** `/userdata/roms/prboom`
- **Accepted formats:** `.wad`, `.iwad`, `.pwad`
- **Emulator/Core:** `libretro: prboom`
- **System group:** `ports`

## BIOS

No BIOS is required.

## Game files

PrBoom looks for IWADs in `/userdata/roms/prboom/`. The shareware `doom.wad` is included by default, but you can add your own IWADs (doom2.wad, hexen.wad, etc.) or fan-made PWADs into the same folder. Keep filenames lowercase to avoid any case-sensitive conflicts.

Suggested layout:

```
roms/prboom/Doom/doom.wad
roms/prboom/Doom 2/doom2.wad
roms/prboom/Doom 2/CHEX/CHEX.wad
roms/prboom/Final Doom/SIGIL_v1_21.wad
```

Use `.m3u` playlists if you need to chain episodes or custom mounts.

## Wiggle fix

If floors flicker on ARM boards, launch PrBoom and go to Options → General → Wiggle fix → No. Alternatively edit `/userdata/saves/prboom/<IWAD>/prboom.cfg` and set `r_wiggle_fix                  0` under the `[Video]` section.

## Emulators

### RetroArch / libretro: PrBoom

PrBoom exposes the usual `prboom.*` options (`videomode`, `ratio`, `smooth`, `shaders`, `pixel_perfect`, `decoration`, `game_translation`) plus:

| Setting | Description |
| --- | --- |
| `prboom.gfxbackend` | Choose OpenGL or Vulkan rendering. |
| `prboom.audio_latency` | Raise this if audio crackles. |
| `prboom.video_threaded` | Enable threaded video for heavy scenes. |
| `global.prboom-resolution` | Force a higher internal resolution (320×200 up to 2560×1600). |
| `global.prboom_controller1` | Pick the input type (Gamepad Classic, Modern, Keyboard+Mouse). |

Additional tweaks can be saved in `/userdata/saves/prboom/<IWAD>/prboom.cfg`.

## Additional WADs

Popular IWADs: `doom.wad`, `doom2.wad`, `tnt.wad`, `plutonia.wad`, `doomu.wad`. PWADs such as `SIGIL`, `CHEX`, `nerve`, or Urban Brawl should live inside subdirectories next to the base IWAD they plug into.

## Controls

PrBoom uses the standard FPS pad layout; refer to the controller overlay (e.g., `../images/controller-overlays/psx-1.png`) if you want to remap buttons.

## Troubleshooting

- For general issues, consult the [generic support pages](/support).
- Remove `/userdata/system/configs/prboom/` and `/userdata/saves/prboom/` to reset video or input tweaks when moving between mods.
