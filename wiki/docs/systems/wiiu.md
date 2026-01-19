# Nintendo Wii U

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/wiki/assets/systems/icons/wiiu.webp" alt="Wii U icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:.75rem;"><img src="/wiki/assets/systems/logos/wiiu.png" alt="Wii U logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Wii U (2012) introduced a tablet-like GamePad alongside HD graphics. REG-Linux uses Cemu for Wii U titles and sorts them under the `wiiu` metadata tag so your theme reflects the proper iconography.

## Technical specifications

- CPU: Custom IBM “Espresso” tri-core CPU at 1.24 GHz with 1 MB L2 cache per core.
- Memory: 2 GB DDR3 system RAM plus 1 GB dedicated to GPU operations.
- Display: AMD Radeon-based “Latte” GPU supporting 1080p rendering and GamePad off-screen streaming.
- Sound: High-definition audio engine with 7.1-channel output and AAC/DTS passthrough.

### Quick reference

- **ROM folder:** `/userdata/roms/wiiu`
- **Accepted formats:** `.wup`, `.wud`, `.wux`, `.wua`, `.rpx`, `.squashfs`
- **Emulator:** [Cemu](https://cemu.info/)
- **System group:** `wiiu`, `windows`

## ROM handling

- `.wud` is the raw dump requiring valid keys (`prod.keys`, `title.keys`).
- `.wux` is a compressed `wud`; rename it to `.wud` if compatibility issues appear.
- `.wup` installers should be used only when you know how to extract them.
- `.wua` bundles base+update+DLC (Cemu 1.27+).
- Loadiine folders with `/code/*.rpx` files can live inside `/userdata/roms/wiiu/` and work as long as the structure matches.

## Keys & updates

Place `keys.txt` (download from the Cemu wiki) inside `/userdata/bios/cemu/`. Use `cemu-config` from the Applications menu to install DLC/updates (File → Install game update/DLC) and create shader caches inside `/userdata/system/configs/cemu/shaderCache/<titleid>/`.

## Emulator configuration

- Choose OpenGL or Vulkan as the graphics backend (Vulkan recommended).
- Use `cemu-config` → Edit graphic packs to download or enable texture packs and resolution hacks.
- Set `wiiu.controller_combination` for GamePad remapping or to emulate Wiimote + Nunchuk combos.
- After customizing, run `REG-Linux-save-overlay` to persist the settings.

## Controls

The default overlay reflects the GamePad layout shown in the repository. Use `[HOTKEY]` + south to open Cemu’s Quick Menu to adjust input mapping between GamePad, Wiimote, and Classic Controller modes.

## Troubleshooting

- Ensure `/userdata/bios/cemu/keys.txt` exists, contains the correct key list, and uses Unix line endings.
- If a title doesn’t launch, check the compatibility list on the [Cemu Wiki](https://wiki.cemu.info/wiki/Main_Page) and ensure shader cache files match the game ID.
- Kubernetes-style shader caches live in `/userdata/system/configs/cemu/graphicsPacks/<titleid>/`.
- Consult the generic support pages for additional assistance.
