# Milk-V Meles

Milk-V Meles pairs the TH1520 SoC with the REG Linux stack for a polished retro console. pairs the TH1520 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Milk-V

- **SoC**: TH1520

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | Milk-V |

| SoC | TH1520 |

| Image availability | Download the latest build from the REG Linux downloads hub (Milk-V section). |

## Installation notes

1. Grab the image. Download the latest Milk-V Meles build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Milk-V Meles, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Resources

- REG Linux download page: https://reglinux.org/download/milk-v-meles/
