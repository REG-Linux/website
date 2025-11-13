# Wii

## Metadata

- Manufacturer: Nintendo
- Release Year: 2006
- Hardware: console

## Supported ROM extensions

gcm, iso, gcz, ciso, wbfs, wad, rvz, elf, dol, m3u, json

## Emulators

- **dolphin** (dolphin) – Requires BR2_PACKAGE_DOLPHIN_EMU
- **dolphin** (libretro) – Requires BR2_PACKAGE_LIBRETRO_DOLPHIN

## Notes

To use a virtual horizontal wiimote, include ".side." in the filename (for example ".side.iso").
You can choose the axis controls among i(nfrared), s(wing), t(ilt) or n(unchuk) :
    for example, to play mariokart wii, rename it mario_kart.side.ti.iso (to get the tilt on the first axis and infrared on the 2nd one (ti))
    for example, to play mario galaxy, rename it mario_galaxy.ni.iso (got get the nunchuk on the first axis and infrared on the 2nd one (ni))
To use custom textures, put them in /userdata/saves/dolphin-emu/Load/Textures/<game id>.

For more info: https://wiki.batocera.org/systems:wii

---
Source: `wii.yml`
