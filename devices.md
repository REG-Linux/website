---
layout: default
title: Supported Devices
permalink: /devices/
body_class: devices
description: Browse all 186 devices supported by REG Linux — handhelds, SBCs, TV boxes, and PCs. Filter by brand, type, or architecture.
---
{% assign devices = site.data.devices %}
{% assign socs = site.data.socs %}
{% assign manufacturers = site.data.manufacturers %}
{% assign board_families = site.data.board_families %}
{% include site-header.html nav_current="devices" %}

<main>
  <section class="hero">
    <div class="hero-text">
      <p class="eyebrow">186 devices supported</p>
      <h1>Find your device</h1>
      <p class="lede">
        REG Linux runs on handhelds, single-board computers, TV boxes, and PCs across ARM, AArch64, RISC-V, and x86_64.
        Pick your device below to download, check compatibility, or read the wiki guide.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="{{ '/download/' | relative_url }}">Download</a>
        <a class="btn secondary" href="https://compat.reglinux.org">Compatibility matrix</a>
      </div>
    </div>
  </section>

  <section class="device-browser">
    <div class="section-heading">
      <h2>Browse by manufacturer</h2>
    </div>
    <div class="manufacturer-grid">
      {% assign sorted_manufacturers = manufacturers | sort: "name" %}
      {% for mfr in sorted_manufacturers %}
        {% assign mfr_devices = 0 %}
        {% for d in devices %}
          {% if d[1].brand == mfr.id %}
            {% assign mfr_devices = mfr_devices | plus: 1 %}
          {% endif %}
        {% endfor %}
        {% if mfr_devices > 0 %}
        <a href="{{ '/download/' | relative_url }}#{{ mfr.id | downcase | replace: ' ', '-' }}" class="manufacturer-card">
          <img src="{{ mfr.logo_image | relative_url }}" alt="{{ mfr.name }}" loading="lazy" class="manufacturer-logo" />
          <span class="manufacturer-name">{{ mfr.name }}</span>
          <span class="manufacturer-count">{{ mfr_devices }} device{{ mfr_devices | minus: 1 | at_least: 1 | divided_by: 1 }}{% if mfr_devices != 1 %}s{% endif %}</span>
        </a>
        {% endif %}
      {% endfor %}
    </div>
  </section>

  <section class="soc-families">
    <div class="section-heading">
      <h2>Browse by SoC family</h2>
      <p>Each SoC family has its own kernel, GPU driver, and board configs. Pick your chip to find the right wiki guide.</p>
    </div>
    <div class="board-grid">
      {% assign board_entries = board_families | sort %}
      {% for entry in board_entries %}
        {% assign family = entry[1] %}
        <article class="card">
          <h3>{{ family.title }}</h3>
          <p>{{ family.summary }}</p>
          <p class="chip">{{ family.soCs | join: ', ' }}</p>
          <a class="btn secondary" href="{{ family.wiki_url }}" target="_blank" rel="noreferrer">Wiki guide</a>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="compat-cta">
    <div class="cta-panel">
      <div>
        <h3>Check what works on your device</h3>
        <p>The compatibility matrix tracks WiFi, Bluetooth, GPU, display, and 18 other features across every supported device.</p>
      </div>
      <a class="btn primary" href="https://compat.reglinux.org">Open compatibility matrix</a>
    </div>
  </section>
</main>

<footer class="site-footer">
  {% include vendor-strip.html %}
  <p>&copy; 2025 REG Linux. Retro Emulation Gaming Linux is free and community supported.</p>
</footer>
