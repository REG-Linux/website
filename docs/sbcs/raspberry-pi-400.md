# Raspberry Pi 400

Raspberry Pi 400 pairs the Broadcom BCM2711 SoC with the REG Linux stack for a polished retro console. pairs the Broadcom BCM2711 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Raspberry

- **SoC**: Broadcom BCM2711

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | Raspberry |

| SoC | Broadcom BCM2711 |

| Image availability | Download the latest build from the REG Linux downloads hub (Raspberry section). |

## Installation notes

1. Grab the image. Download the latest Raspberry Pi 400 build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Raspberry Pi 400, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Board family guidance

### What to keep in mind

- Board scripts copy Image, initrd, DTBs, and firmware while rewiring `boot/config.txt` + `cmdline.txt` to enable DRM/KMS helpers, fastboot, `noswap`, and other runtime defaults.

- `genimage.cfg` produces a 2 GiB REGLINUX FAT32 boot volume plus a 256 MiB userdata/SHARE slice for BCM2711/BCM2712 builds, while the older SoCs keep their legacy layouts.

- Overlays/patches load modules such as `snd_seq`, `i2c_dev`, and other audio helpers so GroovyMAME, RetroArch, and libretro cores stay compatible with the VC4/VC6 GPUs.

### Learn more

Drill into the wiki board entry for scripts, overlays, and developer reminders.

## Resources

- REG Linux download page: https://reglinux.org/download/raspberry-pi-400/

- Official REG Linux board page: https://reglinux.org/board/raspberry-pi-400
