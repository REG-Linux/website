---
layout: default
title: Retro Emulation OS
body_class: home
description: REG Linux turns SBCs, handhelds, laptops, and mini PCs into a focused retro gaming OS with REG-Station UI, curated emulators, and a stable Buildroot base.
preload_image: /assets/images/logo-regstation.webp
---
{% assign home = site.data.home %}
{% assign community_channels = site.data.community.channels %}
{% assign home_channel_order = "discord|wiki|github" | split: "|" %}
{% include site-header.html nav_current="home" %}

<main>
  <section class="hero" id="home">
    <div class="hero-text">
      <p class="eyebrow">Retro Emulation Gaming Linux</p>
      <h1>Retro gaming OS for any device</h1>
      <p class="lede">
        REG Linux turns SBCs, handhelds, and PCs into dedicated retro gaming machines.
        Flash an image, boot, and play. 186 devices supported.
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
          {% assign logo_small = logo.image | replace: '.webp', '-sm.webp' %}
          <figure class="hero-slide" style="animation-delay: {{ forloop.index0 | times: 5 }}s">
            <img src="{{ logo.image | relative_url }}"
                 alt="{{ logo.label }} logo"
                 {% if forloop.first %}loading="eager" fetchpriority="high"{% else %}loading="lazy"{% endif %}
                 decoding="async"
                 {% if logo.width %}width="{{ logo.width }}"{% endif %}
                 {% if logo.height %}height="{{ logo.height }}"{% endif %}
                 srcset="{{ logo_small | relative_url }} 210w, {{ logo.image | relative_url }} 420w"
                 sizes="(max-width: 600px) 70vw, 420px"
            />
            <figcaption>{{ logo.label }}</figcaption>
          </figure>
        {% endfor %}
      </div>
      <p class="hero-media-note">REG-Station frontend + RetroArch + mainline Linux kernel</p>
    </div>
  </section>

  <section class="feature-grid cv-auto" id="features">
    <div class="section-heading">
      <p class="eyebrow">What makes REG special</p>
      <h2>What you get</h2>
      <p>Everything pre-configured. No setup headaches.</p>
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

  <section class="stack cv-auto" id="stack">
    <div class="stack-card">
      <div>
        <h2>Pre-configured emulator stack</h2>
        <p>
          RetroArch, MAME, Dolphin, PCSX2, and more — all pre-configured with working controls, shaders, and hotkeys.
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

  <section class="hardware cv-auto" id="hardware">
    <div class="section-heading">
      <p class="eyebrow">Hardware coverage</p>
      <h2>Runs on your hardware</h2>
        <p>
        186 devices across ARM, AArch64, RISC-V, and x86_64. One image per device, tuned for each board's kernel, GPU, and peripherals.
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

  <section class="get-started cv-auto" id="get-started">
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
        <p>Check the <a href="/wiki/">wiki</a>, ask on <a href="https://discord.gg/a9HH4ZpVqp" target="_blank">Discord</a>, or file a <a href="https://github.com/REG-Linux" target="_blank">GitHub issue</a>.</p>
      </div>
      <a class="btn primary" href="https://github.com/REG-Linux" target="_blank" rel="noreferrer">Get support</a>
    </div>
  </section>

  <section class="community cv-auto" id="community">
    <div class="section-heading">
      <p class="eyebrow">Open source & community</p>
      <h2>Get involved</h2>
      <p>
        REG Linux is open source and community-driven. Report bugs, contribute code, write docs, or just hang out.
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
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free and community supported.<br/>All rights reserved.</p>
  <p class="small">
    All product names, logos, and brands are property of their respective owners.<br/>
    Linux® is the registered trademark of Linus Torvalds.<br/>
    Other names may be trademarks of their respective holders.<br/>
    Use of third-party marks is for identification only and does not imply endorsement.
  </p>
</footer>
