# Rockchip Boards

# Rockchip Boards

REG Linux packages Rockchip support across multiple SoC families; each board tree brings its own `create-boot-script.sh`, `genimage.cfg`, DTBs, overlays, and kernel/patch fragments, while shared directories (`fsoverlay/`, `linux-defconfig*.config`, `linux_patches/`, `patches/`) provide the common wiring between them.

## Supported devices
- `rk3128` (Powkiddy A12/A13, PS5000/PS7000, WX8, FirePrime, XPI hardware)
- `rk3288` (MiQi, Tinker Board S)
- `rk3326` (Odroid Go2/Go3, GameForce Chi, Batlexp G350, Anbernic RG351 series)
- `rk3328` (Renegade, ROCK64)
- `rk3399` (`anbernic-rg552`, `hugsun-x99`, `nanopi-m4v2`, `orangepi-4-lts`, `orangepi-800`, `rock960`, `rock-pi-4`, `rockpro64`, `tinkerboard2`)
- `rk3568` (Anbernic RGxx3, Firefly Station M2/P2, Odroid M1/M1s, Rock 3A/3C)
- `rk3588` (`bananapi-m7`, `firefly-station-m3`, `gameforce-ace`, `indiedroid-nova`, `khadas-edge-2`, `mekotronics-r58`, `orangepi-5`, `orangepi-5b`, `orangepi-5-plus`, `quartzpro64`, `rock-5a`, `rock-5b`, `rock-5c`)

## RK3128 (WIP)

* Linux 6.10.0-rc2 with `linux-defconfig.frag` tweaks, patched DTS fragments, and UART-only boots (no display stack yet).
* Overlay adds udev/governor helpers, PipeWire hooks, and board-specific scripts copied by `create-boot-script.sh`.
* Board scripts stage `Image`, `initrd`, DTBs, and `extlinux.conf` entries before `genimage` packages a limited `reglinux.img`.
* Treat this tree as experimental until display drivers are wired up.

## RK3288

* Linux 6.6.40 with `CONFIG_LOCALVERSION=-reglinux` plus patches for SDMMC/SPI pinctrls, Broadcom/Realtek wireless, V4L2, Moonlight/libretro, and RK3288 display adjustments.
* MiQi and Tinker Board S directories provide `create-boot-script.sh`, `genimage.cfg`, and `boot/extlinux.conf` pointing to `rk3288-miqi.dtb`, `rk3288-tinker.dtb`, or `rk3288-tinker-s.dtb`.
* `fsoverlay/` installs temperature helpers and ALSA card configs; `patches/` holds downstream tweaks such as `bluez5_utils` and `moonlight-embedded`.
* Board scripts ensure the Rockchip bootloaders (`uboot-multiboard/.../u-boot-rockchip.bin`) and DTBs land in `REGLINUX_BINARIES_DIR`.

## RK3326

* Targets handhelds like Odroid Go2/Go3, GameForce Chi, Batlexp G350, and Anbernic RG351 series with Linux 6.12.30.
* `linux-rk3326-defconfig.config` plus patch set cover DT offsets, governor tuning, RK817 battery/RTC, USB bandwidth, joypad quirks, and Sinden helpers.
* Overlay drops governor/LED helpers; board scripts stage `rk3326-*.dtb`, `boot.ini`, `boot.batlexp-g350.ini`, and update blobs before `genimage` assembles the boot, userdata, and `reglinux.img` container.
* Keep `patches/alsa-ucm-conf` and `ppsspp` adjustments in sync whenever the ConfigGen packaging changes.

## RK3328

* Support for Renegade and ROCK64 with Linux `linux-rk3328-defconfig.config`.
* `renegade/` and `rock64/` directories stage the proper DTB (`rk3328-roc-cc.dtb`, `rk3328-rock64.dtb`), `extlinux.conf`, `uboot-multiboard/.../u-boot-rockchip.bin`, and update blobs before `genimage`.
* Overlay adds `cputemp`/`gputemp` helpers and ALSA card definitions; `patches/` reserved for board-specific fixes.

## RK3399

* Boards such as `anbernic-rg552`, `hugsun-x99`, `nanopi-m4v2`, `orangepi-4-lts`, `orangepi-800`, `rock960`, `rock-pi-4`, `rockpro64`, and `tinkerboard2`.
* Shared `linux-defconfig.config`, `linux_patches/`, `dts/`, and `fsoverlay/` provide kernel flags, patch queues, DTB sources, fan/audio helpers, ALSA cards, and firmware blobs.
* Board directories ship `create-boot-script.sh`, `extlinux.conf`, and `genimage.cfg`; `create-boot-script.sh` wraps `boot.scr` creation and `genimage` produces SD/eMMC images per layout expectations.
* `patches/` maintains ATF, libdrm, Moonlight, PPSSPP, and other application patches.

## RK3568

* Covers Anbernic RGxx3, Firefly Station M2/P2, Odroid M1/M1s, and Rock 3A/3C.
* Boards either run `build-uboot.sh` (building U-Boot 2025.01 + patches) or copy prebuilt `idbloader.img`/`uboot.img`.
* Shared overlay provides `cputemp`, `gputemp`, and ALSA cards; kernel config plus patches tune RK817, single-ADC joypads, and USB/Sinden caps.
* Board scripts stage kernel/initrd/rootfs, DTBs, boot scripts, and boot logos before `genimage` generates the final image.
* RG353-like Android boards require the stock installation wiped before REG Linux can boot.

## RK3588

* Boards include `bananapi-m7`, `firefly-station-m3`, `gameforce-ace`, `indiedroid-nova`, `khadas-edge-2`, `mekotronics-r58`, `orangepi-5`, `orangepi-5b`, `orangepi-5-plus`, `quartzpro64`, `rock-5a`, `rock-5b`, `rock-5c`.
* Linux 6.1.118 with `CONFIG_LOCALVERSION=-reglinux`, RK3588-specific patches, `dts/`, `patches/`, and overlays for fan/audio helpers, Bluetooth, and Mali firmware.
* Boards either build U-Boot in-tree or expect prebuilt binaries; `genimage.cfg` produces a 3 GiB FAT32 boot partition + userdata ext4 while embedding `u-boot-rockchip.bin` into the GPT image.

## Helpful reminders

1. Always run the board’s `create-boot-script.sh` with `HOST_DIR … REGLINUX_BINARIES_DIR` so the kernel, modules, DTBs, overlay files, and `extlinux.conf`/bootloader artifacts land where `genimage` expects them.
2. Keep each SoC’s `linux-defconfig*.config` and `linux_patches/` series synchronized with the compiled kernel; the build assumes those patches are applied in order.
3. `fsoverlay/` injects helper scripts, ALSA cards, firmware blobs, fan controls, and other runtime tweaks—update it before building if the defaults need to change.
4. When adding a new board, copy a reference directory, adjust `genimage.cfg`, bootloader entries, and DTB names, and document the layout so contributors can understand the flow.
