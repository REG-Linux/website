# The Force Engine

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/theforceengine.webp" alt="theforceengine icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
</div>

## Metadata

- Manufacturer: Ports
- Release Year: 1995
- Hardware: port
- Platform tag: pc
- Group: ports

## Supported ROM extensions

tfe

## Emulators

- **theforceengine** (theforceengine) – Requires BR2_PACKAGE_THEFORCEENGINE

## Notes

The Force Engine (TFE) uses the games files from older LucasArts games like `Dark Forces` & soon `Outlaws` in Batocera.
To use TFE in Batocera, you need to do the following:

1. Install the game you wish to use with The Force Engine in Windows (Steam or GOG receommended)
2. In this example, go to your C:\GOG folder and copy the `Star Wars - Dark Forces` folder to your roms/theforceengine folder.
3. Create an initial file with a tfe extension, like so: `Star Wars - Dark Forces.tfe`.
4. Update you games list in Batocera EmulationStation and the game should be available under `Ports`.

Mods:

Mods have to be installed into the /userdata/system/configs/theforceengine/Mods folder.
The mod files should be in zip format only.
To launch directly into your mod, create a file in the roms/theforceengine folder with the .tfe extension.
Again choose the name which makes sense, i.e. the mod game / level name.
i.e. `Assasssination at Nar Shaddaa.tfe`

Then edit the file with the name of the mod zip file only.
i.e. aons_modern.zip

Update the games list and Batocera can now launch the mod directly.

A good source of missions to try are available here: https://df-21.net/downloads/levels/

Dark Forces HD Textures:

To use HD textures you need to have a copy of the Remaster version of the games also.
Copy the `enhanced.gob` file from the Remaster installation into the previous `Star Wars - Dark Forces` folder.

Notes:

It is important to use the exact directory name above.
A keyboard and mouse / touchscreen is required to create the initial user profile & game start.

For more info: https://wiki.batocera.org/systems:theforceengine

---
Source: `theforceengine.yml`
