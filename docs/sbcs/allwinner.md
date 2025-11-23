# Allwinner Boards

REG Linux supports a wide range of Allwinner-based devices.

## Allwinner H2+/H3

Allwinner H2+/H3 Cortex-A7 platforms (Banana Pi M2 Zero, Capcom Home Arcade, Orange Pi One/PC/PC Plus/Plus 2E).

Supported devices:

* `bananapi-m2-zero` (`sun8i-h2-plus-bananapi-m2-zero`)
* `cha` (Capcom Home Arcade)
* `orangepi-one`
* `orangepi-pc`
* `orangepi-pc-plus`
* `orangepi-plus2e`

## Allwinner H5

Orange Pi PC2 and Libretech Tritium H5 devices are supported.

Supported devices:

* `orangepi-pc2` (`sun50i-h5-orangepi-pc2`)
* `tritium-h5` (`sun50i-h5-libretech-all-h3-cc`)

## Allwinner H6

Orange Pi 3, Orange Pi 3 LTS, and Orange Pi One Plus are supported.

Supported devices:

* `orangepi-3` (`sun50i-h6-orangepi-3`)
* `orangepi-3-lts` (`sun50i-h6-orangepi-3-lts`)
* `orangepi-one-plus` (`sun50i-h6-orangepi-one-plus`)

## Allwinner H616 / H618

Orange Pi Zero2 and Orange Pi Zero3 families are supported.
There is also support for Banana Pi M4 Berry and X96 Mate TV Box.

Supported devices:

* `bananapi-m4-berry` (`sun50i-h618-bananapi-m4berry`)
* `orangepi-zero2` (`sun50i-h616-orangepi-zero2`)
* `orangepi-zero2w` (`sun50i-h618-orangepi-zero2w`)
* `orangepi-zero3` (`sun50i-h618-orangepi-zero3`)
* `x96-mate` (`sun50i-h616-x96-mate`)

## Allwinner H700 (Anbernic handhelds)

Most if not all Anbernic’s H700 handhelds are supported, including those series : RG35XX, RG40XX, RG34XX, RG28XX, and RGCubeXX.
Beware there is currently no device detection, you need to manually edit DTB after burning the image to match your exact device.
This might change in the future if a reliable way of detecting devices is found.

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