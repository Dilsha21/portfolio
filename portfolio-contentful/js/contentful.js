/**
 * contentful.js
 * Fetches projects and gallery items from Contentful and renders them into the page.
 * Replace SPACE_ID and ACCESS_TOKEN with your own values from Contentful.
 */

const CONTENTFUL_SPACE_ID  = 'YOUR_SPACE_ID';
const CONTENTFUL_TOKEN     = 'YOUR_DELIVERY_ACCESS_TOKEN';
const CONTENTFUL_BASE      = `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/entries`;

// ── helpers ──────────────────────────────────────────────────────────────────

function cfImg(asset) {
  return asset?.fields?.file?.url
    ? 'https:' + asset.fields.file.url + '?w=800&fm=webp&q=80'
    : 'images/work_1_md.jpg';
}

function cfThumb(asset) {
  return asset?.fields?.file?.url
    ? 'https:' + asset.fields.file.url + '?w=600&h=420&fit=fill&fm=webp&q=75'
    : 'images/work_1_md.jpg';
}

async function cfFetch(contentType, order = '-sys.createdAt') {
  const url = `${CONTENTFUL_BASE}?content_type=${contentType}&order=${order}&include=1`;
  const res  = await fetch(url, {
    headers: { Authorization: `Bearer ${CONTENTFUL_TOKEN}` }
  });
  if (!res.ok) throw new Error(`Contentful error ${res.status}`);
  return res.json();
}

// Build a lookup map: asset id → asset object
function assetMap(includes) {
  const map = {};
  (includes?.Asset || []).forEach(a => { map[a.sys.id] = a; });
  return map;
}

// ── projects ─────────────────────────────────────────────────────────────────

async function loadProjects() {
  const container = document.getElementById('posts');
  if (!container) return;

  let data;
  try {
    data = await cfFetch('project');
  } catch (e) {
    console.warn('Contentful projects fetch failed, keeping static fallback.', e);
    return; // leave the hardcoded HTML in place
  }

  const assets = assetMap(data.includes);
  const items  = data.items;
  if (!items.length) return;

  container.innerHTML = items.map(item => {
    const f          = item.fields;
    const imgAsset   = f.coverImage?.sys?.id ? assets[f.coverImage.sys.id] : null;
    const imgUrl     = cfThumb(imgAsset);
    const tags       = (f.tags || []).join(' ');          // e.g. "uiux dev"
    const tagLabels  = (f.tags || []).join(', ');
    const link       = f.githubUrl || f.liveUrl || '#';
    const portrait   = f.portrait ? ' item-portrait' : '';

    return `
      <div class="item ${tags} col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
        <a href="${link}" target="_blank" rel="noopener" class="portfolio-item${portrait} isotope-item gsap-reveal-img">
          <div class="overlay">
            <span class="wrap-icon icon-link2"></span>
            <div class="portfolio-item-content">
              <h3>${f.title || 'Untitled'}</h3>
              <p>${tagLabels}</p>
            </div>
          </div>
          <img src="${imgUrl}" class="img-fluid" alt="${f.title || 'Project'}" />
        </a>
      </div>`;
  }).join('');

  // Re-init Isotope after dynamic render
  if (window.$ && $.fn.isotope) {
    const $grid = $('#posts');
    $grid.isotope('reloadItems').isotope({ filter: '*' });
  }
}

// ── gallery ──────────────────────────────────────────────────────────────────

async function loadGallery() {
  const container = document.getElementById('gallery-grid');
  if (!container) return;

  let data;
  try {
    data = await cfFetch('galleryItem');
  } catch (e) {
    console.warn('Contentful gallery fetch failed, keeping static fallback.', e);
    return;
  }

  const assets = assetMap(data.includes);
  const items  = data.items;
  if (!items.length) return;

  container.innerHTML = items.map((item, i) => {
    const f        = item.fields;
    const imgAsset = f.photo?.sys?.id ? assets[f.photo.sys.id] : null;
    const imgUrl   = cfThumb(imgAsset);
    const fullUrl  = cfImg(imgAsset);
    const portrait = f.portrait ? ' item-portrait' : '';

    return `
      <div class="item col-sm-6 col-md-6 col-lg-4 isotope-mb-2">
        <a href="${fullUrl}" data-fancybox="gallery" data-caption="${f.caption || ''}"
           class="portfolio-item${portrait} isotope-item gsap-reveal-img">
          <div class="overlay">
            <span class="wrap-icon icon-link2"></span>
            <div class="portfolio-item-content">
              <h3>${f.title || 'Moment'}</h3>
              <p>${f.caption || ''}</p>
            </div>
          </div>
          <img src="${imgUrl}" class="img-fluid" alt="${f.title || 'Gallery ' + (i+1)}" />
        </a>
      </div>`;
  }).join('');
}

// ── boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  loadGallery();
});
