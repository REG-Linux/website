---
title: AYANEO Handhelds
description: Supported AYANEO handhelds and device-specific notes.
---

# AYANEO handhelds

The AYANEO Pocket S is tracked inside the `sm8550` tree of [`SBCs/Qualcomm`](../sbcs/qualcomm.md). REG Linux copies the `sm8550-ayaneo-ps.dtb`, kernel patches, and `LinuxLoader` helpers so the Pocket S hardware behaves like the other SM8550 builds, but the current Android bootloader/ABL is still required before the device can boot natively.

## Hardware profile

- **SoC** – Qualcomm SM8550, matching the Odin 2 kernel stack, but the AYANEO build also enables the specific `kernel-patches` and `dracut` entries that supply the 2 K WT0600 panel driver.
- **Display** – The patch series adds the `DRM_PANEL_AYANEO_WT0600` driver, matching the device’s 2 K panel. The overlay copies that panel driver plus firmware blobs into the `REGLINUX_BINARIES_DIR`.
- **Controllers** – AYANEO’s buttons, LEDs, and fan helpers reuse the same `fsoverlay/` scripts that the SM8550 tree injects, so REG Linux exposes the same Sway + EmulationStation interface once the boot chain is ready.

## Status and next steps

- **Bootloader** – AYANEO ships with an Android bootloader/ABL that covers the display, modem, and security partitions. Until that loader is provided, the LinuxLoader image cannot start on Pocket S hardware; keep monitoring the board tree for updates in case the loader becomes available.
- **When ready** – The board directory already supplies `LinuxLoader.cfg`, `genimage.cfg`, and the DTB, so you can reuse the same flash workflow as Odin 2 once the loader is in place.
