---
layout: default
title: Engines
body_class: engines
permalink: /engines/
description: Learn about the curated open souce engines REG Linux comes with and what you can do with.
---
{% include site-header.html nav_current="engines" %}

<main>
  <section class="hero doc-hero">
    <div class="hero-text">
      <p class="eyebrow">Engine companions</p>
      <h1>Open-source runtimes</h1>
      <p class="lede">
        REG Linux ships with the several open source engines — both native binaries and libretro builds —so you can drop the right assets and packages for adventure games,
        beat ’em ups, RPG Maker titles, Flash SWFs, fan-made games, or even LaserDisc FMV discs.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://wiki.reglinux.org/engines/" target="_blank" rel="noreferrer">Browse the engine guides</a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/engines/engines-hero.png' | relative_url }}" alt="Collage of REG Linux engine logos" loading="lazy" />
        <figcaption>Every engine pairs with curated ROM metadata.</figcaption>
      </figure>
    </div>
  </section>

  <section class="section-heading">
    <p class="eyebrow">Browse our wiki</p>
    <h2>Engine-specific instructions</h2>
    <p>Each entry in the wiki describes the engines, supported formats, and best practices for enjoying your content into REG Linux.</p>
  </section>

  <div class="engine-grid">
    <article class="card engine-card">
      <figure class="engine-logo">
        <img src="{{ '/assets/images/engines/scummvm.svg' | relative_url }}" alt="ScummVM logo" loading="lazy" />
      </figure>
      <h3>ScummVM</h3>
      <p>Reimplements SCUMM, SCI, AGI, and other adventure engines so classics like Monkey Island, Day of the Tentacle, Grim Fandango, and Broken Sword run with controller-friendly menus.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/scummvm/" target="_blank" rel="noreferrer">Read ScummVM guide</a>
    </article>
    <article class="card engine-card">
      <figure class="engine-logo">
        <img src="{{ '/assets/images/engines/solarus.svg' | relative_url }}" alt="Solarus logo" loading="lazy" />
      </figure>
      <h3>Solarus</h3>
      <p>The Zelda-inspired Solarus engine loads `game.solarus` archives and honors Lua scripts, sounds, and top-down maps while preserving save states and controller layouts.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/solarus/" target="_blank" rel="noreferrer">Read Solarus guide</a>
    </article>
    <article class="card engine-card">
      <figure class="engine-logo">
        <img src="{{ '/assets/images/engines/easyrpg.svg' | relative_url }}" alt="EasyRPG logo" loading="lazy" />
      </figure>
      <h3>EasyRPG</h3>
      <p>Recreates the RPG Maker 2000/2003 runtime so you can drop `.easyrpg` project folders, `.zip` archives, or `.zar` bundles that contain `RPG_RT.exe` data.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/easyrpg/" target="_blank" rel="noreferrer">Read EasyRPG guide</a>
    </article>
    <article class="card engine-card">
      <figure class="engine-logo">
        <img src="{{ '/assets/images/engines/ikemen.svg' | relative_url }}" alt="IKEMEN logo" loading="lazy" />
      </figure>
      <h3>IKEMEN</h3>
      <p>A modern revival of the M.U.G.E.N engine with rollback, Lua hooks, and high framerates, powering community-made fighters from Street Fighter to King of Fighters.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/ikemen/" target="_blank" rel="noreferrer">Read IKEMEN guide</a>
    </article>
    <article class="card engine-card">
      <figure class="engine-logo">
        <img src="{{ '/assets/images/engines/openbor.svg' | relative_url }}" alt="OpenBOR logo" loading="lazy" />
      </figure>
      <h3>OpenBOR</h3>
      <p>Community-driven beat ’em up engine that loads `.pak` archives or `.pak.txt` manifests containing sprites, Lua logic, music, and Ai adjustments.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/openbor/" target="_blank" rel="noreferrer">Read OpenBOR guide</a>
    </article>
    <article class="card engine-card">
      <figure class="engine-logo">
        <img src="{{ '/assets/images/engines/ruffle.svg' | relative_url }}" alt="Ruffle logo" loading="lazy" />
        <img src="{{ '/assets/images/engines/lightspark.svg' | relative_url }}" alt="Lightspark logo" loading="lazy" />
      </figure>
      <h3>Flash Player</h3>
      <p>Replaces the retired Adobe player with Ruffle and Lightspark so SWF/ABC adventure and ActionScript titles keep running safely in REG Linux.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/flash/" target="_blank" rel="noreferrer">Read Flash guide</a>
    </article>
    <article class="card engine-card">
      <figure class="engine-logo">
        <img src="{{ '/assets/images/engines/thextech.png' | relative_url }}" alt="TheXTech logo" loading="lazy" />
      </figure>
      <h3>TheXTech</h3>
      <p>Runs Super Mario Bros. X worlds, reading `System` folders, Lua scripts, and SMBX archives while adding widescreen, touch, and editor features.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/thextech/" target="_blank" rel="noreferrer">Read TheXTech guide</a>
    </article>
    <article class="card engine-card">
      <figure class="engine-logo">
        <img src="{{ '/assets/images/engines/singe.svg' | relative_url }}" alt="Singe logo" loading="lazy" />
      </figure>
      <h3>Singe</h3>
      <p>Hypseus’s FMV interpreter for LaserDisc-era arcade shooters—Mad Dog McCree, Crime Patrol, Space Pirates, and Dragon’s Lair—using `.singe` framefiles.</p>
      <a class="btn secondary" href="https://wiki.reglinux.org/engines/singe/" target="_blank" rel="noreferrer">Read Singe guide</a>
    </article>
  </div>

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/engines/" target="_blank" rel="noreferrer">Open the engines directory</a>
  </section>
</main>
