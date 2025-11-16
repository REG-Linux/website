---
layout: default
title: Emulators
body_class: emulators
permalink: /emulators/
description: Explore the EmulatedStation systems the REG Linux wiki documents so you can plan your ROM folders with confidence.
---
{% include site-header.html nav_current="emulators" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">Official wiki data</p>
      <h1>Every supported emulator profile</h1>
      <p class="lede">
        The REG Linux wiki mirrors the EmulationStation `es_systems.yml` bundle with metadata for 150+ systems, so you can see which manufacturer,
        release year, hardware type, ROM extensions, and upstream notes ship with each entry.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://wiki.reglinux.org/systems/" target="_blank" rel="noreferrer">Browse emulator index</a>
        <a class="btn secondary" href="https://github.com/REG-Linux/REG-Linux" target="_blank" rel="noreferrer">View the repo</a>
      </div>
      <ul class="hero-highlights">
        <li>150+ systems tracked across arcade, console, and computer folders</li>
        <li>Each wiki page publishes ROM extensions for accurate folder names</li>
        <li>Use the same metadata when curating shaders, playlists, and dat files</li>
      </ul>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-es.png' | relative_url }}" alt="EmulationStation systems" loading="lazy" />
        <figcaption>EmulationStation organizes these systems inside REG Linux.</figcaption>
      </figure>
    </div>
  </section>

  <section class="doc-section">
    <div class="section-heading">
      <p class="eyebrow">Organized by hardware</p>
      <h2>Plan your ROM tree with context</h2>
      <p>The wiki breaks the systems folder into familiar groupings so you can match ROM sets and BIOS files with the right emulator.</p>
    </div>
    <div class="grid">
      <article class="card">
        <h3>Arcade & cabinets</h3>
        <p>MAME, FBNeo, Naomi, Model 3, and other arcade entries spell out manufacturer data, required BIOS, and command-line tweaks for each title.</p>
      </article>
      <article class="card">
        <h3>Consoles & handhelds</h3>
        <p>The wiki profiles NES, SNES, Mega Drive, GameCube, Dreamcast, PSX, PSP, Switch, Wii, and Xbox systems so you know which cores, shaders, and controllers to pair.</p>
      </article>
      <article class="card">
        <h3>Computers & ports</h3>
        <p>Amiga, C64, DOS, ZX Spectrum, PC-88/98, and other classic computer entries document disk images, language packs, and port-specific quirks.</p>
      </article>
    </div>
  </section>

  <section class="doc-section">
    <div class="section-heading">
      <p class="eyebrow">What each page includes</p>
      <h2>Metadata you can trust</h2>
    </div>
    <ul class="doc-list">
      <li>Manufacturer, release year, and hardware type pulled straight from the upstream EmulationStation data.</li>
      <li>Supported ROM extensions, compatible emulator packages, and folder tags so REG Linux can auto-detect your content.</li>
      <li>Notes in English, French, and Portuguese to explain BIOS dependencies, translation tips, or community fixes.</li>
    </ul>
    <p>Use these entries when drafting README files, reorganizing playlists, or documenting the ROM requirements for friends and contributors.</p>
  </section>

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/systems/" target="_blank" rel="noreferrer">Open the system catalog</a>
  </section>
</main>
