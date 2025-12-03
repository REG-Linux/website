# WonderSwan Color

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/wswanc.webp" alt="WonderSwan Color icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/assets/systems/logos/wswanc.png" alt="WonderSwan Color logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Bandai’s WonderSwan Color (2000) is a Japan-only handheld with a color LCD and 64 KB of RAM. REG-Linux exposes the `wswanc` system group and runs the games via `libretro: mednafen_wswan`.

## Technical specifications

- CPU: NEC V30MZ (16-bit) at 3.072 MHz with onboard jumpers for color mode.
- Memory: 64 KB RAM and 8 KB video RAM shared with the display circuitry.
- Display: 224×144 color panel showing up to 241 colors from a 4096 palette.
- Sound: Mono DAC with two square-wave channels and noise, plus simple stereo headphone output.

### Quick reference

- **ROM folder:** `/userdata/roms/wswanc`
- **Accepted formats:** `.wsc`, `.zip`, `.7z`
- **Emulator:** `libretro: mednafen_wswan`
- **System group:** `wswanc`

## ROMs

Place `.wsc` dumps (or zipped archives containing them) into `/userdata/roms/wswanc`. Keep archives flat so the core can detect the ROM immediately.

## Emulator options

Use `[HOTKEY]` + south face button to open the RetroArch Quick Menu and adjust `wswanc.videomode`, `wswanc.ratio`, `wswanc.shaders`, `wswanc.audio_latency`, and `wswanc.video_threaded`.

`mednafen_wswan` also exposes Game Boy-style options, enabling you to rotate the screen or toggle special palettes (SGB overlays) if needed.

## Controls

The default overlay depicts the WonderSwan pad (D-pad and four buttons). Adjust any mapping through `/remapping_controls_per_emulator` when you prefer a different layout.

## Troubleshooting

- Toggle the rotation option when the display orientation looks stretched.
- Increase `wswanc.video_threaded` if frames drop when using shaders, then disable when smoother output is required.
- Consult the [generic support pages](/support) if a ROM refuses to load after verifying the archive structure.
