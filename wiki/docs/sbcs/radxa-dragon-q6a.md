# Radxa Dragon Q6A

Radxa Dragon Q6A pairs the Qualcomm QCS6490 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Radxa

- **SoC**: Qualcomm QCS6490

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | Radxa |

| SoC | Qualcomm QCS6490 |

| Image availability | Check the REG Linux downloads hub (Radxa section) for availability. |

## Hardware

| SoC | CPU | GPU |
| --- | --- | --- |
| Qualcomm QCS6490 | Kryo 660 (Octa-core) | Adreno 619 |

| RAM | Storage | Connectivity |
| --- | --- | --- |
| Varies by board | Varies by board | Varies by board |

## Software

| Kernel | GPU drivers | Compositor | Interface |
| --- | --- | --- | --- |
| Linux | Freedreno (Mesa) | Device-specific | REG-ES |

## Installation notes

1. Grab the image. Download the latest Radxa Dragon Q6A build from the downloads page once available.

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to your boot media. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Dragon Q6A, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Board family guidance

### What to keep in mind

- Qualcomm boards rely on device-specific DTBs and bootloader configs. Always use the QCS6490-specific image for this board.

### Learn more

Drill into the wiki board entry for scripts, overlays, and developer reminders.

## Resources

- REG Linux download page: https://reglinux.org/download/
