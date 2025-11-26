# HardKernel ODROID XU3/XU4

HardKernel ODROID XU3/XU4 pairs the Samsung Exynos 5422 SoC with the REG Linux stack for a polished retro console. pairs the Samsung Exynos 5422 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: HardKernel

- **SoC**: Samsung Exynos 5422

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | HardKernel |

| SoC | Samsung Exynos 5422 |

| Image availability | Download the latest build from the REG Linux downloads hub (HardKernel section). |

## Installation notes

1. Grab the image. Download the latest HardKernel ODROID XU3/XU4 build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your HardKernel ODROID XU3/XU4, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Board family guidance

### What to keep in mind

- Kernel configs (linux-exynos5422-defconfig) and patches tune LZ4 compression, REG Linux branding, preemption, and DRM/HID quirks for the ODROID platform.

- Board scripts stage zImage, DTBs, initrd, modules, firmware, rescue data, and U-Boot blobs before `genimage` creates FAT32 boot + userdata partitions with the proper `extlinux.conf` command line.

- Overlays install `asound.conf`, fan scripts, and patch sets for Sugarbox/SwitchRes; the integration tips remind maintainers to build U-Boot, stage artifacts, and document overlay/cmdline changes.

### Learn more

Drill into the wiki board entry for scripts, overlays, and developer reminders.

## Resources

- REG Linux download page: https://reglinux.org/download/hardkernel-odroid-xu3-xu4/

- Official REG Linux board page: https://reglinux.org/board/hardkernel-odroid-xu3xu4
