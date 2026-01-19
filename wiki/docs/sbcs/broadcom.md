---
title: Broadcom Boards
description: 'REG Linux builds for the Broadcom family (Raspberry Pi 1/2/3/4/5 and
  Compute Modules) reuse a consistent layout: each SoC directory provides kernel configs,...'
---

# Broadcom Boards

REG Linux builds for the Broadcom family (Raspberry Pi 1/2/3/4/5 and Compute Modules) reuse a consistent layout: each SoC directory provides kernel configs, overlays, `create-boot-script.sh`, `genimage.cfg`, DTBs, and patch bundles that stage `Image`, firmware, and updates before `genimage` writes the bootable image.

## Supported devices
- `bcm2711`: Raspberry Pi 4 / Compute Module 4 / Pi 400
- `bcm2712`: Raspberry Pi 5 / Pi 500
- `bcm2837`: Raspberry Pi 3 / Zero 2
- `bcm2836`: Raspberry Pi 2
- `bcm2835`: Raspberry Pi 1 / Zero

## Key layouts

### BCM2711 (Pi 4 / CM4 / Pi 400)

* Boot scripts stage `Image`, modules, firmware, initramfs, DTBs, and `boot/config.txt`/`cmdline.txt` tweaks (64-bit mode, DRM/KMS helpers, `elevator=deadline`, `rootwait`, `noswap`, etc.).
* `genimage.cfg` produces a 2 GiB `REGLINUX` FAT32 boot volume plus a 256 MiB `userdata` share partition.
* Overlay forces `snd_seq`, `i2c_dev`, and any helper files required by the board, while `patches/` keeps GroovyMAME, Libretro Yabause, and Sugarbox compatible with the DRM-only GPUs.
* Kernel configuration: `linux-broadcom64-current.config`.

### BCM2712 (Pi 5 / Pi 500)

* Board scripts stage the Pi 5 `uboot` blobs and install the `pironman5` overlay that sets HDMI/audio defaults.
* `fsoverlay/etc/modules.conf` ensures `snd_seq`/`i2c_dev` are loaded alongside firmware helpers.
* Board-specific patches in `patches/` keep GroovyMAME/Libretro/Sugarbox stable as the FPGA driver stack evolves.
* Kernel configuration: `linux-broadcom64-current.config`.

### BCM2837 (Pi 3 / Zero 2)

* 64-bit builds enable `arm_64bit=1`, `drm_kms_helper`, and tune `cmdline.txt` with `fastboot`, `noswap`, and quiet branding.
* `create-boot-script.sh` copies firmware, DTBs, and update blobs before `genimage` packages the VFAT and userdata partitions.
* Overlay adds temperature helpers and ALSA cards, while `patches/` contains fixes for DuckStation, Moonlight, and other packages.

### BCM2836 (Pi 2)

* Matches Raspberry Pi 2 defaults but adds REG Linux overlays for VC4, DPI, and audio helper tweaks.
* Partition layout: 2 GiB boot + 256 MiB `SHARE` via `genimage.cfg`.
* Kernel configuration: `linux-broadcom32-current.config`.

### BCM2835 (Pi 1 / Zero)

* Legacy boot scripts stage `zImage`, DTBs, modules, and firmware into the FAT32 boot partition.
* `cmdline.txt` keeps `fastboot`, `quiet`, and `rootwait` plus simple audio/DRM tweaks.
* Overlay sustains ALSA/OpenAL helpers; `patches/` hosts optional fixes (e.g., `thextech` patch).
* Kernel configuration: `linux-broadcom32-current.config`.

## Build reminders

1. Update `genimage.cfg` when partition layouts change so the FAT32/`userdata` volumes reshape accordingly.
2. Edit the `fsoverlay/` trees for temperature scripts, ALSA cards, or helper binaries before rebuilding the image so the runtime defaults land where expected.
3. Keep `patches/` ordered via their numbered filenames to preserve the intended application order.
4. Document kernel config or overlay adjustments to help future contributors understand new firmware/bootloader expectations.