---
layout: default
title: Hardware
permalink: /hardware/
body_class: hardware
description: Learn how REG Linux supports Arm, Rockchip, Qualcomm, Broadcom, and other silicon via board-specific configs and overlays.
---
{% include site-header.html nav_current="hardware" %}

<main>
  <section class="hero hardware-hero">
    <div class="hero-text">
      <p class="eyebrow">Board support</p>
      <h1>Hardware families supported by REG Linux</h1>
      <p class="lede">
        Each REG Linux release ships tuned kernels, overlays, firmware, DTBs, and rescue workflows per board tree.
        The wiki’s board directory documents how we handle Broadcom, Allwinner, Amlogic, Rockchip, Qualcomm, Mediatek, and Samsung devices.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://wiki.reglinux.org/board/" target="_blank" rel="noreferrer">Browse the board directory</a>
        <a class="btn secondary" href="{{ '/download/' | relative_url }}">Download builds</a>
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ '/assets/images/logo-linux.png' | relative_url }}" alt="Hardware logos" loading="lazy" />
        <figcaption>Mainline kernels, blend of ARM/RISC-V/x86 hardware.</figcaption>
      </figure>
    </div>
  </section>

  <section class="hardware-grid">
    <div class="section-heading">
      <p class="eyebrow">SoC families</p>
      <h2>Detailed board notes</h2>
      <p>
        The wiki keeps each SoC’s `create-boot-script`, `genimage`, overlays, and patches in a dedicated folder.
        Use the cards below as a quick index before diving into the full wiki pages and device subdirectories.
      </p>
    </div>
  </section>
  <section class="board-section">
    <div class="board-grid">
      {% assign board_entries = site.data.board_families | sort %}
      {% for entry in board_entries %}
        {% assign family = entry[1] %}
        <article class="card">
          <h3>{{ family.title }}</h3>
          <p>{{ family.summary }}</p>
          <p class="chip">SoCs: {{ family.soCs | join: ', ' }}</p>
          <ul class="hardware-highlights">
            {% for highlight in family.highlights %}
              <li>{{ highlight }}</li>
            {% endfor %}
          </ul>
          <a class="btn secondary" href="{{ family.wiki_url }}" target="_blank" rel="noreferrer">Open wiki guide</a>
        </article>
      {% endfor %}
    </div>
  </section>

  <section class="section-heading">
    <p class="eyebrow">Need deeper context?</p>
    <h2>Drill into the wiki board trees</h2>
    <p>
      The board README files walk through kernel config, overlays, firmware, DTB layout, and `genimage.cfg` partitions per device.
      Follow the wiki links above to see which DTBs, firmware blobs, or u-boot binaries belong to an SoC before flashing.
    </p>
  </section>

  <section class="doc-actions">
    <a class="btn primary" href="https://wiki.reglinux.org/board/" target="_blank" rel="noreferrer">Open board docs</a>
  </section>
</main>
