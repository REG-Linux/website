# Doom 3

## Metadata

- Manufacturer: Ports
- Release Year: 2004
- Hardware: port
- Platform tag: pc
- Group: ports

## Supported ROM extensions

d3

## Emulators

- **dhewm3** (dhewm3) – Requires BR2_PACKAGE_DHEWM3

## Notes

Add your Doom 3 (and if you have the Resurrection of Evil mod) pk4 files here like so:

└── roms/
    └── doom3/
        ├── base/
        │   ├── pak000.pk4
        │   ├── pak001.pk4
        │   ├── pak002.pk4
        │   ├── pak003.pk4
        │   ├── pak004.pk4
        │   ├── pak005.pk4
        │   ├── pak006.pk4
        │   ├── pak007.pk4
        │   └── pak008.pk4
        └── d3xp/
            ├── pak000.pk4
            └── pak001.pk4

Create a `Doom 3.d3` file in the roms/doom3 directory.
If you have the Resurrection of Evil mod then Create a `Doom 3 - Resurrection of Evil.d3` file too.

The `Doom 3.d3` file should contain the path to the base game. - i.e. base/pak000.pk4
Similarly `Doom 3 - Resurrection of Evil.d3` should be - d3xp/pak000.pk4

For more info: https://wiki.batocera.org/systems:doom3

---
Source: `doom3.yml`
