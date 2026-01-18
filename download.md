---
layout: default
title: Download REG Linux builds
permalink: /download/
body_class: download
description: Choose your REG Linux image by vendor or architecture across the supported device matrix.
preload_image: /assets/images/logo-retroarch.webp
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
        {% assign hero_image = download_content.hero.media.image %}
        {% assign hero_image_small = hero_image | replace: '.webp', '-sm.webp' %}
        <img src="{{ hero_image | relative_url }}"
             alt="{{ download_content.hero.media.alt }}"
             loading="eager"
             fetchpriority="high"
             decoding="async"
             {% if download_content.hero.media.width %}width="{{ download_content.hero.media.width }}"{% endif %}
             {% if download_content.hero.media.height %}height="{{ download_content.hero.media.height }}"{% endif %}
             srcset="{{ hero_image_small | relative_url }} 210w, {{ hero_image | relative_url }} 420w"
             sizes="(max-width: 600px) 70vw, 420px"
        />
        <figcaption>{{ download_content.hero.media.caption }}</figcaption>
      </figure>
    </div>
  </section>

  <section class="download-summary cv-auto" id="brands">
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
    <section class="download-brand cv-auto" id="brand-{{ brand | slugify }}">
      <div class="brand-heading">
        <h2>{{ brand }}</h2>
        <p>{{ brand_device_count }} supported device{% if brand_device_count > 1 %}s{% endif %}</p>
      </div>
      <div class="download-grid">
        {% for slug in brand_device_slugs %}
          {% assign device = site.data.devices[slug] %}
          {% assign device_url = '/download/' | append: slug | append: '/' | relative_url %}
          {% assign image_small = device.image | replace: '.webp', '-sm.webp' %}
          {% assign image_small_width = device.image_width | divided_by: 2 %}
          <a class="device-card" href="{{ device_url }}" aria-label="{{ device.title }} details">
            <div class="device-media">
              <img src="{{ device.image | relative_url }}"
                   alt="{{ device.title }}"
                   loading="lazy"
                   decoding="async"
                   {% if device.image_width %}width="{{ device.image_width }}"{% endif %}
                   {% if device.image_height %}height="{{ device.image_height }}"{% endif %}
                   {% if device.image_width and device.image_height %}
                   srcset="{{ image_small | relative_url }} {{ image_small_width }}w, {{ device.image | relative_url }} {{ device.image_width }}w"
                   sizes="(max-width: 600px) {{ image_small_width }}px, {{ device.image_width }}px"
                   {% endif %}
              />
            </div>
            <h3>{{ device.title }}</h3>
            <p>REG Linux build tuned for the {{ device.soc | join: ', ' }} platform.</p>
            <span class="chip">View device page</span>
          </a>
        {% endfor %}
      </div>
    </section>
  {% endfor %}
</main>

<footer class="site-footer">
  {% include vendor-strip.html %}
  <p>{{ download_content.footer.text }}</p>
  <p class="small">{{ download_content.footer.note }}</p>
</footer>
