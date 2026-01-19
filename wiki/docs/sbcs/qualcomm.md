# Qualcomm Boards

The Qualcomm tree collects the kernel, dracut, firmware, and image recipes that power Snapdragon handhelds. Each SoC directory exposes shared firmware/patch stacks plus per-board helpers (`create-boot-script.sh`, `genimage.cfg`, loader configs, DTBs) so the build scripts can stage the final `reglinux.img`.

## Supported devices
- `sm8250`: Retroid RP5, RP Flip 2, RP Mini
- `sm8550`: AYN Odin2, Odin2 Portal, AYANEO Pocket S
- `qcs6490`: Radxa Dragon Q6A
- (directories such as `sd845/` and `sm6115/` exist but currently lack dedicated README guides; inspect them directly when needed)

## QCS6490 – Radxa Dragon Q6A

* Board support follows the Qualcomm build pattern with device-specific DTBs and bootloader configs staged by per-board helpers.
* Use the QCS6490-targeted image for Dragon Q6A to ensure the right firmware and DTB are deployed.

## SM8250 – Retroid Pocket family

* **Dracut/firmware:** `dracut.conf` disables systemd, limits modules, and includes Qualcomm/ath11k/RTL firmware from `kernel-firmware.txt`. `fsoverlay/` adds fan/brcm helpers, deterministic Bluetooth MAC tooling, and Retroid-specific udev rules.
* **Kernel stack:** `linux_sm8250-defconfig.config` plus `linux_patches/` keep the Adreno 650, DTBs, power/audio, and GPU tweaks aligned with the shipped kernel.
* **Packages:** `patches/` holds ALSA profile updates, GroovyMAME tweaks, PipeWire buffer bumps, Vita3K hash compat fixes, and any other board-specific adjustments.
* **Board layout:** Each subdirectory (`rp5/`, `rpflip2/`, `rpmini/`) copies `Image`, `initrd`, `reglinux.update`, modules, firmware/rescue blobs, and the board DTB into `${REGLINUX_BINARIES_DIR}/boot/boot`, installs the EFI payload (`grub.cfg` with `fbcon=rotate:3`, `console=ttyMSM0`, `clk_ignore_unused`, `pd_ignore_unused`), and relies on `genimage.cfg` to spray a 2 GiB `REGLINUX` FAT32 boot partition plus a 512 MiB `SHARE` userdata volume before concatenating them into `reglinux.img`.

## SM8550 – AYN Odin2 / Portal / AYANEO Pocket S

* **Dracut/firmware:** Mirrors the SM8250 layout—`dracut.conf`, `fsoverlay/`, and `kernel-firmware.txt` supply firmware blobs and runtime helpers (fan, Bluetooth, gamepad udev rules).
* **Kernel stack:** `linux_sm8550-defconfig.config` plus `linux_patches/` tune SM8550 DTBs, power rail handling, GPU tweaks, and other vendor fixes.
* **Packages:** `patches/` carries fixes for ALSA, PipeWire, GroovyMAME, and Vita3K akin to the SM8250 tree.
* **Board layout:** Each board directory (`odin2/`, `odin2portal/`, `pockets/`) provides:
  * `create-boot-script.sh` – stages kernel, initrd, DTB, firmware, modules, and rescue blobs into `REGLINUX_BINARIES_DIR/boot/boot` for LinuxLoader.
  * `genimage.cfg` – builds a 2 GiB `REGLINUX` FAT boot partition and a 512 MiB `userdata` ext4 partition, then wraps them into `reglinux.img`.
  * `LinuxLoader.cfg` – points LinuxLoader at the staged images and supplies board-specific flags such as `DisableDisplayHW`, portrait rotation, debug toggles, and volume button handling.
* **Device notes:**
  * **Odin2** boots with `qcs8550-ayn-odin2.dtb` and the standard `linux`/`initrd` combo.
  * **Odin2 Portal** reuses the Odin2 workflow but adds `fbcon=rotate:3`, `Debug=true`, and `qcs8550-ayn-odin2portal.dtb`.
  * **AYANEO Pocket S** supplies scripts and `sm8550-ayaneo-ps.dtb`, but it cannot boot because the Android bootloader/ABL is missing.

## Build reminders

1. Keep `dracut.conf`, `kernel-firmware.txt`, and `fsoverlay/` entries synchronized whenever firmware blobs, helper scripts, or udev rules change.
2. Apply kernel fixes through the numbered `linux_patches/` series so the REG Linux build respects module ordering.
3. Update `create-boot-script.sh`, `grub.cfg`/`LinuxLoader.cfg`, or `genimage.cfg` when kernel command lines, DTB names, or partition layouts evolve.
