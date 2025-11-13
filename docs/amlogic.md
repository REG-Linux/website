# Amlogic Boards

All Amlogic-specific artifacts live under `board/amlogic/`. Each subfolder
delivers the boot scripts, DTBs, U-Boot helpers, and overlays needed to
build REG Linux images for a given SoC generation.

## Amlogic S812

Handles Meson8/Meson8m2 TV boxes such as Tronsmart MXIII/MXIII+, Minix Neo
X8, WeTek Core, and generic MXIII-family hardware. The support pack stages
`uImage`/`uInitrd`, U-Boot autoscripts, and the DTBs listed below so a single
SD image can boot many vendors.

Supported devices:

* `meson8m2-mxiii` / `meson8m2-mxiii-plus`
* `meson8m2-m8s` / `meson8m2-m8s-plus`
* `meson8m2-wetek-core`
* `meson8-minix-neo-x8`
* `meson8-tronsmart-s82`

## Amlogic A3 Gen2 (A311D2)

Targets the Khadas VIM4 family. The `khadas-vim4/` directory wraps the vendor
signed U-Boot, installs the Khadas kernel/initrd bundle, and stage the two
VIM4 DTBs (`kvim4` and `kvim4n`) plus the overlays/dracut recipe Khadas ships.

Supported devices:

* `khadas-vim4` (`kvim4`, `kvim4n`)

## Amlogic S905/S905X/S905D

Meson GXBB/GXL boards: Khadas VIM1, Libretech Le Potato (v1 & v2), Minix Neo U1,
NanoPi K2, Odroid C2, FunKey R1, and the generic TV-box image that bundles a
dozen S905 DTBs. Each board directory keeps its own `create-boot-script.sh`,
`genimage.cfg`, and optional `build-uboot.sh`, but they all share the rootfs
overlay/patch stack.

Supported devices:

* `fun-r1`
* `khadas-vim1`
* `lepotato`
* `lepotato-v2`
* `minix-neo-u1`
* `nanopi-k2`
* `odroid-c2`
* `p201`
* `s905-tvbox` (generic bundle of S905(G/X/D/W) DTBs)

## Amlogic S905 Gen2 (GXM/G12A)

Supports Khadas VIM2 and Radxa Zero. Each board has a `build-uboot.sh`, overlay,
and DTB + firmware overlay so the shared Gen2 pipeline can drop a `boot/extlinux.conf`
or Radxa-flavor layout.

Supported devices:

* `khadas-vim2`
* `radxa-zero`

## Amlogic S905 Gen3 (SM1 / S905X3)

Focused on Banana Pi M5, Khadas VIM3L, Odroid C4, and a generic TV-box image.
The pack stages SM1 DTBs plus the .ini/uEnv/AML scripts that let the vendor
boot chains choose the correct device tree at boot.

Supported devices:

* `bananapi-m5`
* `khadas-vim3l`
* `odroid-c4`
* `s905x3-tvbox` (bundle of Khadas/VIM3L/Odroid/X96 A95X DTBs)

## Amlogic S922X / A311D

This generation covers A73/A53 boards such as Khadas VIM3, Banana Pi M2S, Radxa Zero 2/Pro, Beelink GT-King (Pro), Odroid N2/N2+/N2L, and the Odroid Go Ultra handheld. Each folder stages the relevant DTB, U-Boot blob or `boot.ini`, and the firmware/updates before `genimage` packages the standard partitions.

Supported devices:

* `bananapi-m2s`
* `beelink-gtking`
* `beelink-gtking-pro`
* `khadas-vim3`
* `odroid-n2`
* `odroid-n2plus`
* `odroid-n2l`
* `odroid-go-ultra`
* `radxa-zero2pro`

## Amlogic S9 Gen4 (S905Y4 – Khadas VIM1S)

The Khadas VIM1S folder carries the signed VIM1S U-Boot blob, dracut recipe, and overlay tweaks required by Khadas’ Gen4 platform. The build simply copies the signed bootloader, puts the VIM1S DTB next to the kernel/initrd, and writes the Khadas-style `extlinux.conf`.

Supported devices:

* `khadas-vim1s` (`kvim1s`)

Link back to this summary whenever you touch `board/amlogic/` so the supported SoC/board matrix stays obvious.
