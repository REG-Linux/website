# Asus ROG Ally

Asus ROG Ally pairs the AMD Ryzen Z1 SoC with the REG Linux stack for a polished retro console. pairs the AMD Ryzen Z1 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: ASUS

- **SoC**: AMD Ryzen Z1

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | ASUS |

| SoC | AMD Ryzen Z1 |

| Image availability | Download the latest build from the REG Linux downloads hub (ASUS section). |

## Installation notes

1. Grab the image. Download the latest Asus ROG Ally build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Asus ROG Ally, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Resources

- REG Linux download page: https://reglinux.org/download/asus-rog-ally/

- Official REG Linux board page: https://reglinux.org/board/asus-rog-ally
