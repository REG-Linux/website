# Tomy Tutor (Pyūta)

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/tutor.webp" alt="Tutor icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/tutor.png" alt="Tutor logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Tomy Tutor (Pyūta) is a 1983 educational computer similar to the TI-99/4A. REG-Linux wraps the ROMs in the `tutor` metadata set and runs them through MAME’s Tutor driver.

## Technical specifications

- CPU: Motorola 6809E processor clocked at 1.79 MHz with additional gate-array support for floppy and video timing.
- Memory: 64 KB RAM standard with room for up to 512 KB via expansion cards and ROM overlays.
- Display: Thomson VDG supporting 320×200 graphics in 16 colors plus dedicated character/text modes.
- Sound: SN76489A-compatible PSG offering three tone channels and noise.

### Quick reference

- **ROM folder:** `/userdata/roms/tutor`
- **Accepted formats:** `.bin`, `.wav`, `.zip`, `.7z`
- **Emulator:** MAME
- **System group:** `tutor`

## BIOS & ROMs

Drop the `tutor.zip`/`.7z` BIOS bundle into `/userdata/bios/` (or directly into the ROM folder). Cartridge dumps (`.bin`) and cassette `.wav` tapes belong in `/userdata/roms/tutor`; zipped archives are fine if they keep the ROM files in the archive root.

## Emulators

### MAME

MAME executes the Tutor driver via `[HOTKEY]` + south face button or `[Tab]`. Configure `tutor.video`, `tutor.bgfxbackend`, `tutor.bgfxshaders`, `tutor.switchres`, and `tutor.altromtype` to match the media (cassette vs cartridge). The Quick Menu also exposes input options; R1 moves down the menu, and `[East]` acts as Select.

## Controls

The overlay linked in the controller repo mirrors the Tutor keyboard layout; use it when mapping the keys or joystick input via `/remapping_controls_per_emulator`.

## Troubleshooting

- Ensure `tutor.zip` exists and contains the BIOS images before launching a ROM.
- Switch `tutor.altromtype` when loading tapes versus cartridges.
- See `/support` for broader emulator tips.
