# Radxa Rock 5A

Radxa Rock 5A pairs the Rockchip RK3588 SoC with the REG Linux stack for a polished retro console. pairs the Rockchip RK3588 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Radxa

- **SoC**: Rockchip RK3588

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | Radxa |

| SoC | Rockchip RK3588 |

| Image availability | Download the latest build from the REG Linux downloads hub (Radxa section). |

## Installation notes

1. Grab the image. Download the latest Radxa Rock 5A build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Radxa Rock 5A, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Board family guidance

### What to keep in mind

- REG Linux keeps per-SoC trees (RK3128, RK3288, RK3326, RK3328, RK3399, RK3568, RK3588) with targeted kernel versions, overlays, and DTBs that stage scripts and update blobs before `genimage` packages the image.

- Highlights cover Linux 6.10 for RK3128, 6.6 for RK3288, 6.12 for RK3326, and 6.1+ for RK3588, along with overlay helpers for temperature, ALSA cards, and Moonlight/GPU patches.

- Helpful reminders remind maintainers to run each `create-boot-script.sh`, sync `linux-defconfig`/`linux_patches`, refresh overlays, and document new board layouts.

### Learn more

Drill into the wiki board entry for scripts, overlays, and developer reminders.

## Resources

- REG Linux download page: https://reglinux.org/download/radxa-rock-5a/

- Official REG Linux board page: https://reglinux.org/board/radxa-rock-5a
