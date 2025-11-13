# Singe

<div style="display:flex; flex-wrap:wrap; gap:1rem; align-items:center;">
<img src="/assets/systems/icons/singe.webp" alt="singe icon" width="96" height="96" loading="lazy" style="border-radius:12px; object-fit:contain; background:#0f172a; padding:.25rem;">
<span style="display:flex; align-items:center; justify-content:center; background:#050505; padding:.35rem 0.75rem; border-radius:0.75rem;"><img src="/assets/systems/logos/singe.png" alt="singe logo" loading="lazy" style="max-height:96px; object-fit:contain;"></span>
</div>

## Metadata

- Manufacturer: Arcade
- Release Year: 1990
- Hardware: arcade
- Platform tag: alg, daphne, arcade

## Supported ROM extensions

hypseus, zar

## Emulators

- **hypseus-singe** (hypseus-singe) – Requires BR2_PACKAGE_HYPSEUS_SINGE

## Notes

Singe supports American Laser Games, Action Max and fan made Singe & Singe 2 games.

Due to legacy supporting file structures, we still use the .daphne folder extension.

roms
|-- singe
    |-- maddog.daphne
        |-- maddog.singe      (Singe Game LUA)
        |-- maddog.txt        (Framefile)
        |-- maddog.m2v
        |-- maddog.ogg

For more info: https://wiki.batocera.org/systems:singe

---
Source: `singe.yml`
