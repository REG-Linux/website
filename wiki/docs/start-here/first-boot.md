---
title: First Boot Checklist
description: Use this checklist the first time REG Linux boots on a new device. It
  is intentionally short, so you can finish setup fast and get to playing.
---

# First Boot Checklist

Use this checklist the first time REG Linux boots on a new device. It is intentionally short, so you can finish setup fast and get to playing.

## Before you power on

- Use the device-specific page in the [Devices](../devices/index.md) section to confirm any quirks or firmware notes.
- Make sure the image was flashed cleanly and the storage media is reliable.
- If you plan to use Wi-Fi, have your network name and password ready.

## During first boot

- Let the system finish its initial setup. The first boot can take longer while storage is prepared.
- Keep the device powered and avoid removing the storage media until you reach the main menu.
- When prompted, map a controller. If the prompt does not appear, see [Controller setup](../players/controller-setup.md).

## Quick setup tasks

- Set language, time zone, and regional format in the system settings.
- Connect to the network (Ethernet or Wi-Fi) so updates and metadata downloads can work.
- Confirm audio and display output are correct (volume, resolution, rotation).

## Add your content

- ROMs: copy to `/userdata/roms/` using USB, network share, or SSH.
- BIOS files: copy to `/userdata/bios/` as required by each system.
- If you are unsure which systems are supported, start with [Emulated systems](../systems/index.md).

## Next steps

- Run an update if a newer release is available: [Updates & rollback](updates-rollback.md).
- Browse engines and ports for non-console content: [Engines](../engines/index.md) and [Ports](../ports/index.md).
