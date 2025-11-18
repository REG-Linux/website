---
layout: default
title: Download REG Linux builds
permalink: /download/
body_class: download
description: Choose your REG Linux image by vendor or architecture across the supported device matrix.
---
{% assign download_content = site.data.download %}
{% assign total_devices = site.data.devices | size %}
{% assign brands = site.data.brand_order %}
{% include site-header.html nav_current="download" %}

<main>
  <section class="hero download-hero">
    <div class="hero-text">
      <p class="eyebrow">{{ download_content.hero.eyebrow }}</p>
      <h1>{{ download_content.hero.title }}</h1>
      <p class="lede">{{ download_content.hero.lede | replace: '%TOTAL%', total_devices }}</p>
      <div class="hero-cta">
        {% for cta in download_content.hero.ctas %}
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
        <img src="{{ download_content.hero.media.image | relative_url }}" alt="{{ download_content.hero.media.alt }}" loading="lazy" />
        <figcaption>{{ download_content.hero.media.caption }}</figcaption>
      </figure>
    </div>
  </section>

  <section class="download-summary" id="brands">
    <div>
      <h2>{{ download_content.summary.architectures_heading }}</h2>
      <p>{{ download_content.summary.architectures_body }}</p>
      <div class="arch-pills">
        {% for arch in download_content.summary.architectures %}
          <span class="chip">{{ arch }}</span>
        {% endfor %}
      </div>
    </div>
    <div class="brand-pills">
      <h2>{{ download_content.summary.vendor_heading }}</h2>
      <p>{{ download_content.summary.vendor_body }}</p>
      <div class="pill-grid">
        {% for brand in brands %}
          {% assign brand_slugs = "" %}
          {% for entry in site.data.devices %}
            {% assign slug = entry[0] %}
            {% assign device = entry[1] %}
            {% if device.brand == brand %}
              {% if brand_slugs == "" %}
                {% assign brand_slugs = slug %}
              {% else %}
                {% assign brand_slugs = brand_slugs | append: "," | append: slug %}
              {% endif %}
            {% endif %}
          {% endfor %}
          {% if brand_slugs != "" %}
            {% assign brand_device_slugs = brand_slugs | split: "," %}
            <a href="#brand-{{ brand | slugify }}">{{ brand }} <span>{{ brand_device_slugs | size }} devices</span></a>
          {% endif %}
        {% endfor %}
      </div>
    </div>
  </section>

  {% for brand in brands %}
    {% assign brand_slugs = "" %}
    {% for entry in site.data.devices %}
      {% assign slug = entry[0] %}
      {% assign device = entry[1] %}
      {% if device.brand == brand %}
        {% if brand_slugs == "" %}
          {% assign brand_slugs = slug %}
        {% else %}
          {% assign brand_slugs = brand_slugs | append: "," | append: slug %}
        {% endif %}
      {% endif %}
    {% endfor %}
    {% if brand_slugs == "" %}{% continue %}{% endif %}
    {% assign brand_device_slugs = brand_slugs | split: "," %}
    {% assign brand_device_count = brand_device_slugs | size %}
    <section class="download-brand" id="brand-{{ brand | slugify }}">
      <div class="brand-heading">
        <h2>{{ brand }}</h2>
        <p>{{ brand_device_count }} supported device{% if brand_device_count > 1 %}s{% endif %}</p>
      </div>
      <div class="download-grid">
        {% for slug in brand_device_slugs %}
          {% assign device = site.data.devices[slug] %}
          {% assign device_url = '/download/' | append: slug | append: '/' | relative_url %}
          <a class="device-card" href="{{ device_url }}" aria-label="{{ device.title }} details">
            <div class="device-media">
              <img src="{{ device.image | relative_url }}" alt="{{ device.title }}" loading="lazy"{% if device.image_width %} width="{{ device.image_width }}"{% endif %}{% if device.image_height %} height="{{ device.image_height }}"{% endif %} />
            </div>
            <div class="device-body">
              <h3>{{ device.title }}</h3>
              <p>REG Linux build tuned for the {{ device.soc | join: ', ' }} platform.</p>
              <span class="chip">View device page</span>
            </div>
          </a>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</main>

<footer class="site-footer">
  <p>{{ download_content.footer.text }}</p>
  <p class="small">{{ download_content.footer.note }}</p>
</footer>
