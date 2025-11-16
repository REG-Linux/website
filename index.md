---
layout: default
title: REG Linux
body_class: home
description: REG Linux turns SBCs, laptops, and handhelds into polished retro emulation consoles with a curated frontend, pre-configured emulators, and an immutable Buildroot base.
---
{% include site-header.html nav_current="home" %}

<main>
  <section class="hero" id="home">
    <div class="hero-text">
      <p class="eyebrow">Retro Emulation Gaming Linux</p>
      <h1>Turn any device into a purpose-built retro console.</h1>
      <p class="lede">
        Founded by retro gaming enthusiasts and open source developers, REG Linux turns SBCs, handhelds, laptops,
        and desktops into polished gaming rigs with curated software grounded in Buildroot, a custom OpenRC init,
        and official wiki documentation that guides every release.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Download REG Linux</a>
        <a class="btn secondary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">
          View on GitHub
        </a>
      </div>
      <ul class="hero-highlights">
        <li>Immutable Buildroot base with squashfs root, custom OpenRC, and rescue workflows</li>
        <li>EmulationStation frontend tailored by the REG team with curated RetroArch cores</li>
        <li>Wiki documentation covering flashing, architecture, builds, and community resources</li>
      </ul>
    </div>
    <div class="hero-media">
      {% assign hero_logos = "logo-es.png::EmulationStation|logo-retroarch.png::RetroArch|logo-linux.png::Linux Kernel|reg_linux_logo.png::REG Linux" | split: "|" %}
      <div class="hero-slideshow" aria-live="polite">
        {% for entry in hero_logos %}
          {% assign parts = entry | split: "::" %}
          {% assign file = parts[0] %}
          {% assign label = parts[1] %}
          <figure class="hero-slide" style="animation-delay: {{ forloop.index0 | times: 5 }}s">
            <img src="{{ '/assets/images/' | append: file | relative_url }}" alt="{{ label }} logo" loading="lazy" />
            <figcaption>{{ label }}</figcaption>
          </figure>
        {% endfor %}
      </div>
      <p class="hero-media-note">REG Linux blends a customized EmulationStation frontend with curated RetroArch cores on top of a rock-solid Linux foundation.</p>
    </div>
  </section>

  <section class="feature-grid" id="features">
    <div class="section-heading">
      <p class="eyebrow">What makes REG special</p>
      <h2>Feature-rich out of the box</h2>
      <p>
        REG Linux ships with the pieces you expect from a dedicated retro rig—carefully tuned frontends,
        tested emulators, community-requested ports, and a focus on reliability.
      </p>
    </div>
    <div class="grid">
      <article class="card">
        <h3>EmulationStation Frontend</h3>
        <p>REG ES, a bespoke EmulationStation build, delivers a slick nostalgic UI that is simple to tweak.</p>
      </article>
      <article class="card">
        <h3>Feature rich curation</h3>
        <p>An ever-growing catalog of native ports, engines, and tools sits alongside the default emulator stack.</p>
      </article>
      <article class="card">
        <h3>Rock solid OS</h3>
        <p>Immutable Buildroot base plus an integrated rescue workflow keep experiments safe.</p>
      </article>
      <article class="card">
        <h3>Open source forever</h3>
        <p>REG Linux is community-driven, transparent, and licensed for tinkering without restrictions.</p>
      </article>
      <article class="card">
        <h3>Endless gaming possibilities</h3>
        <p>Play arcade, console, and computer classics, switching cores or ports with a single menu action.</p>
      </article>
      <article class="card">
        <h3>Wide hardware support</h3>
        <p>From aging laptops to modern SBCs and handhelds, REG targets diverse devices with tuned kernels.</p>
      </article>
    </div>
  </section>

  <section class="stack" id="stack">
    <div class="stack-card">
      <div>
        <h2>Pre-configured emulator stack</h2>
        <p>
          REG ships with the most requested emulators ready to play: RetroArch, MAME, and specialist cores for
          handhelds, arcades, and microcomputers. Inputs, shaders, and hotkeys are sensible by default, so you
          can jump straight into the fun.
        </p>
        <ul class="stack-list">
          <li>RetroArch (multi-system) with curated core presets</li>
          <li>MAME builds tuned for arcade accuracy</li>
          <li>Additional native ports for DOS, ScummVM, Pico-8–style engines, and more</li>
        </ul>
      </div>
      {% assign featured_emulators = "retroarch.png::RetroArch|mame.png::MAME|dolphin.png::Dolphin|ppsspp.png::PPSSPP|duckstation.png::DuckStation|flycast.png::Flycast|pcsx2.png::PCSX2|citra.png::Azahar|scummvm.png::ScummVM|dosbox.png::DOSBox Staging|mupen64plus.png::Mupen64Plus|melonds.png::melonDS|openbor.png::OpenBOR" | split: "|" %}
      <div class="stack-logo-marquee" aria-label="Supported emulation projects">
        <div class="stack-logo-track">
          {% for entry in featured_emulators %}
            {% assign parts = entry | split: "::" %}
            {% assign file = parts[0] %}
            {% assign label = parts[1] %}
            <figure class="stack-logo">
              <img src="{{ '/assets/images/emulators/' | append: file | relative_url }}" alt="{{ label }} logo" loading="lazy" />
              <figcaption>{{ label }}</figcaption>
            </figure>
          {% endfor %}
          {% for entry in featured_emulators %}
            {% assign parts = entry | split: "::" %}
            {% assign file = parts[0] %}
            {% assign label = parts[1] %}
            <figure class="stack-logo">
              <img src="{{ '/assets/images/emulators/' | append: file | relative_url }}" alt="{{ label }} logo" loading="lazy" />
              <figcaption>{{ label }}</figcaption>
            </figure>
          {% endfor %}
        </div>
      </div>
    </div>
  </section>

  <section class="hardware" id="hardware">
    <div class="section-heading">
      <p class="eyebrow">Hardware coverage</p>
      <h2>Works where you play</h2>
        <p>
        REG relies on mainline LTS kernels whenever possible, making it easier to support SBC boards, handhelds,
        mini consoles, and desktops. The wiki installation guide lists coverage for ARM (Allwinner, Rockchip, Amlogic),
        AArch64 (RK3588, Snapdragon), RISC-V (K1, JH7110), and x86_64 mini PCs, so you can pick the profile that matches
        your hardware.
        </p>
    </div>
    <div class="hardware-grid">
      <article class="card">
        <h3>Single-board computers</h3>
        <p>From Raspberry Pi-style boards to RK3588 powerhouses, profiles ensure video, audio, and I/O just work.</p>
      </article>
      <article class="card">
        <h3>Handhelds & mini consoles</h3>
        <p>REG keeps controls responsive and includes handheld-friendly themes plus suspend-safe defaults.</p>
      </article>
      <article class="card">
        <h3>Laptops & desktops</h3>
        <p>Install on internal storage or boot from USB for a dedicated gaming partition that remains isolated.</p>
      </article>
    </div>
  </section>

  <section class="docs" id="docs">
    <div class="section-heading">
      <p class="eyebrow">Official wiki</p>
      <h2>Documentation built on GitHub Pages</h2>
      <p>
        The REG Linux wiki runs on MkDocs Material and mirrors every release, covering installation,
        architecture, developer builds, and community resources for hardware enthusiasts.
      </p>
    </div>
    <div class="doc-grid">
      <article class="card doc-card">
        <h3>Getting Started</h3>
        <p>Choose an image, flash it safely, and get controller-friendly onboarding tips for EmulationStation.</p>
        <a href="https://wiki.reglinux.org/getting-started/" target="_blank" rel="noreferrer">Open guide</a>
      </article>
      <article class="card doc-card">
        <h3>Installation</h3>
        <p>Supported platforms span ARM (Allwinner, Rockchip, Amlogic), AArch64 (RK3588, Snapdragon), RISC-V (K1, JH7110), and x86_64 mini PCs.</p>
        <a href="https://wiki.reglinux.org/installation/" target="_blank" rel="noreferrer">View devices</a>
      </article>
      <article class="card doc-card">
        <h3>Architecture</h3>
        <p>Immutable Buildroot layout with sysvinit, a squashfs root, and configurable /userdata partitions for game storage.</p>
        <a href="https://wiki.reglinux.org/architecture/" target="_blank" rel="noreferrer">Explore architecture</a>
      </article>
      <article class="card doc-card">
        <h3>Developer Guide</h3>
        <p>Build from source with commands like <code>make h700-build</code> and tweak configurations inside the configs directory.</p>
        <a href="https://wiki.reglinux.org/dev-guide/" target="_blank" rel="noreferrer">See build notes</a>
      </article>
    </div>
    <div class="doc-actions">
      <a class="btn secondary" href="https://wiki.reglinux.org/" target="_blank" rel="noreferrer">Browse the wiki</a>
    </div>
  </section>

  <section class="get-started" id="get-started">
    <div class="section-heading">
      <p class="eyebrow">Boot and play</p>
      <h2>Getting started with REG Linux</h2>
    </div>
    <ol class="steps">
      <li>
        <strong>Choose the right image.</strong> Visit the download page, consult the wiki installation guide for supported devices, and grab the latest release that matches your hardware.
      </li>
      <li>
        <strong>Flash to storage.</strong> Follow the wiki's recommended tools—balenaEtcher, Raspberry Pi Imager, or plain `dd`—and verify the image on your SD card or SSD.
      </li>
      <li>
        <strong>First boot & setup.</strong> Power on, run through the EmulationStation onboarding, pair controllers, and reference the wiki for troubleshooting or controller mapping tips.
      </li>
      <li>
        <strong>Load your library.</strong> Add ROMs via network share, USB drive, or the built-in file manager, then refresh the gamelist per the wiki's guidance.
      </li>
    </ol>
    <div class="cta-panel">
      <div>
        <h3>Need help?</h3>
        <p>Read the wiki, join Discord, or open a GitHub issue—contributors are active and eager to assist.</p>
      </div>
      <a class="btn primary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">Get support</a>
    </div>
  </section>

  <section class="community" id="community">
    <div class="section-heading">
      <p class="eyebrow">Open source & community</p>
      <h2>Build with the REG team</h2>
      <p>
        REG Linux is driven by volunteers. Whether you file bugs, port engines, design themes, or help with docs,
        every contribution keeps the project thriving.
      </p>
    </div>
    <div class="community-links">
      <a href="https://discord.gg/reglinux" target="_blank" rel="noreferrer" class="community-card">
        <span>Join the Discord</span>
        <span class="arrow">→</span>
      </a>
      <a href="https://wiki.reglinux.org/" target="_blank" rel="noreferrer" class="community-card">
        <span>Browse the official wiki</span>
        <span class="arrow">→</span>
      </a>
      <a href="https://github.com/REG-Linux" target="_blank" rel="noreferrer" class="community-card">
        <span>Contribute on GitHub</span>
        <span class="arrow">→</span>
      </a>
    </div>
  </section>
</main>

<footer class="site-footer">
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free, open source, and community supported.<br/>All rights reserved.</p>
  <p class="small">
    All product names, logos, and brands are property of their respective owners.<br/>
    Linux® is the registered trademark of Linus Torvalds.<br/>
    Other names may be trademarks of their respective holders.<br/>
    Use of third-party marks is for identification only and does not imply endorsement.
  </p>
</footer>
