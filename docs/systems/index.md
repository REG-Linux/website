# Emulated Systems

## Overview

The Emulated Systems system is supported on REG Linux.

## Overview

The Emulated Systems system is supported by REG Linux. Its platform tag is `None` for proper filtering.

This folder exposes the EmulationStation `es_systems.yml` data that REG Linux ships with.
Each file is named after the corresponding system (for example `snes.yml`) and contains:

* Metadata (manufacturer, release year, hardware type)
* Supported ROM extensions and compatible emulator packages
* Instructions pulled from the upstream `es_systems.yml` comments (English/French/Portuguese)

Use the YAML files as a single source of truth when preparing ROM folders, verifying BIOS/extension requirements, or documenting a system that REG Linux supports.
