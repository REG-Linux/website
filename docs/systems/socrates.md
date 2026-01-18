# Socrates

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/socrates.webp" alt="Socrates icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/socrates.png" alt="Socrates logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The VTech Socrates (1988) is an educational console that launches cartridge-based learning titles tied to the `socrates` metadata group. REG-Linux exposes it through RetroArch/MAME so those rare kit cartridges remain playable.

## Technical specifications

- Manufacturer: VTech
- Release year: 1988
- Hardware type: console

### Quick reference

- **ROM folder:** `/userdata/roms/socrates`
- **Accepted formats:** `.bin`, `.zip`, `.7z`
- **Emulators:** RetroArch (`libretro: mess`), MAME
- **System group:** `socrates`

## BIOS

Place the official Socrates BIOS bundle (`socrates.zip`) inside `/userdata/bios/`. Several MD5 versions are accepted, so use the one you have:

| Checksum | Filename |
| --- | --- |
| `0efac0c2cc168c0d495e1c4e04ea9f5a` | `bios/socrates.zip` |
| `99af124aa300ecd44f5dc9d5a2599778` | `bios/socrates.zip` |
| `7046c2b27f51c9a5d33b4d6103f29acf` | `bios/socrates.zip` |
| `6878302c362321eeee7e40d285cf7d30` | `bios/socrates.zip` |
| `31c29c57e3d3e6788ba5817eaaa8b17a` | `bios/socrates.zip` |

## ROMs

Put each Socrates cartridge dump in `/userdata/roms/socrates` and make sure the filenames match the official release names; RetroArch and MAME prefer the `socrates` software list for metadata.

## Emulators

### RetroArch / libretro: mess

RetroArch launches `libretro: mess` for Socrates. Use `[HOTKEY]` + south face button to open the Quick Menu for `socrates.videomode`, `socrates.shaderset`, `socrates.audio_latency`, `socrates.video_threaded`, and light-pen mappings (`socrates.lightgun_map`). Additional settings include:

| Setting | Purpose |
| --- | --- |
| `socrates.gfxbackend` | Choose OpenGL/GLCore/Vulkan |
| `socrates.video_allow_rotate` | Allow rotated video output |
| `socrates.lightgun_map` | Map controller buttons to light gun axes |

### MAME

Standalone MAME loads the `socrates` software list. Open the MAME menu (`[HOTKEY]` + south or `[Tab]`) to tweak CPU overclock (`global.mame_cpu_overclock`), rendering (`global.mame_altres`), and ensure `socrates.softList` is pointed to the Socrates entries.

## Controls

The built-in overlay documents the two-button Socrates controller. If you require a light pen or alternate mapping, save a custom remap via `/remapping_controls_per_emulator`.

## Troubleshooting

- Confirm the BIOS zip matches one of the accepted MD5 hashes.
- Switch between RetroArch’s `mess` core and standalone MAME if a ROM refuses to start.
- Consult the generic support pages for broader emulator questions.
