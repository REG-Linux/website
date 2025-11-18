---
layout: default
title: Hardware
permalink: /hardware/
body_class: hardware
description: Learn how REG Linux supports Arm, Rockchip, Qualcomm, Broadcom, and other silicon via board-specific configs and overlays.
---
{% assign hardware = site.data.hardware %}
{% include site-header.html nav_current="hardware" %}

<main>
  <section class="hero hardware-hero">
    <div class="hero-text">
      <p class="eyebrow">{{ hardware.hero.eyebrow }}</p>
      <h1>{{ hardware.hero.title }}</h1>
      <p class="lede">{{ hardware.hero.lede }}</p>
      <div class="hero-cta">
        {% for cta in hardware.hero.ctas %}
          {% assign classes = 'btn ' | append: cta.style %}
          {% assign cta_href = cta.href %}
          {% assign cta_first_char = cta_href | slice: 0, 1 %}
          {% if cta_href contains 'http' %}
            {% assign resolved_href = cta_href %}
            {% assign cta_attrs = ' target="_blank" rel="noreferrer"' %}
          {% elsif cta_first_char == '#' %}
            {% assign resolved_href = cta_href %}
            {% assign cta_attrs = '' %}
          {% else %}
            {% assign resolved_href = cta_href | relative_url %}
            {% assign cta_attrs = '' %}
          {% endif %}
          <a class="{{ classes }}" href="{{ resolved_href }}"{{ cta_attrs }}>{{ cta.label }}</a>
        {% endfor %}
      </div>
    </div>
    <div class="hero-media">
      <figure>
        <img src="{{ hardware.hero.media.image | relative_url }}" alt="{{ hardware.hero.media.alt }}" loading="lazy" />
        <figcaption>{{ hardware.hero.media.caption }}</figcaption>
      </figure>
    </div>
  </section>

  <section class="hardware-grid">
    <div class="section-heading">
      <p class="eyebrow">{{ hardware.doc_section.eyebrow }}</p>
      <h2>{{ hardware.doc_section.title }}</h2>
      <p>{{ hardware.doc_section.body }}</p>
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
    <p class="eyebrow">{{ hardware.closing.eyebrow }}</p>
    <h2>{{ hardware.closing.title }}</h2>
    <p>{{ hardware.closing.body }}</p>
  </section>

  <section class="doc-actions">
    {% if hardware.cta_href contains 'http' %}
      {% assign hardware_cta_href = hardware.cta_href %}
      {% assign hardware_cta_attrs = ' target="_blank" rel="noreferrer"' %}
    {% else %}
      {% assign hardware_cta_href = hardware.cta_href | relative_url %}
      {% assign hardware_cta_attrs = '' %}
    {% endif %}
    <a class="btn primary" href="{{ hardware_cta_href }}"{{ hardware_cta_attrs }}>{{ hardware.cta_label }}</a>
  </section>
</main>
