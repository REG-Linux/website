# Amlogic Boards

REG-Linux supports a lot of Amlogic based devices.

## Amlogic S812

Handles Meson8/Meson8m2 TV boxes such as Tronsmart MXIII/MXIII+, Minix Neo
X8, WeTek Core, and generic MXIII-family hardware. 
The support can be a bit dodgy depending on your hardware and various clones.

Supported devices:

* `meson8m2-mxiii` / `meson8m2-mxiii-plus`
* `meson8m2-m8s` / `meson8m2-m8s-plus`
* `meson8m2-wetek-core`
* `meson8-minix-neo-x8`
* `meson8-tronsmart-s82`

## Amlogic S905/S905X/S905D

* Khadas VIM (also known as Khadas VIM1)
* Libretech Le Potato (v1 & v2)
* Minix Neo U1 (untested)
* NanoPi K2
* HardKernel ODROID C2
* FunKey R1 (untested)
* Generic TV-box image for boxes based on S905 / S905X that bundles a dozen S905 DTBs.

For TV-Box image, you will probably need to adjust your DTB to get your device working properly.

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

Supports Khadas VIM2 (even if technically it's S912 chipset) and Radxa Zero.

Supported devices:

* `khadas-vim2`
* `radxa-zero`

## Amlogic S905 Gen3 (SM1 / S905X3)

Focused on :
* Banana Pi M5
* Khadas VIM3L
* HardKernel ODROID C4
* Generic TV-box image including a bunch of SM1 DTBs to make your device work properly.
For TV-box devices, you need to adjust .ini/uEnv/AML scripts in order to have vendor
boot chains choose the correct device tree at boot.

Supported devices:

* `bananapi-m5`
* `khadas-vim3l`
* `odroid-c4`
* `s905x3-tvbox` (you will need to find the correct DTB and adjust boot scripts)

## Amlogic S922X / A311D

This covers boards such as :
*Khadas VIM3
* Banana Pi M2S
* Radxa Zero 2/Pro
* Beelink GT-King (Pro)
* HardKernel ODROID N2/N2+/N2L
* HardKernel ODROID GO Ultra handheld

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

## Amlogic A311D2

Targets the Khadas VIM4 devices.
Please note this uses a vendor 5.15 kernel we adjusted best-effort.

Supported devices:

* `khadas-vim4` (`kvim4`, `kvim4n`)

## Amlogic S9 Gen4 (S905Y4 – Khadas VIM1S)

Only known device on the market and supported is Khadas VIM1S.
This is using the same vendor 5.15 kernel adjusted best-effort.

Supported devices:

* `khadas-vim1s` (`kvim1s`)

Link back to this summary whenever you touch `board/amlogic/` so the supported SoC/board matrix stays obvious.
