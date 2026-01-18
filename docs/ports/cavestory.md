# Cave Story

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/cavestory.webp" alt="Cave Story icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/cavestory.png" alt="Cave Story logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Cave Story (2004) is the freeware indie adventure by Daisuke “Pixel” Amaya. REG-Linux
classifies the experience as a `ports` entry and relaunches it through RetroArch’s
`libretro: nxengine` core so you can use the same controller remapping, shaders, and
Quick Menu flow as with other RetroArch games.

### Quick reference

- **ROM folder:** `/userdata/roms/cavestory`
- **Accepted format:** `.exe`
- **Emulators:** `libretro: nxengine`
- **System group:** `ports`

## BIOS

No BIOS is needed. Cave Story loads directly from its executable and data archives.

## Game files

Extract the official English zip (`cavestoryen.zip`) into `/userdata/roms/cavestory/`
so that `Doukutsu.exe` and the supporting data files sit at the folder root. Avoid
language ports or fan mods when troubleshooting; the vanilla English package is the
most stable build REG-Linux targets.

## Emulators

### libretro: nxengine

RetroArch hosts the `nxengine` core, preserving the original game logic while
exposing familiar options such as `cavestory.videomode`, `cavestory.ratio`, and
`cavestory.shaders`. Open the Quick Menu (`[HOTKEY]` + south button) to
alter display, audio latency, or button bindings, and use the controller remap screen
if your pad differs from the Retropad layout.

## Controls

The default overlay matches the Cave Story input scheme. You can adjust the button
profiles in EmulationStation’s controller settings or within RetroArch’s input menu.

## Troubleshooting

- If the game crashes on boot, ensure the `Doukutsu.exe` executable sits directly in `/userdata/roms/cavestory` rather than a nested folder.
- Use the official English download (http://www.cavestory.org/downloads/cavestoryen.zip) when possible; community translations may freeze or desync.
- Visit the generic support pages for RetroArch-specific questions.
