---
title: Add a board
description: The files that make a REG Linux target and its images, and the order to bring a new device up.
---

# Add a board

A **target** is one build (one SoC family and toolchain), for example `a33`. A
target can produce several **images**, one per device or board (for example
`miyoo-a30` and `pocketgo-s30`). Adding a device to an existing target is much
less work than adding a target.

## The files

| File | Role |
|---|---|
| `package/system/reglinux-system/Config.in.targets` | declares `BR2_PACKAGE_SYSTEM_TARGET_<TARGET>` |
| `configs/reglinux-<target>.board` | the target's Buildroot configuration |
| `board/<vendor>/<soc>/` | everything specific to the SoC family: kernel config and patches, package patches, root overlay |
| `board/<vendor>/<soc>/<board>/` | one image: `create-boot-script.sh`, `genimage.cfg`, `boot/extlinux.conf`, boot loader build |
| `package/system/reglinux-system/sysconfigs/<target>/system.conf.<model>` | default settings for one device |

### `configs/reglinux-<target>.board`

Starts from two includes, a toolchain and the common system:

```
include toolchain-gcc14-musl.common      # or -glibc, gcc15, gcc16
include reglinux-board.common
```

then sets:

- the CPU (`BR2_arm`/`BR2_aarch64`, `BR2_cortex_*`…) and
  `BR2_PACKAGE_SYSTEM_TARGET_<TARGET>=y`;
- `BR2_GLOBAL_PATCH_DIR` (package patches, shared ones first) and
  `BR2_ROOTFS_OVERLAY`;
- the kernel: version, defconfig and fragments, `BR2_LINUX_KERNEL_PATCH`
  directories, and the device trees to build
  (`BR2_LINUX_KERNEL_INTREE_DTS_NAME`);
- `BR2_TARGET_REGLINUX_IMAGES`: the board folders to make images from, for
  example `"allwinner/a33/miyoo-a30 allwinner/a33/pocketgo-s30"`;
- the GPU, compositor and audio choices, as the other `.board` files do.

Copy the `.board` of the closest existing target and change what differs.

### `board/<vendor>/<soc>/<board>/`

- `create-boot-script.sh` copies the kernel, initrd, device trees, boot loader
  and `extlinux.conf` into the boot partition staging folder. It is called with
  `HOST_DIR BOARD_DIR BUILD_DIR BINARIES_DIR TARGET_DIR REGLINUX_BINARIES_DIR`;
  `BR2_CONFIG` is in its environment.
- `genimage.cfg` describes the card: the boot loader at the offset the boot ROM
  reads, a FAT `REGLINUX` boot partition and the ext4 `SHARE` partition
  (`/userdata`, grown on first boot).
- `boot/extlinux.conf` points at `/boot/linux`, the initrd and the device tree
  (`FDT`).

### Patches

- Kernel patches go in `board/<vendor>/<soc>/linux_patches/`, numbered, as
  `git format-patch` output with an author (`From:`) and `Signed-off-by:`.
  Patches taken from another project keep their author and carry a `Link:` to
  the source.
- Patches for a package go in `board/<vendor>/<soc>/patches/<package>/`.

### Device settings

`S001populate` picks `system.conf.<model>` from `sysconfigs/<target>/`, where
`<model>` is the device tree `model` (the DMI product name on PCs) with every
character other than letters and digits turned into `_`. For example
`system.conf.Miyoo_A30`. Use it for the screen rotation, the power key
behaviour, audio and similar defaults.

## Bring-up order

Prove each step on the device before the next one:

1. **Identify** the SoC variant, RAM type, PMIC, panel, input and Wi-Fi chips.
   Save the stock system's device tree and boot files before anything else.
2. **Boot loader** from the card, at the right offset, with the stock DRAM
   settings.
3. **Kernel + minimal device tree**: CPU, RAM, PMIC, SD card, and a USB network
   gadget for ssh.
4. **REG image** boots to `/userdata` and ssh.
5. **Display**, then **input**, **sound**, **battery and power off**, **Wi-Fi**,
   **sleep**.
6. **Package it**: patches with authors, device tree, `sysconfigs`, a
   `gamecontrollerdb` row for a built-in pad, and an image built with
   `DEBUG_BUILD=n` checked on the device.

Never write to the device's internal storage during bring-up: the stock system is
your reference and your way back.
