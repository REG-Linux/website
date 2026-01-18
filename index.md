---
layout: default
title: REG Linux
body_class: home
description: REG Linux turns SBCs, laptops, and handhelds into polished retro emulation consoles with a curated frontend, pre-configured emulators, and an immutable Buildroot base.
---
{% assign home = site.data.home %}
{% assign community_channels = site.data.community.channels %}
{% assign home_channel_order = "discord|wiki|github" | split: "|" %}
{% include site-header.html nav_current="home" %}

<main>
  <section class="hero" id="home">
    <div class="hero-text">
      <p class="eyebrow">Retro Emulation Gaming Linux</p>
      <h1>Turn any device into a purpose-built retro console.</h1>
      <p class="lede">
        Founded by retro gaming enthusiasts and open source developers, REG Linux turns SBCs, handhelds, laptops,
        and desktops into polished gaming rigs with curated software grounded in Buildroot, systemd-free system,
        and official wiki documentation that guides every release.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Download REG Linux</a>
        <a class="btn secondary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">
          View on GitHub
        </a>
      </div>
      <ul class="hero-highlights">
        {% for highlight in home.hero.highlights %}
          <li>{{ highlight }}</li>
        {% endfor %}
      </ul>
    </div>
    <div class="hero-media">
      <div class="hero-slideshow" aria-live="polite">
        {% for logo in home.hero.logos %}
          <figure class="hero-slide" style="animation-delay: {{ forloop.index0 | times: 5 }}s">
            <img src="{{ logo.image | relative_url }}" alt="{{ logo.label }} logo" loading="lazy" />
            <figcaption>{{ logo.label }}</figcaption>
          </figure>
        {% endfor %}
      </div>
      <p class="hero-media-note">REG Linux blends a customized REG-Station frontend with curated RetroArch cores on top of a rock-solid Linux foundation.</p>
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
      {% for feature in home.features %}
        <article class="card">
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </article>
      {% endfor %}
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
          {% for item in home.stack.highlights %}
            <li>{{ item }}</li>
          {% endfor %}
        </ul>
      </div>
      <div class="stack-logo-marquee" aria-label="Supported emulation projects">
        <div class="stack-logo-track">
          {% for logo in home.stack.logos %}
            <figure class="stack-logo">
              <img src="{{ logo.image | relative_url }}" alt="{{ logo.label }} logo" loading="lazy" />
              <figcaption>{{ logo.label }}</figcaption>
            </figure>
          {% endfor %}
          {% for logo in home.stack.logos %}
            <figure class="stack-logo">
              <img src="{{ logo.image | relative_url }}" alt="{{ logo.label }} logo" loading="lazy" />
              <figcaption>{{ logo.label }}</figcaption>
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
      {% for card in home.hardware_cards %}
        <article class="card">
          <h3>{{ card.title }}</h3>
          <p>{{ card.body }}</p>
        </article>
      {% endfor %}
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
      {% for card in home.doc_cards %}
        <article class="card doc-card">
          <h3>{{ card.title }}</h3>
          {{ card.body | markdownify }}
          <a href="{{ card.url }}" target="_blank" rel="noreferrer">{{ card.link_label }}</a>
        </article>
      {% endfor %}
    </div>
    <div class="doc-actions">
      <a class="btn secondary" href="https://wiki.reglinux.org/" target="_blank" rel="noreferrer">
        <img class="btn-icon" src="{{ '/assets/images/docs-icon.svg' | relative_url }}" alt="" aria-hidden="true" loading="lazy" />
        Browse the official Wiki
      </a>
    </div>
  </section>

  <section class="get-started" id="get-started">
    <div class="section-heading">
      <p class="eyebrow">Boot and play</p>
      <h2>Getting started with REG Linux</h2>
    </div>
    <ol class="steps">
      {% for step in home.getting_started_steps %}
        <li>
          <strong>{{ step.title }}</strong> {{ step.body }}
        </li>
      {% endfor %}
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
      {% for channel_id in home_channel_order %}
        {% assign channel = community_channels | where: "id", channel_id | first %}
        {% if channel %}
          <a href="{{ channel.url }}" target="_blank" rel="noreferrer" class="community-card community-link-card">
            <span class="community-link-label">
              <img src="{{ channel.icon | relative_url }}" alt="{{ channel.icon_alt }}" loading="lazy" />
              <span>{{ channel.home_label }}</span>
            </span>
            <span class="arrow">→</span>
          </a>
        {% endif %}
      {% endfor %}
    </div>
  </section>
</main>

<footer class="site-footer">
  {% include vendor-strip.html %}
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free, open source, and community supported.<br/>All rights reserved.</p>
  <p class="small">
    All product names, logos, and brands are property of their respective owners.<br/>
    Linux® is the registered trademark of Linus Torvalds.<br/>
    Other names may be trademarks of their respective holders.<br/>
    Use of third-party marks is for identification only and does not imply endorsement.
  </p>
</footer>
