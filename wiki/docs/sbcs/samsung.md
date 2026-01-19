---
title: Samsung Boards
description: "The Samsung directory captures REG Linux support for the Exynos5422\
  \ SoC as used on the ODROID\u2011XU4."
---

# Samsung Boards

The Samsung directory captures REG Linux support for the Exynos5422 SoC as used on the ODROID‑XU4.

## Supported devices
- `odroidxu4` (Exynos5422)

## Layout highlights

* **Kernel configuration:** `linux-exynos5422-defconfig.config` exports the ARM kernel config (LZ4 compression, `REGLINUX` hostname, preemption enabled) that enables the vendor subsystems REG Linux relies on.
* **Kernel patches:** `linux_patches/` contains numbered fixes for hardware quirks, HID tweaks, voltage/temperature handling, DRM/V4L2 updates, and IOMMU/PM domains needed for ODROID stability.
* **Boot image:** `odroidxu4/create-boot-script.sh` copies `zImage`, DTBs, initramfs, modules, firmware, rescue data, and U-Boot binaries into the boot tree. `odroidxu4/genimage.cfg` assembles `reglinux.img` with HardKernel BL1/BL2/TZ/U-Boot blobs plus FAT32 boot and userdata partitions. `boot/extlinux.conf` supplies the kernel command line (`console=ttySAC2,115200`, `initrd=initrd.lz4`, etc.).
* **Filesystem overlay:** `odroidxu4/fsoverlay/etc` installs `asound.conf` to fix ALSA routing and `init.d/S02fan` to actuate PWM fan speeds from the thermal sensors.
* **Software patches:** `odroidxu4/patches/` tweaks Sugarbox and SwitchRes for ODROID, while `patches/uboot/` adds the board’s defconfig and string adjustments to U-Boot.

## Integration tips

1. Apply the kernel patches before building Linux and package the exported config so the REG Linux tree matches the live image.
2. Build U-Boot with the HardKernel `odroid-xu4_defconfig` (or use provided binaries) to enable the board’s firmware layout.
3. Run `create-boot-script.sh` after the build to stage artifacts, then feed `genimage` the `odroidxu4/genimage.cfg` to regenerate `reglinux.img`.
4. Update the overlay, bootloader, or patch documentation whenever overlays, cmdlines, or bootloader blobs change so future contributors follow the same workflow.
