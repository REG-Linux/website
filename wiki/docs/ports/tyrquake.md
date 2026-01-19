# TyrQuake

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/tyrquake.webp" alt="TyrQuake icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/tyrquake.png" alt="TyrQuake logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

TyrQuake is the libretro port of the original Quake shareware and retail episodes. REG-Linux keeps it inside the `ports` group so each episode resides in its own folder and the front end shows the proper artwork.

### Quick reference

- **ROM folder:** `/userdata/roms/tyrquake`
- **Accepted format:** `.pak`
- **Emulator/Core:** `libretro: tyrquake`
- **System group:** `ports`

## ROMs

Place the shareware `pak0.pak` at the root of `/userdata/roms/tyrquake/` and keep the registered episode packs inside dedicated subfolders such as `id1/`, `hipnotic/`, `rogue/`, and `dopa/`. Streaming music tracks belong inside each folder’s `music/` directory (e.g., `track02.ogg`). Save files appear under `/userdata/saves/tyrquake/<episode>/`.

## Emulator options

RetroArch exposes the usual `tyrquake.*` settings plus additional toggles for video, framerate, and rumble:

| Setting | Description |
| --- | --- |
| `tyrquake.gfxbackend` | Choose OpenGL or Vulkan rendering. |
| `tyrquake.audio_latency` | Increase to remove crackling. |
| `tyrquake.video_threaded` | Enable threaded video for heavier scenes. |
| `global.tyrquake_resolution` | Force an internal resolution up to 1920×1080+. |
| `global.tyrquake_framerate` | Lock FPS between 10–160 or leave it Automatic. |
| `global.tyrquake_rumble` | Toggle controller vibration. |
| `global.tyrquake_controller1` | Pick a controller profile (Gamepad, Modern, Keyboard+Mouse). |

Adjust these options from the Quick Menu (`[HOTKEY]` + south button) or by editing the config file inside each episode’s save folder.

## Controls

The overlay mirrors the PC-style FPS layout. Save a custom remap via `/remapping_controls_per_emulator` if you prefer WASD, alternate strafing, or deeper joystick tweaks.

## Troubleshooting

- Verify every episode folder contains the correct `.pak` files and optional `music/` tracks. Missing files stop TyrQuake from launching.
- Launch the shareware `pak0.pak` first to ensure the core runs before adding paid episodes or mission packs.
- When in doubt, consult the generic support pages for additional help.
