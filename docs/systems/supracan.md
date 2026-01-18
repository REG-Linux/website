# Super A'Can

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/supracan.webp" alt="Super A'Can icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/supracan.png" alt="Super A'Can logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Funtech’s Super A’Can (1995) is a rare 16-bit console that never left Taiwan. REG-Linux groups it separately under `supracan` so the distinctive theme can accompany the hardware.

## Technical specifications

- Manufacturer: Funtech Entertainment
- Release year: 1995
- Hardware type: console

### Quick reference

- **ROM folder:** `/userdata/roms/supracan`
- **Accepted formats:** `.bin`, `.zip`, `.7z`
- **Emulator:** MAME / `libretro: mame`
- **System group:** `supracan`

## ROMs

Store each Super A’Can binary inside `/userdata/roms/supracan`. The ROM images typically come in `.bin` format; zipped packages may be used but keep them flat (no nested directories).

## Emulator

### RetroArch / MAME

Use RetroArch’s `libretro: mame` core or the standalone MAME binary with the `supracan` driver. Key options include `global.mame_cpu_overclock`, `global.mame_altres`, and any `mame` UI toggles you need for inputs or artwork cropping. The same `socrates`-style Quick Menu approach works here—open `[HOTKEY]` + south face button or `[Tab]` to edit options.

## Controls

Super A’Can games rely on a straightforward D-pad and buttons set. Map them through the MAME input menu or `/remapping_controls_per_emulator` if you need custom bindings.

## Troubleshooting

- Make sure MAME loads the `supracan` software list so each title receives correct metadata.
- If sound glitches appear, try toggling `global.mame_cpu_overclock` or adjusting the audio latency under the MAME options.
- Due to preliminary sound support, some games may exhibit partial audio—document the behavior so we can improve it later.
