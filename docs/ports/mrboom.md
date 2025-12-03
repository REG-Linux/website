# Mr. Boom

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/mrboom.webp" alt="MrBoom icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/mrboom.png" alt="MrBoom logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Mr. Boom is a Bomberman-inspired party game packaged as a libretro core. REG-Linux treats it as a `ports` title so you can jump into local or online matches with the same RetroArch pipeline used across the system.

### Quick reference

- **ROM folder:** `/userdata/roms/mrboom`
- **Accepted format:** `.libretro`
- **Emulator/Core:** `libretro: MrBoom`
- **System group:** `ports`

## BIOS

No BIOS is required.

## Game files

Mr. Boom stores its assets as a `.libretro` package inside `/userdata/roms/mrboom/`. Feel free to replace the supplied archive with your own build as long as the filename keeps the `.libretro` extension. The core loads that archive when you select the entry.

## Emulators

### RetroArch

The MrBoom libretro core exposes the standard `mrboom.*` options (`videomode`, `ratio`, `smooth`, `shaders`, `pixel_perfect`, `decoration`, and `game_translation`).

| ES setting name | Description |
| --- | --- |
| `mrboom.gfxbackend` | Choose between OpenGL or Vulkan rendering. |
| `mrboom.audio_latency` | Increase this value if you hear distortion. |
| `mrboom.video_threaded` | Enable threaded video for heavier renderers, at the cost of input latency. |

#### MrBoom-specific options

| ES setting name | Description |
| --- | --- |
| `global.mrboom-aspect` | Pick the palette used for team matches (Selfie Native, Color Color, etc.). |
| `global.mrboom-nomonster` | Disable the monster NPCs for arena-style gameplay. |

## Controls

The default overlay covers movement, bomb placement, and the join buttons. You can fine-tune controller mappings via the RetroArch Quick Menu or by remapping buttons through the global controller configuration.

## Troubleshooting

- If the core behaves strangely, delete `/userdata/system/configs/mrboom/` and let RetroArch rebuild the config.
- Check `/userdata/system/logs/retroarch.log` or the standard `es_launch_stderr.log` for Core-specific errors.
