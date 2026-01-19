---
title: Updates and Rollback
description: This guide covers safe update habits and what to do if a new build causes
  issues.
---

# Updates and Rollback

This guide covers safe update habits and what to do if a new build causes issues.

## Before you update

- Read the release notes for your device family.
- Make a backup of `/userdata/` (saves, configs, BIOS, and ROMs).
- Ensure stable power; avoid updating on low battery.

## Update options

Use the in-system updater if it is available on your device. This is the safest path because it applies the correct build and preserves your data.

If you prefer a manual update, reflash the latest image for your device and restore your `/userdata/` backup afterward.

## After updating

- Check the system version in the settings or system info screen.
- Confirm that controllers, audio, and Wi-Fi work before loading large game libraries.
- If you use shaders or overlays, verify that they still load as expected.

## Rollback basics

If a new build causes problems, the most reliable rollback is:

1. Reflash the previous image for your device.
2. Restore your `/userdata/` backup.
3. Confirm the system boots and your saves are intact.

If you cannot access the UI, try a known-good SD card or USB drive first to confirm the issue is not hardware-specific.
