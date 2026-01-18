# Xbox 360

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/xbox360.webp" alt="Xbox 360 icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/wiki/assets/systems/logos/xbox360.png" alt="Xbox 360 logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Xbox 360 continues Microsoft’s PC-inspired console lineage. REG-Linux exposes its `xbox360` group and relies on the xenia and xenia-canary builds so the most compatible titles launch with up-to-date fixes when they exist.

## Technical specifications

- CPU: Custom 3.2 GHz triple-core PowerPC-based Xenon processor with one core disabled and one geared for system functions.
- Memory: 512 MB of GDDR3 RAM clocked at 700 MHz shared between CPU and ATI Xenos GPU (10 MB eDRAM for framebuffer).
- Display: ATI Xenos GPU with unified shader architecture, capable of 720p/1080p rendering and embedded tessellation hardware.
- Sound: Custom 5.1 surround audio engine with Dolby Digital Live and DTS support plus PCM mixing for headset output.

### Quick reference

- **ROM folder:** `/userdata/roms/xbox360`
- **Accepted formats:** `.iso`, `.xex`, `.xbox360`
- **Emulators:** `xenia`, `xenia-canary`
- **System group:** `xbox360`

## BIOS

No external BIOS files are required for xenia’s public builds.

## ROMs

Place Xbox 360 disc images inside `/userdata/roms/xbox360`. Standard `.iso` files work when ripped with the Xbox 360 game dumping tools.

### Digital installs and Xbox Live Arcade

If you have a directory that represents a ripped installation or a digital purchase, create a `.xbox360` playlist file whose name matches the title and whose contents point to the actual `.iso`, `.xex`, or folder name. Keep the folder structure intact when launching the title. This format mirrors what the official console writes and allows xenia to mount the correct container.

## Saves

Save data for xenia is stored under `/userdata/saves/xenia-bottle/xenia/content/########`. Older titles prompt for a new save profile and may require mouse clicks inside xenia to accept prompts.

## Emulators

### xenia

Xenia is the experimental research emulator bundled with REG-Linux. It exposes `xbox360.videomode` under the RetroArch-style options so you can enforce render scaling or swap aspect ratios.

### xenia-canary

The canary build chases the latest fixes and exposes the same configuration keys as xenia. Use it if a title is known to work there but not on the stable branch.

## Controls

The overlay illustrates the Xbox 360 controller layout. The retired `xbox360.videomode` option is all that the emulator exposes, so rely on the Quick Menu if you need additional remapping.

## Troubleshooting

- Check [xenia’s compatibility list](https://github.com/xenia-project/game-compatibility/issues) before spending time ripping a title; many games still fail.
- When a digital install won’t start, ensure the `.xbox360` playlist matches the folder name exactly and omits extra dots.
- See xenia’s own [FAQ](https://github.com/xenia-project/xenia/wiki/faq) or the generic support pages for general problems.
