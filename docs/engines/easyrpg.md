# EasyRPG

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/easyrpg.webp" alt="EasyRPG icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/easyrpg.png" alt="EasyRPG logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

EasyRPG is the open-source engine that runs RPG Maker 2000/2003 and native EasyRPG projects with modern rendering, encoding support, and controller-friendly mapping. REG-Linux exposes the `easyrpg` metadata group so the port keeps its own theme while sharing the same front-end controls as the rest of the ports list.

### Quick reference

- **ROM folder:** `/userdata/roms/easyrpg`
- **Accepted formats:** `.easyrpg`, `.zip`, `.squashfs`
- **Engines:** `EasyRPG` standalone, `libretro: easyrpg`
- **System group:** `ports`

## BIOS

EasyRPG uses only the game’s data files and does not need a BIOS dump.

## Game files

Drop each RPG Maker project into `/userdata/roms/easyrpg/` so the folder name ends with `.easyrpg`. The required files include `RPG_RT.ldb`, `RPG_RT.lmt`, and the typical asset folders (`Backdrop`, `Battle`, `Music`, `Picture`, `System`, `Title`, etc.). If a project ships inside a `Data` subfolder, move its contents into a `.easyrpg` folder so the key files sit at the top level. Easily distributed `.zip`/`.squashfs` archives are supported starting in REG-Linux v33 as long as the archive contains the properly structured project root.

### Encoding and tools

Some releases rely on specific code pages. Use `easyrpg.encoding` (Quick Menu or `RPG_RT.ini`) to pick the right encoding (`1252`, `932`, `1251`, etc.) so text renders correctly. The EasyRPG tools page covers how to convert `.ldb/.lmt/.lmu` files to editors or export `*.xyz` graphics to PNG.

## Engines

### EasyRPG (standalone)

The standalone binary exposes `easyrpg.videomode` and engine-specific toggles:

| Option | Purpose |
| --- | --- |
| `easyrpg.testplay` | Enable the developer menu, walk-through-walls, and debug hotkeys. |
| `easyrpg.encoding` | Force the code page when Autodetect fails. |

### RetroArch / libretro: EasyRPG

The libretro core exposes the standard `easyrpg.*` options plus backend controls:

`easyrpg.videomode`, `easyrpg.ratio`, `easyrpg.shaders`, `easyrpg.pixel_perfect`, `easyrpg.decoration`, `easyrpg.game_translation`, `easyrpg.gfxbackend`, `easyrpg.audio_latency`, `easyrpg.video_threaded`.

## Controls

The default overlay maps `A`/`B` to confirm/cancel, the D-pad to movement, and `L`/`R` to helper functions (Test-play uses `R` for walk-through-walls). Quick Menu hotkeys (`[HOTKEY]` + `Start`, `A`, `B`, `L`, `Y`) let you take screenshots, restart games, open debug menus, or fast-forward text.

## Troubleshooting

- If characters display incorrectly, set `easyrpg.encoding` in the Quick Menu or `RPG_RT.ini`.
- Keep `RPG_RT.ldb`, `RPG_RT.lmt`, and the asset directories intact inside each `.easyrpg` folder; missing data keeps the game from launching.
- When the core crashes, try enabling Test-play to skip problematic events or reinstall the project folder from a known working build.
- See the [generic support pages](/support) for other issues.
