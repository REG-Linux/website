# Khadas VIM 2

Khadas VIM 2 pairs the Amlogic S912 SoC with the REG Linux stack for a polished retro console. pairs the Amlogic S912 SoC with the REG Linux stack for a polished retro console.

## Quick facts

- **Manufacturer**: Khadas

- **SoC**: Amlogic S912

- Maintained on the REG Linux download channel

## Specs

| Property | Value |

| --- | --- |

| Manufacturer | Khadas |

| SoC | Amlogic S912 |

| Image availability | Download the latest build from the REG Linux downloads hub (Khadas section). |

## Installation notes

1. Grab the image. Download the latest Khadas VIM 2 build from the downloads page or the official board entry .

2. Flash to storage. Use balenaEtcher, Raspberry Pi Imager, or `dd` to write the image to an SD card or SSD. Make sure to verify the checksum before booting.

3. First boot setup. Insert the media into your Khadas VIM 2, power on, and let REG Linux expand the filesystem. Pair controllers inside EmulationStation once prompted.

4. Troubleshoot with rescue tools. REG Linux ships with an immutable base and rescue partition—if something breaks, reboot into rescue or reflash without touching your ROMs.

## Board family guidance

### What to keep in mind

- S812 and the S905/S905X/S905D lines list Meson/Meson8 clones plus Khadas NanoPi, Libretech, and HardKernel TV boxes that usually require you to adjust DTBs or boot scripts for generic builds.

- The S905 Gen2 (GXM/G12A) and Gen3 (SM1 / S905X3) sections extend support to Khadas VIM2, Radxa Zero, Banana Pi M5, Khadas VIM3L, HardKernel ODROID C4, and other devices tied to vendor 5.15 kernels.

- S922X/A311D and A311D2 families cover Khadas VIM3/VIM4, Banana Pi M2S, Beelink GT-King/GT-King Pro, Radxa Zero 2, and the ODROID N2 series, while the S9 Gen4 notes Khadas VIM1S and its bespoke boot scripts.

### Learn more

Drill into the wiki board entry for scripts, overlays, and developer reminders.

## Resources

- REG Linux download page: https://reglinux.org/download/khadas-vim-2/

- Official REG Linux board page: https://reglinux.org/board/khadas-vim-2
