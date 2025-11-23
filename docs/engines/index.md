# Engines

This folder collects “content engines” that REG Linux can launch directly. Instead of emulating a fixed hardware console, these runtimes load games or interactive content built for a specific engine (RPG runtimes, point‑and‑click interpreters, Flash reimplementations, and so on).

Use these pages when you are working with projects that ship their own data files, scripts, or assets rather than traditional ROMs. Each engine page focuses on:

- What the engine is and where it comes from.
- Which file formats or directory layouts REG Linux expects in the ROM tree.
- Which concrete player or core is used (native binary, libretro core, or other runtime).
- Any special notes for packaging content on handhelds.

## Engine catalog

- [EasyRPG](easyrpg.md) – Open-source implementation of the RPG Maker 2000/2003 runtime so REG Linux can play classic JRPG projects from the original toolchain.
- [Flash Player](flash.md) – Flash content support via open-source engines like Ruffle and Lightspark that run SWF/ActionScript games after the official plug‑in’s end‑of‑life.
- [IKEMEN](ikemen.md) – Modern fork of the M.U.G.E.N fighting engine with rollback netcode, Lua scripting, and REG Linux presets for custom character packs.
- [OpenBOR](openbor.md) – Community-driven beat’em‑up engine for Streets‑of‑Rage‑style side‑scrollers and mods, packaged as standalone OpenBOR packs.
- [ScummVM](scummvm.md) – Interpreter for classic adventure and narrative titles that replaces the original executable while reusing the game data files.
- [Singe](singe.md) – FMV/light‑gun engine used for laserdisc‑style games (e.g. Mad Dog McCree), wired through Hypseus‑Singe on REG Linux.
- [Solarus](solarus.md) – Lua‑driven action‑RPG engine for Zeldalike adventures, loading quests exported from the Solarus editor.
- [TheXTech](thextech.md) – Recreation of Super Mario Bros. X capable of running SMBX worlds and fan campaigns with modern resolutions and controller support.

