# Daphne

## Metadata

- Manufacturer: Arcade
- Release Year: 1983
- Hardware: arcade
- Platform tag: alg, daphne, arcade

## Supported ROM extensions

daphne, zar

## Emulators

- **hypseus-singe** (hypseus-singe) – Requires BR2_PACKAGE_HYPSEUS_SINGE

## Notes

Daphne supports these specific laser games games only:
- Astron Belt
- Badlands
- Bega's Battle
- Cliff Hanger
- Cobra Command
- Dragon's Lair
- Dragon's Lair (Atari EU)
- Dragon's Lair II: Time Warp
- Esh's Aurunmilla
- Galaxy Ranger
- Goal to Go
- GP World
- Interstellar Laser Fantasy
- M.A.C.H. 3
- Road Blaster
- Space Ace
- Space Ace (Atari EU)
- Super Don Quix-Ote
- Thayer's Quest
- Us Vs Them

Games should be in a folder names with the .daphne extension.
Supporting ROM files should be in a folder named roms.

roms
|-- daphne
    |   (The folder below holds a laserdisc...".daphne"
    |   tells emulationstation to add this to the menu,
    |   and "badlands" tells daphne to use that game engine)
    |
    |-- badlands.daphne
    |   |-- badlands.commands (Optional extra command-
    |   |                      line parameters)
    |   |-- badlands.txt      (Framefile)
    |   |-- badlands-pc.m2v
    |   |-- badlands-pc.ogg
    |   |-- ...
    |
    |   (All rom zips files go into this roms folder)
    |-- roms
        |-- badlands.zip

Singe games should now be run out of the singe rom directory.

For more info: https://wiki.batocera.org/systems:daphne

---
Source: `daphne.yml`
