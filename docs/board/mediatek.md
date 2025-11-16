# Mediatek Boards

`board/mediatek/mt8395/` hosts the REG Linux artifacts for the Radxa NIO 12L (Mediatek MT8395). The directory supplies the firmware overlay, kernel config/patches, board scripts, and flash layout that make the board bootable.

## Supported devices
- `radxa-nio-12l` (Mediatek MT8395)

## Layout highlights

* **Firmware overlay:** `fsoverlay/lib/firmware/mediatek/…` installs the wireless/Bluetooth firmware (MT7961, MT7668, MT8183/88/95) into `/lib/firmware`.
* **Kernel configuration:** `linux-defconfig.config` captures the Linux 6.15.0-rc2 options needed for the Mediatek SoC.
* **Kernel patches:** `linux_patches/000-REGLINUX-Radxa-NIO12L-Audio-Support-WIP.patch` wires HDMI audio into `mt8395-radxa-nio-12l.dts`.
* **ALSA patches:** `patches/alsa-ucm-conf/001-wip-mt8395-evk-sof.patch` provides the SOF UCM and HDMI jack definitions.
* **Radxa directory:** `radxa-nio-12l/` stores `boot/grub/grub.cfg`, the DTB, bootloader binaries (`lk.bin`, `fip-*.img`), `create-boot-script.sh`, and `genimage.cfg`. `create-boot-script.sh` stages the kernel, initrd, modules, firmware, rescue blobs, DTB, and bootloader artifacts into `${REGLINUX_BINARIES_DIR}` before `genimage` produces a GPT image with a 2 GiB FAT32 `REGLINUX` boot partition and a 256 MiB `SHARE` userdata slice.

## Integration notes

1. The board script copies kernel/initrd, modules, firmware, rescue blobs, DTBs, and bootloader artifacts into the staging tree before `genimage` runs.
2. `genimage.cfg` expects the staged tree at `TARGET_DIR` so it can copy files into `boot.vfat` and `userdata.ext4`.
3. Apply the `linux_patches` and `patches/alsa-ucm-conf` sequence when updating the MT8395 kernel/ALSA sources so downstream builds stay aligned.

## Maintainer hints

* Refresh the firmware under `fsoverlay/lib/firmware/mediatek/` only when Mediatek releases new blobs required by the drivers.
* Replace bootloader binaries in `radxa-nio-12l/bootloader/` and rerun the flashing scripts whenever they change.
* Keep the patch metadata synchronized with upstream kernels, SOF, or ALSA stacks when rebasing.
