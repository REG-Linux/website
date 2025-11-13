# Allwinner Boards

REG Linux keeps a dedicated subtree `board/allwinner/` for everything that targets the
Allwinner SoCs the project supports. Each subfolder owns the boot scripts, DTBs, and helper
assets that make REG Linux images bootable on those devices.

## Allwinner H3

`board/allwinner/h3/` is home to the H2+/H3 Cortex-A7 platforms (Banana Pi M2 Zero, Capcom Home Arcade, Orange Pi One/PC/PC Plus/Plus 2E).
The shared helpers copy the right DTB, kernel, and update bundles into the boot partition and provide the Capcom-specific
overlays when that variant is built.

Supported devices:

* `bananapi-m2-zero` (`sun8i-h2-plus-bananapi-m2-zero`)
* `cha` (Capcom Home Arcade)
* `orangepi-one`
* `orangepi-pc`
* `orangepi-pc-plus`
* `orangepi-plus2e`

## Allwinner H5

`board/allwinner/h5/` targets the Orange Pi PC2 and Libretech Tritium H5 platforms. Each directory delivers
the DTB, SPL, and post-image script that `make` needs to stage the REG Linux payloads, and `genimage` packages a
2 GiB boot + 256 MiB userdata image with the SPL at 8 KiB.

Supported devices:

* `orangepi-pc2` (`sun50i-h5-orangepi-pc2`)
* `tritium-h5` (`sun50i-h5-libretech-all-h3-cc`)

## Allwinner H6

`board/allwinner/h6/` contains Orange Pi 3, Orange Pi 3 LTS, and Orange Pi One Plus support. Each subfolder stages its boot artifacts
before `genimage` packages the familiar FAT32/EXT4 layout.

Supported devices:

* `orangepi-3` (`sun50i-h6-orangepi-3`)
* `orangepi-3-lts` (`sun50i-h6-orangepi-3-lts`)
* `orangepi-one-plus` (`sun50i-h6-orangepi-one-plus`)

## Allwinner H616 / H618

`board/allwinner/h616/` and `board/allwinner/linux_patches/` cover the H616 and H618 silicon in the Orange Pi Zero2 family, Banana Pi M4 Berry, and X96 Mate.
Every board follows the same workflow: build U-Boot, stage `/boot`, and run `genimage` with the 2 GiB/256 MiB scheme.

Supported devices:

* `bananapi-m4-berry` (`sun50i-h618-bananapi-m4berry`)
* `orangepi-zero2` (`sun50i-h616-orangepi-zero2`)
* `orangepi-zero2w` (`sun50i-h618-orangepi-zero2w`)
* `orangepi-zero3` (`sun50i-h618-orangepi-zero3`)
* `x96-mate` (`sun50i-h616-x96-mate`)

## Allwinner H700 (Anbernic handhelds)

`board/allwinner/h700/` is dedicated to Anbernic’s H700 handhelds (RG35XX series, RG40XX, RG34XX, RG28XX, and RGCubeXX).
The single `anbernic-h700` folder delivers every DTB and boot script needed across these variants, with a common `fsoverlay/`, `dracut.conf`, and `kernel-firmware.txt`.

Supported devices:

* `anbernic-rg35xx-2024` (+ Rev6 panel)
* `anbernic-rg35xx-h` (+ Rev6 panel)
* `anbernic-rg35xx-plus` (+ Rev6 panel)
* `anbernic-rg35xx-sp` / `-sp-v2-panel`
* `anbernic-rg35xx-pro`
* `anbernic-rg40xx-h` / `-v`
* `anbernic-rg34xx` / `-sp`
* `anbernic-rg28xx`
* `anbernic-rgcubexx`

Keep this page synced with the repo so contributors can quickly locate the folder for each Allwinner platform.
