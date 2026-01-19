---
title: PlayStation Vita
description: PlayStation Vita documentation for REG Linux.
---

# PlayStation Vita

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/psvita.webp" alt="PlayStation Vita icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/psvita.png" alt="PlayStation Vita logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2012 by Sony, the PlayStation Vita was a portable system.
Vita3K is the experimental PS Vita emulator included with REG-Linux v36+. It targets x86_64 machines and requires decrypted firmware components; compatibility is limited and depends on ongoing development.

## Technical specifications

- CPU: ARM Cortex-A9 MPCore quad-core main processor paired with a dual-core PowerVR SGX543MP4+ GPU.
- Memory: 512 MB RAM for the system and 128 MB VRAM dedicated to graphics.
- Display: 5-inch OLED (later LCD) touchscreen at 960×544 with multi-touch support.
- Sound: Dual stereo speakers plus a headphone jack with multi-channel PCM/audio effects.

### Quick reference

- **ROM folder:** `/userdata/roms/psvita`
- **Accepted formats:** `.psvita` launchers, `.zip` Mai dump archives
- **Emulator:** Vita3K
- **System group:** `psvita`

## BIOS / system modules

Copy the official PS Vita firmware (`PSP2UPDAT.PUP`) and the font firmware package into `/userdata/bios/psvita/`. Run `vita3k-emu-config` from `[F1]` → **Applications**, follow the setup wizard (accept defaults), and install both `.PUP` files via **File → Install Firmware**. Create an account and enable automatic login for the smoothest experience.

## ROMs

Mai dump ZIPs are the only confirmed playable files. Install each archive through Vita3K’s **File → Install archive** menu; the emulator unpacks the data into `/userdata/saves/psvita/ux0/app/<TITLEID>/`. After installation, create a `.psvita` launcher in `/userdata/roms/psvita/<Title>[<TITLEID>].psvita` (e.g., `Street Fighter X Tekken (USA) [PCSE00005].psvita`). The `.psvita` file can be empty—its filename carries the metadata and tells EmulationStation what to launch.

## Emulators

### Vita3K

Vita3K is the only supported PS Vita emulator. It demands a Vulkan 1.3+ GPU and an x86_64 CPU. Use the `vita3k-emu-config` tool (found under `[F1]` → **Applications**) to finish the wizard, install firmware, and adjust the basics.

Key frontend options:

- `psvita.vita3k_gfxbackend`: switch between OpenGL or Vulkan (use Vulkan when available).
- `psvita.vita3k_resolution`: scale the render resolution (1x–8x).
- `psvita.vita3k_fxaa`: toggle FXAA.
- `psvita.vita3k_vsync`: enable to combat tearing (enabled by default).

## Controls

Vita3K maps the PS Vita/ DualShock layout onto your controller. Use the PSP overlay (`../images/controller-overlays/psp-1.png`) as a reference, and remap buttons via `[HOTKEY]` + south or the remapping guide if something behaves oddly.

## Troubleshooting

- Vita3K is experimental—expect instability, crashes, and missing audio. Check the [Vita3K quick start guide](https://vita3k.org/quickstart.html) and compatibility list before playing.
- Ensure system modules live under `/userdata/system/configs/shadps4/user/sys_modules` if required (decrypted modules from a jailbroken Vita).
- The generic support pages cover general emulator issues.
