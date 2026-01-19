# PlayStation 4

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/ps4.webp" alt="PlayStation 4 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/ps4.png" alt="PlayStation 4 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

Introduced in 2013 by Sony, the PlayStation 4 was a console system.
ShadPS4 is the experimental PlayStation 4 emulator included in REG-Linux. It demands a 64-bit CPU with AVX2 and a Vulkan 1.3+ GPU, and it only works on systems that can provide the decrypted firmware modules from a jailbroken PS4.

## Technical specifications

- CPU: Custom AMD “Jaguar” 8-core x86-64 CPU running up to 1.6 GHz (later revisions 1.84 GHz).
- Memory: 8 GB of unified GDDR5 with 176 GB/s bandwidth shared between CPU and GPU.
- Display: Custom AMD Radeon-based GPU delivering 1.84 TFLOPS with support for 1080p/4K rendering and hardware geometry/tessellation.
- Sound: Custom AMD audio engine with 64-channel PCM mixing and support for Dolby Atmos/DTS:X formats.

### Quick reference

- **ROM folder:** `/userdata/roms/ps4`
- **Accepted formats:** `.ps4` (folder or placeholder file)
- **Emulator:** ShadPS4
- **System group:** `ps4`

## ROMs

1. Install the `.pkg` packages via `rpcs3-config`–style tools inside the ShadPS4 interface; the extracted data lands in `/userdata/system/configs/shadps4/`.
2. Create an empty `.ps4` launcher (e.g., `/userdata/roms/ps4/CUSA03173/Bloodborne.ps4`). The filename is what EmulationStation uses to display the entry.
3. Copy DLC into `/userdata/roms/ps4/DLC`.

RPCS4 reads the `.ps4` placeholder and redirects to the installed files; the game folder needs only the metadata filename.

## System modules

ShadPS4 requires decrypted system module files extracted from a jailbroken PS4. Place them in `/userdata/system/configs/shadps4/user/sys_modules`. The emulator log reports any missing modules when a game refuses to boot.

## Emulators

### ShadPS4

ShadPS4 is the lone option for PS4 content. It runs only on x86_64 machines with Vulkan drivers. Check the [compatibility list](https://shadps4.net/compatibility/) before loading a title because the emulator is still in early development.

## Controls

The emulator mimics the DualShock 4 layout, so the REG-Linux PSX/PS2 overlay (`../images/controller-overlays/psx-1.png`) already applies.

## Troubleshooting

- Expect early-stage behaviour: missing audio, crashes, or incomplete features are common.
- Make sure the `.ps4` launcher points to an installed game and that the system modules folder contains the decrypted binaries.
- Visit the generic support pages for help if the emulator keeps crashing.
