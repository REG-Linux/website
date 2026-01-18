# Sega Chihiro

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/chihiro.webp" alt="Sega Chihiro icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/chihiro.png" alt="Sega Chihiro logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Sega Chihiro arcade board is essentially a custom Xbox designed by Sega and Microsoft in 2002 to follow up the Dreamcast hardware. It runs a Pentium III (733 MHz) and the Nvidia NV2A GPU found in the original Xbox, plus AC'97 audio—the same components that make the Xbox a PC-like console. REG-Linux exposes Chihiro games via the `chihiro` system group so themes can show the dedicated artwork set while you launch arcade titles like *Ghost Squad*, *OutRun 2* and *Virtual Cop 3*.

## Technical specifications

- CPU: Intel Pentium III (Coppermine) at 733 MHz
- RAM: 64 MB + onboard graphics RAM (similar to Xbox)
- Graphics: Nvidia NV2A (GeForce 3 class) for 640×480/720×480 output with transform & lighting
- Sound: AC'97 controller matching the original Xbox audio pipeline

## Supported ROM extensions

- `.iso` (Xbox/XISO format)

## Quick reference

- **Emulator:** xemu
- **ROM folder:** `/userdata/roms/chihiro`
- **Accepted formats:** `.iso` (provided in Xbox XISO layout)

## BIOS

The Chihiro firmware is shared with the original Xbox, so xemu requires the same BIOS files plus the Cerbios flash image you find on official guides. Put these files in `bios/`:

| MD5 checksum | Share file path | Description |
| --- | --- | --- |
| `d49c52a4102f6df7bcf8d0617ac475ed` | `bios/mcpx_1.0.bin` | MCPX boot ROM (Xbox) |
| `39cee882148a87f93cb440b99dde3ceb` | `bios/Complex_4627.bin` | Flash ROM image (Xbox) |
| `<latest>` (varies) | `bios/cerbios.bin` | Cerbios flash ROM for Chihiro (see xemu docs)

Use the version recommended by xemu’s documentation; many modern Cerbios images target the udma flash ROM and are compatible with the supported games.

## ROMs

Put Chihiro/Xbox game ISOs under `/userdata/roms/chihiro`. The images must be in XISO format (the game partition only). If you only have a full disc image or folders of extracted files, use `extract-xiso` to rebuild an XISO suitable for xemu.

## Emulators

### xemu

[xemu](https://xemu.app/) is an open-source Xbox emulator that doubles as the Chihiro driver by sharing the same hardware base. It uses the same BIOS files and disc formats described above.

Open xemu’s **Docs** section for the latest extraction tools and recommended command lines. REG-Linux surfaces xemu through the `xemu` entry in the emulator list, exposing standard features such as `xbox.videomode`, `xbox.decoration`, `xbox.padtokeyboard` and shared shader/overlay settings.

## Controls

Chihiro games rely on standard Xbox controls plus arcade peripherals (lightguns, steering wheels). The default mapping appears on the REG-Linux Retropad so typical Pad buttons match Xbox inputs and allow you to trigger lightgun/triggers for supported titles.

## Troubleshooting

- Ensure `/userdata/roms/chihiro` only contains XISO-format ISOs stripped of the standard Xbox header; use `extract-xiso` if necessary.
- Confirm the BIOS files (`mcpx_1.0.bin`, `Complex_4627.bin`) and Cerbios image are present under `bios/` and match the values recommended by xemu.
- Games requiring optional hardware (gun, wheel) may need additional configuration inside xemu’s menu; check the emulator docs for hooking up peripherals.
