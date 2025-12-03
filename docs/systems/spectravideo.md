# Spectravideo SV-328

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/spectravideo.webp" alt="Spectravideo SV-328 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/assets/systems/logos/spectravideo.png" alt="Spectravideo SV-328 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Spectravideo’s SV-328/SV-318 computers shared many components with the MSX family, so REG-Linux treats them under the `spectravideo` metadata group while emulating them via MSX-compatible cores.

## Technical specifications

- CPU: Zilog Z80A running at 3.579545 MHz.
- Memory: 64 KB of main RAM with cartridge-based bank switching for extra storage.
- Display: TMS9918A video chip providing 256×192 graphics in 16 colors plus 16 KB VRAM.
- Sound: AY-3-8910 PSG with three square-wave channels and programmable noise.

### Quick reference

- **ROM folder:** `/userdata/roms/spectravideo`
- **Accepted formats:** `.zip`, `.7z`, `.cas`
- **Emulators:** `libretro: bluemsx`, `openmsx`
- **System group:** `spectravideo`, `msx`

## ROMs

Store Spectravideo programs (tape `.cas` or disk `.dsk` files) inside `/userdata/roms/spectravideo`. Leave zipped packages flat so `openmsx` or blueMSX can scan them directly.

## Emulators

### openMSX

openMSX emulates Spectravideo hardware using the same MSX options (`msx1.videomode`, `msx1.a3`, etc.) plus global switches such as `msx1.padtokeyboard`, `msx1.bezel` and the AI helpers. Access these via `[HOTKEY]` + south or EmulationStation’s advanced game options.

### RetroArch / bluemsx

blueMSX run inside RetroArch exposes `msx1.*` and `global.bluemsx_nospritelimits`. The same BIOS and cartridge lists described in the MSX docs apply here, so drop the required ROMs (FMSX package, BlueMSX/CLK BIOS) into `/userdata/bios`.

## Controls

Spectravideo titles map to the MSX keyboard layout. Use the controller overlay or custom remaps to simulate typing when needed.

## Troubleshooting

- Make sure the archive includes the `.cas`/`.dsk` file inside the root.  
- Use the MSX BIOS bundle (BlueMSX/FMSX) when the ROM fails to boot.  
- Refer to the [generic support pages](/support) for further assistance.
