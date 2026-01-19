---
title: Steam
description: Steam documentation for REG Linux.
---

# Steam

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/steam.webp" alt="Steam icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/steam.png" alt="Steam logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Steam runs through Flatpak on REG-Linux, offering access to Linux-native and Proton-powered Windows titles. The platform uses the `steam` metadata group so EmulationStation displays the Steam icon and launches Steam’s Flatpak shortcut.

## Technical specifications

- Manufacturer: Valve
- Platform tag: windows

### Quick reference

- **Launcher:** Steam Flatpak (`com.valvesoftware.Steam`)
- **Shortcut folder:** `/userdata/roms/steam` (contains `.desktop`-style entries)
- **Requirements:** x86_64 CPU, Vulkan-capable GPU, `/userdata` on Linux-native storage (ext4/btrfs preferred)
- **System group:** `steam`, `windows`

## Installation

Install Steam via Flatpak:

1. Run `flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo`.
2. Install `com.valvesoftware.Steam`.
3. Refresh EmulationStation to reveal the Steam entry (REG-Linux v40+). Launch it once to complete the first-time setup.

Alternatively, use the Flatpak Config tool (`[F1]` → **Applications** → `flatpak-config`) to add Flathub and install Steam via the GUI.

## Configuration

### Steam Play / Proton

Steam defaults to native Linux titles. To access Windows-only games:

1. Open **View → Settings → Steam Play**.
2. Enable **Steam Play for supported titles**.
3. Optionally enable **Steam Play for all other titles** and select a Proton version (community builds often offer better compatibility).
4. Use **Manage Game → Set Steam Play Options** per title when a specific Proton version is required.

### Big Picture Mode

Steam is best used through Big Picture Mode when playing on a couch. Enable **Start Steam in Big Picture Mode** under **Interface** and keep the resolution at 720p or higher to avoid menu glitches.

## ROMs & saves

Steam stores shortcuts inside `/userdata/roms/steam`. Game data installs under the Flatpak directories, and save games live inside `/userdata/saves/steam`.

- Linux-native games compile shader caches on first launch—expect longer load times initially.
- Windows games rely on Proton; consult [ProtonDB](https://www.protondb.com/explore) for compatibility tips.

## Controls

Steam can use Steam Input/Big Picture or custom controller mappings configured inside the client. Pair a controller through Steam’s settings and keep keyboard/mouse handy for the first launch.

## Troubleshooting

- **Steam fails to start from EmulationStation:** launch once manually from the command line to accept the Flatpak permissions.
- **Windows game crashes:** try a different Proton version via **Set Steam Play Options**.
- **DualSense/DualShock pads not detected:** use Steam’s controller settings to identify the pad as a generic controller or apply the PS4 workaround described in the Steam guide.
- **Flatpak install fails on NAS:** keep Flatpaks on internal storage if `/userdata` is network-mounted.

For additional help, consult the generic support pages.
