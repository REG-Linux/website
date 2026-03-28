---
layout: default
title: Download — 186 Supported Devices
permalink: /download/
body_class: download
description: Download REG Linux for your device — 186 handhelds, SBCs, TV boxes, and PCs supported.
---
{% assign devices_data = site.data.devices %}
{% assign manufacturers = site.data.manufacturers %}
{% include site-header.html nav_current="download" %}

<main>
  <section class="hero download-hero">
    <div class="hero-text">
      <h1>Download REG Linux</h1>
      <p class="lede">
        Find your device, download the image, flash, and play.
      </p>
    </div>
  </section>

  <section class="device-browser" id="device-list">
    <div class="device-filters" id="device-filters">
      <input type="text" id="device-search" placeholder="Search by name, brand, or SoC..." class="device-search" />
      <div class="filter-row">
        <div class="filter-group" id="type-filters">
          <button class="filter-btn active" data-filter="all">All <span id="count-all"></span></button>
          <button class="filter-btn" data-filter="handheld">Handhelds <span id="count-handheld"></span></button>
          <button class="filter-btn" data-filter="sbc">SBCs <span id="count-sbc"></span></button>
          <button class="filter-btn" data-filter="tvbox">TV Boxes <span id="count-tvbox"></span></button>
          <button class="filter-btn" data-filter="pc">PCs <span id="count-pc"></span></button>
          <button class="filter-btn" data-filter="console">Consoles <span id="count-console"></span></button>
        </div>
      </div>
    </div>

    <p class="device-count" id="device-count"></p>

    <div class="device-grid" id="device-grid">
      {% assign sorted_devices = devices_data | sort %}
      {% for entry in sorted_devices %}
        {% assign slug = entry[0] %}
        {% assign device = entry[1] %}
        {% assign soc_name = device.soc | first | default: "" %}
        {% assign device_type = "unknown" %}
        {% if slug contains "rg" or slug contains "rgb" or slug contains "pocket" or slug contains "odin" or slug contains "gameforce" or slug contains "powkiddy" or slug contains "odroid-go" or slug contains "ayaneo" or slug contains "trimui" or slug contains "miniloong" or slug contains "mangmi" %}
          {% assign device_type = "handheld" %}
        {% elsif slug contains "steam-deck" or slug contains "rog-ally" %}
          {% assign device_type = "pc" %}
        {% elsif slug contains "x96" or slug contains "h96" or slug contains "a95x" or slug contains "tx3" or slug contains "nexbox" or slug contains "wetek" or slug contains "tronsmart" or slug contains "mxiii" or slug contains "beelink" %}
          {% assign device_type = "tvbox" %}
        {% elsif slug contains "capcom" or slug contains "nintendo" %}
          {% assign device_type = "console" %}
        {% elsif slug contains "raspberry" or slug contains "banana-pi" or slug contains "orange-pi" or slug contains "khadas" or slug contains "radxa" or slug contains "firefly" or slug contains "milk-v" or slug contains "starfive" or slug contains "pine64" or slug contains "tinker" or slug contains "miqi" %}
          {% assign device_type = "sbc" %}
        {% endif %}
        <a class="device-card" href="{{ '/download/' | append: slug | append: '/' | relative_url }}"
           data-type="{{ device_type }}"
           data-brand="{{ device.brand | downcase }}"
           data-soc="{{ soc_name | downcase }}"
           data-title="{{ device.title | downcase }}">
          <div class="device-media">
            {% assign dev_img = device.image | default: "/assets/images/device-placeholder.svg" %}
            {% if dev_img contains "placeholder" %}
              <img src="{{ '/assets/images/device-placeholder.svg' | relative_url }}" alt="{{ device.title }}" loading="lazy" />
            {% else %}
              {% assign img_small = dev_img | replace: '.webp', '-sm.webp' %}
              <img src="{{ dev_img | relative_url }}" alt="{{ device.title }}" loading="lazy" decoding="async"
                   {% if device.image_width %}width="{{ device.image_width }}" height="{{ device.image_height }}"
                   srcset="{{ img_small | relative_url }} {{ device.image_width | divided_by: 2 }}w, {{ dev_img | relative_url }} {{ device.image_width }}w"
                   sizes="100px"{% endif %}
                   onerror="this.src='{{ '/assets/images/device-placeholder.svg' | relative_url }}'" />
            {% endif %}
          </div>
          <div class="device-info">
            <strong class="device-name">{{ device.title }}</strong>
            <span class="device-soc">{{ soc_name }}</span>
            <span class="device-type-badge device-type-{{ device_type }}">{{ device_type }}</span>
          </div>
        </a>
      {% endfor %}
    </div>
  </section>

  <!-- Manufacturers -->
  <section class="manufacturer-section">
    <div class="section-heading">
      <h2>Manufacturers</h2>
    </div>
    <div class="manufacturer-grid">
      {% assign sorted_manufacturers = manufacturers | sort: "name" %}
      {% for mfr in sorted_manufacturers %}
        {% assign mfr_count = 0 %}
        {% for d in devices_data %}
          {% if d[1].brand == mfr.id %}
            {% assign mfr_count = mfr_count | plus: 1 %}
          {% endif %}
        {% endfor %}
        {% if mfr_count > 0 %}
        <a href="{{ mfr.url }}" target="_blank" rel="noreferrer" class="manufacturer-card" title="{{ mfr.name }}">
          <div class="mfr-logo">
            <img src="{{ mfr.logo_image | relative_url }}" alt="{{ mfr.name }}" loading="lazy" />
          </div>
          <div class="mfr-info">
            <strong>{{ mfr.name }}</strong>
            <span class="mfr-count">{{ mfr_count }} device{% if mfr_count != 1 %}s{% endif %}</span>
          </div>
        </a>
        {% endif %}
      {% endfor %}
    </div>
  </section>

  <section class="doc-actions">
    <a class="btn secondary" href="https://compat.reglinux.org">Check hardware compatibility</a>
  </section>
</main>

<style>
.device-browser { text-align: center; }
.device-grid { text-align: left; }
.device-filters { display: flex; flex-direction: column; align-items: center; }
.filter-row { justify-content: center; }
.device-count { text-align: center; }
.device-search {
  width: 100%;
  max-width: 400px;
  padding: 0.6rem 1rem;
  background: var(--bg-soft, #0c101c);
  border: 1px solid var(--border, rgba(255,255,255,0.08));
  border-radius: 999px;
  color: var(--text, #f4f6fb);
  font-size: 0.9rem;
  outline: none;
  margin-bottom: 0.75rem;
}
.device-search:focus { border-color: var(--accent, #2bb0e9); }
.filter-row { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
.filter-group { display: flex; flex-wrap: wrap; gap: 0.3rem; }
.filter-btn {
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--border, rgba(255,255,255,0.08));
  background: transparent;
  color: var(--text-muted, #b2bed1);
  font-size: 0.8rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}
.filter-btn:hover { color: var(--text, #f4f6fb); border-color: var(--accent, #2bb0e9); }
.filter-btn.active { background: var(--accent, #2bb0e9); color: #030915; border-color: var(--accent, #2bb0e9); }
.filter-btn span { opacity: 0.6; font-size: 0.75em; }
.device-count { font-size: 0.8rem; color: var(--text-muted, #b2bed1); margin: 0 0 1rem; }
.device-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}
@media (max-width: 1100px) { .device-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 750px) { .device-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .device-grid { grid-template-columns: 1fr; } }
/* Device cards — same style as .emulator-tile on /play/ */
.device-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.65rem;
  margin: 0;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  border-radius: var(--radius, 14px);
  box-shadow: var(--shadow, 0 25px 60px rgba(3,9,27,0.55));
  text-decoration: none;
  color: var(--text, #f4f6fb);
  text-align: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.device-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent, #2bb0e9);
  text-decoration: none;
}
.device-card[data-hidden="true"] { display: none; }
.device-media {
  width: 100%; height: 140px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.device-media img {
  max-width: 120px; max-height: 120px;
  object-fit: contain;
}
.device-info {
  display: flex; flex-direction: column; align-items: center;
  gap: 0.15rem; width: 100%;
}
.device-name { font-size: 1rem; font-weight: 600; }
.device-soc { font-size: 0.85rem; color: var(--text-muted, #8b99b0); font-family: 'JetBrains Mono', monospace; }
.device-type-badge {
  font-size: 0.65rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em;
  width: fit-content; padding: 0.1rem 0.4rem; border-radius: 999px; margin-top: 0.15rem;
}
.device-type-handheld { color: #2bb0e9; background: rgba(43,176,233,0.1); }
.device-type-sbc { color: #a78bfa; background: rgba(167,139,250,0.1); }
.device-type-tvbox { color: #f59e0b; background: rgba(245,158,11,0.1); }
.device-type-pc { color: #f472b6; background: rgba(244,114,182,0.1); }
.device-type-console { color: #22c55e; background: rgba(34,197,94,0.1); }
.device-type-unknown { color: #6b7280; background: rgba(107,114,128,0.1); }
.manufacturer-section { margin-top: 3rem; }
.manufacturer-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}
@media (max-width: 900px) { .manufacturer-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 560px) { .manufacturer-grid { grid-template-columns: repeat(2, 1fr); } }
/* Manufacturer cards — same tile style */
.manufacturer-card {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  gap: 0.65rem; padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--border, rgba(255, 255, 255, 0.12));
  border-radius: var(--radius, 14px);
  box-shadow: var(--shadow, 0 25px 60px rgba(3,9,27,0.55));
  text-decoration: none; color: var(--text, #f4f6fb);
  transition: transform 0.2s ease, border-color 0.2s ease;
}
.manufacturer-card:hover { transform: translateY(-2px); border-color: var(--accent, #2bb0e9); text-decoration: none; }
.mfr-logo { width: 52px; height: 52px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.mfr-logo img { max-width: 52px; max-height: 52px; object-fit: contain; }
.mfr-info { display: flex; flex-direction: column; align-items: center; gap: 0.15rem; }
.mfr-info strong { font-size: 0.92rem; }
.mfr-count { font-size: 0.75rem; color: var(--text-muted); }
</style>

<script>
(function() {
  var search = document.getElementById('device-search');
  var grid = document.getElementById('device-grid');
  var countEl = document.getElementById('device-count');
  var typeFilters = document.getElementById('type-filters');
  var cards = Array.from(grid.querySelectorAll('.device-card'));
  var activeType = 'all';

  // Count per type
  var typeCounts = {};
  cards.forEach(function(c) {
    var t = c.dataset.type || 'unknown';
    typeCounts[t] = (typeCounts[t] || 0) + 1;
  });
  document.getElementById('count-all').textContent = '(' + cards.length + ')';
  ['handheld','sbc','tvbox','pc','console'].forEach(function(t) {
    var el = document.getElementById('count-' + t);
    if (el) el.textContent = typeCounts[t] ? '(' + typeCounts[t] + ')' : '(0)';
  });

  function filter() {
    var q = search.value.toLowerCase();
    var visible = 0;
    cards.forEach(function(card) {
      var title = card.dataset.title || '';
      var brand = card.dataset.brand || '';
      var soc = card.dataset.soc || '';
      var type = card.dataset.type || '';
      var matchesType = activeType === 'all' || type === activeType;
      var matchesSearch = !q || title.indexOf(q) >= 0 || brand.indexOf(q) >= 0 || soc.indexOf(q) >= 0;
      var show = matchesType && matchesSearch;
      card.setAttribute('data-hidden', show ? 'false' : 'true');
      if (show) visible++;
    });
    countEl.textContent = visible + ' device' + (visible !== 1 ? 's' : '');
  }

  search.addEventListener('input', filter);
  typeFilters.addEventListener('click', function(e) {
    var btn = e.target.closest('.filter-btn');
    if (btn) {
      typeFilters.querySelector('.active').classList.remove('active');
      btn.classList.add('active');
      activeType = btn.dataset.filter;
      filter();
    }
  });
  filter();
})();
</script>

{% include site-footer.html %}
