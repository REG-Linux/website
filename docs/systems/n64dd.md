# Nintendo 64 Disk Drive

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/n64dd.webp" alt="Nintendo 64 Disk Drive icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/n64dd.png" alt="Nintendo 64 Disk Drive logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Overview

The Nintendo 64DD is the magneto-optical accessory released in 1999 that brings disk-based storage and Randnet-backed services to the base console.

### Quick reference

* **ROM folder:** `/userdata/roms/n64dd`
* **Accepted ROM formats:** `.ndd`, `.z64.ndd`, `.zip`, `.7z`
* **Emulator:** `libretro: mupen64plus-next`
* **Special options:** enable `global.mupen64-dd` and keep the 64DD IPL alongside the standard IPL

## Technical specifications

- CPU: Same NEC VR4300 93.75 MHz core as the Nintendo 64 with additional disk interfacing logic.
- Memory: Shares the N64's 4 MB RAM plus a 36 MB ROM module and 64 MB magnetic disk storage; Randnet modem adds 28.8 kbps connectivity.
- Display: Identical SGI RCP pipeline with extra DMA buffers for streaming FMV from disk.
- Sound: Uses the standard N64 audio subsystem with extra DMA paths for CD-quality disk audio playback.

## ROMs

Keep `.ndd` or `.z64.ndd` archives zipped inside `/userdata/roms/n64dd`. Each disc image references `.pak0.pak`
files stored inside the archive, so do not extract them. Use EmulationStation’s `[SELECT]` → **Advanced System Options** to
confirm that `global.mupen64-dd` is enabled prior to launching a title.

## BIOS

The 64DD requires both the standard N64 IPL and the Dynamic Disk IPL. Place the Dynamic Disk IPL as `bios/64dd_IPL.bin`
alongside your regular N64 BIOS bundle; Mupen64Plus-Next will mount it automatically when a disk-based game loads.

## Emulators

### RetroArch

`libretro: mupen64plus-next` is the only core that boots Disk Drive content. When launching a DD title, select that core,
confirm that `global.mupen64-dd` is `On`, and let RetroArch mount the `.ndd` archive as if it were in the peripheral.

#### libretro: mupen64plus-next

This core handles both cartridge and disk titles. Enable `global.mupen64-dd` for disk simulation, keep the proper BIOS files in
`/userdata/bios`, and rely on the Quick Menu for video overrides or controller mappings.

## Troubleshooting

If a DD title refuses to boot:

1. Verify the `.ndd` file is zipped (DON’T extract) and uses the correct MAME ID/name.
2. Ensure `global.mupen64-dd` is enabled in the advanced options.
3. Confirm both IPL BIOS files are present under `/userdata/bios`.

For further assistance, consult the [generic support pages](/support).
