# Radxa NIO 12L

Radxa NIO 12L pairs the Genio 1200 (MT8395) SoC with the REG Linux stack for a polished retro console. pairs the Genio 1200 (MT8395) SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Radxa

- **SoC**: Genio 1200 (MT8395)

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | Radxa |

| SoC | Genio 1200 (MT8395) |

| Image availability | Download the latest build from the REG Linux downloads hub (Radxa section). |

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Genio 1200 (MT8395) | ARM Cortex-A78/A55 (Octa-core) | Mali-G610 |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | Panfrost (Mesa) | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Radxa NIO 12L build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Radxa NIO 12L, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Board family guidance

### What to keep in mind

- The overlay copies MT7961/MT7668/MT8183/MT8188/MT8195 firmware under `/lib/firmware` so Wi-Fi, Bluetooth, and audio work correctly.

- Kernel configs and patches capture the Linux 6.15.0-rc2 options plus HDMI/ALSA wiring required by the MT8395 Genio 1200 board.

- `genimage.cfg` stages the kernel, initrd, modules, firmware, rescue blobs, and bootloader artifacts into a GPT image with a 2 GiB REGLINUX boot partition plus a 256 MiB SHARE userdata slice.

### Learn more

Drill into the wiki board entry for scripts, overlays, and developer reminders.

## Resources

- REG Linux download page: https://reglinux.org/download/radxa-nio-12l/

- Official REG Linux board page: https://reglinux.org/board/radxa-nio-12l
