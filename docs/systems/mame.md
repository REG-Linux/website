# MAME

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/mame.webp" alt="Mame icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/mame.png" alt="Mame logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

[MAME](https://www.mamedev.org/) (Multiple Arcade Machine Emulator) is the accuracy-first framework behind most arcade emulation on REG-Linux. The `mame` system group covers native MAME builds and the relevant libretro ports so that arcade ROMs, samples, artwork and settings remain consistent regardless of which core you choose.

## Quick reference

- **Accepted ROM formats:** `.zip`, `.7z`
- **ROM folder:** `/userdata/roms/mame`
- **Emulators:** libretro: imame4all, libretro: mame078plus, libretro: mame0139, libretro: mame, standalone MAME
- **System group:** `arcade`

| Emulator/Core | Sample path | Artwork path |
| --- | --- | --- |
| `libretro: imame4all` | `/userdata/bios/mame2003/samples` | not used |
| `libretro: mame078plus` | `/userdata/bios/mame2003plus/samples` | `/userdata/bios/mame2003plus/artwork` |
| `libretro: mame0139` | `/userdata/bios/mame2010/samples` | `/userdata/bios/mame2010/artwork` |
| `libretro: mame` | `/userdata/bios/mame/samples` | `/userdata/bios/mame/artwork` |
| standalone MAME | `/userdata/bios/mame/samples` | `/userdata/bios/mame/artwork` |

## BIOS and samples

Some ROM sets require BIOS files or audio samples. Place them under the directories listed above so RetroArch/MAME can locate them. When a game calls for samples, drop the necessary `.wav`/`.rom` files into the `samples` folder for that core (e.g., `/userdata/bios/mame2010/samples`). Artwork can sit inside the matching `artwork` folder if you want bezels or overlays.

## ROMs

Store your ROMs in `/userdata/roms/mame`. You can create subfolders for each ROMset version (e.g., `mame78plus`, `mame2010`, `latest`) to keep legacy and modern sets separate. Always match the ROMset version to the core you’re running:

- `libretro: imame4all`: MAME 0.37b5 ROMset
- `libretro: mame078plus`: MAME 0.78+ ROMset
- `libretro: mame0139`: MAME 0.139 ROMset (removed in v41+)
- `libretro: mame` and standalone MAME: the current MAME version shipped with REG-Linux

Refer to the [arcade guide](/arcade#romsets) to identify the ROMset required for each emulator release.

## Emulators

### RetroArch

[RetroArch](https://docs.libretro.com/) hosts the libretro MAME cores. Each core shares the Quick Menu (`[HOTKEY]` + south face button) for remapping, shaders, overrides and hotkey configuration. Additional libretro-specific options (frameskip, input interface, Neo Geo BIOS selection, etc.) appear in EmulationStation’s advanced menus when available.

#### Core highlights

- **libretro: imame4all** – stripped-down 0.37b5 build for weaker hardware; use for very old titles but expect compatibility gaps. No extra configuration inside EmulationStation.
- **libretro: mame078plus** – the favored middle ground combining accuracy and performance; exposes options such as analog/digital mapping, frameskip, TATE mode, Neo Geo BIOS selection and more.
- **libretro: mame0139** – MAME 2010 core that provides a larger library than 0.78 while still being lighter than the latest builds. Removed in v41+; available only on older images.
- **libretro: mame** – the latest stable MAME release. Use it when you need the newest ROMsets, hardware support or additional MESS systems.

### MAME (standalone)

The standalone `mame` binary wraps the same driver stack but exposes the full set of internal menus, dip switches, device options and system configuration. Access the menu via `[HOTKEY]` + south face button or `[Tab]` to change inputs, load multimedia (disk, CD, BIOS) and save per-game settings.

### CLK (Clock Signal) and other helpers

Some REG-Linux releases bundle complementary tools (e.g., Clock Signal for home computers). For pure arcade work, focus on the cores above unless a specific system documentation instructs otherwise.

## Controls

Arcade inputs map to the [REG-Linux Retropad](/configure_a_controller) by default. Each core and the standalone MAME menu allow you to remap buttons, analog sticks, light guns, and toggle dip switches for individual games.

## Troubleshooting

- Consult the [generic arcade guide](/arcade) before editing ROMs or BIOS files.
- Match ROMset versions carefully; mixing 0.78 ROMs with a 0.139 core will fail to boot.
- If samples or artwork fail to load, verify they’re stored under the exact path expected by the core.
