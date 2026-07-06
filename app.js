/* ─────────────────────────────────────────────────
   clips.Revolution — Main Site JS
───────────────────────────────────────────────── */

/* ── 1. Background Grid Images (exact same logic as clips.Scribe) ── */
const IMAGE_SETS = [
  [
    'https://picsum.photos/seed/cr1/400/600',
    'https://picsum.photos/seed/cr2/400/400',
    'https://picsum.photos/seed/cr3/400/500',
    'https://picsum.photos/seed/cr4/400/350',
    'https://picsum.photos/seed/cr5/400/600',
    'https://picsum.photos/seed/cr6/400/400',
    'https://picsum.photos/seed/cr7/400/550',
    'https://picsum.photos/seed/cr8/400/400',
    'https://picsum.photos/seed/cr9/400/600',
    'https://picsum.photos/seed/cr10/400/350',
    'https://picsum.photos/seed/cr11/400/500',
    'https://picsum.photos/seed/cr12/400/450',
    'https://picsum.photos/seed/cr13/400/600',
    'https://picsum.photos/seed/cr14/400/350',
    'https://picsum.photos/seed/cr15/400/500',
    'https://picsum.photos/seed/cr16/400/400',
  ],
  [
    'https://picsum.photos/seed/rev1/400/500',
    'https://picsum.photos/seed/rev2/400/600',
    'https://picsum.photos/seed/rev3/400/400',
    'https://picsum.photos/seed/rev4/400/550',
    'https://picsum.photos/seed/rev5/400/400',
    'https://picsum.photos/seed/rev6/400/600',
    'https://picsum.photos/seed/rev7/400/350',
    'https://picsum.photos/seed/rev8/400/500',
    'https://picsum.photos/seed/rev9/400/450',
    'https://picsum.photos/seed/rev10/400/600',
    'https://picsum.photos/seed/rev11/400/400',
    'https://picsum.photos/seed/rev12/400/500',
    'https://picsum.photos/seed/rev13/400/350',
    'https://picsum.photos/seed/rev14/400/600',
    'https://picsum.photos/seed/rev15/400/400',
    'https://picsum.photos/seed/rev16/400/550',
  ],
  [
    'https://picsum.photos/seed/vid1/400/600',
    'https://picsum.photos/seed/vid2/400/350',
    'https://picsum.photos/seed/vid3/400/500',
    'https://picsum.photos/seed/vid4/400/600',
    'https://picsum.photos/seed/vid5/400/400',
    'https://picsum.photos/seed/vid6/400/550',
    'https://picsum.photos/seed/vid7/400/600',
    'https://picsum.photos/seed/vid8/400/350',
    'https://picsum.photos/seed/vid9/400/500',
    'https://picsum.photos/seed/vid10/400/400',
    'https://picsum.photos/seed/vid11/400/600',
    'https://picsum.photos/seed/vid12/400/350',
    'https://picsum.photos/seed/vid13/400/500',
    'https://picsum.photos/seed/vid14/400/450',
    'https://picsum.photos/seed/vid15/400/600',
    'https://picsum.photos/seed/vid16/400/400',
  ]
];

const bgGrid = document.getElementById('bg-grid');
if (bgGrid) {
  const bgImages = bgGrid.querySelectorAll('.grid-image-wrapper img');
  let currentSetIndex = 0;

  function loadGridImages(setIndex) {
    const set = IMAGE_SETS[setIndex];
    bgImages.forEach((img, i) => {
      if (set[i]) img.src = set[i];
    });
  }

  // Load first set immediately
  loadGridImages(currentSetIndex);
  bgGrid.style.opacity = '0.38';

  // Rotate every 5 seconds with fade — identical to clips.Scribe
  setInterval(() => {
    bgGrid.style.opacity = '0.1';
    bgGrid.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
      currentSetIndex = (currentSetIndex + 1) % IMAGE_SETS.length;
      loadGridImages(currentSetIndex);
      bgGrid.style.opacity = '0.38';
    }, 800);
  }, 5000);
}


/* ── 3. Mobile Menu ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const backdrop    = document.getElementById('mobile-menu-backdrop');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  backdrop.classList.add('open');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  backdrop.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMobileMenu);
mobileClose.addEventListener('click', closeMobileMenu);
backdrop.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMobileMenu();
});

/* ── 4. Smooth anchor scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth'
    });
  });
});

/* ── 5. Scroll Reveal ── */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealEls.forEach(el => revealObserver.observe(el));

/* ── 6. Tool card mouse-follow glow ── */
document.querySelectorAll('.tool-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    const glow = card.querySelector('.preview-glow');
    if (glow) glow.style.background =
      `radial-gradient(circle at ${x}% ${y}%, rgba(168,85,247,0.1) 0%, transparent 65%)`;
  });
  card.addEventListener('mouseleave', () => {
    const glow = card.querySelector('.preview-glow');
    if (glow) glow.style.background =
      'radial-gradient(circle at center, rgba(168,85,247,0.06) 0%, transparent 70%)';
  });
});

/* ── 7. Hero logo hover glow ── */
const heroLogo = document.getElementById('hero-logo');
if (heroLogo) {
  heroLogo.addEventListener('mouseenter', () => {
    heroLogo.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    heroLogo.style.transform = 'scale(1.07)';
    heroLogo.style.boxShadow = '0 0 70px rgba(168,85,247,0.65), 0 0 130px rgba(168,85,247,0.25)';
  });
  heroLogo.addEventListener('mouseleave', () => {
    heroLogo.style.transform = 'scale(1)';
    heroLogo.style.boxShadow = '0 0 50px rgba(168,85,247,0.5), 0 0 100px rgba(168,85,247,0.18)';
  });
}

/* ── 8. Active nav highlight on scroll ── */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        if (!a.classList.contains('nav-cta')) {
          a.style.color = a.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--foreground)' : '';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── 9. Instagram phone tiles hover ── */
document.querySelectorAll('.phone-tile').forEach(tile => {
  tile.addEventListener('mouseenter', () => {
    tile.style.filter = 'brightness(1.3)';
    tile.style.transform = 'scale(1.06)';
    tile.style.zIndex = '2';
    tile.style.transition = 'filter 0.22s ease, transform 0.22s ease';
  });
  tile.addEventListener('mouseleave', () => {
    tile.style.filter = '';
    tile.style.transform = '';
    tile.style.zIndex = '';
  });
});

/* ── 10. 3D CoverFlow Carousel ── */
(function () {
  const track = document.querySelector('.coverflow-track');
  if (!track) return;

  const cards  = Array.from(track.querySelectorAll('.cf-card'));
  const dots   = Array.from(document.querySelectorAll('.cf-dot'));
  const btnPrev = document.querySelector('.cf-prev');
  const btnNext = document.querySelector('.cf-next');
  const total  = cards.length;
  let   active = 0;

  const POS = ['cf-far-left', 'cf-prev', 'cf-active', 'cf-next', 'cf-far-right'];

  function posClass(offset) {
    if (offset === 0)  return 'cf-active';
    if (offset === -1) return 'cf-prev';
    if (offset === 1)  return 'cf-next';
    return offset < 0  ? 'cf-far-left' : 'cf-far-right';
  }

  function normalizeOffset(raw) {
    let o = raw % total;
    if (o > Math.floor(total / 2))  o -= total;
    if (o < -Math.ceil(total / 2))  o += total;
    return o;
  }

  function update(instant) {
    if (instant) cards.forEach(c => (c.style.transition = 'none'));

    cards.forEach((card, i) => {
      POS.forEach(cls => card.classList.remove(cls));
      card.classList.add(posClass(normalizeOffset(i - active)));
    });

    dots.forEach((dot, i) => dot.classList.toggle('cf-dot-active', i === active));

    if (instant) requestAnimationFrame(() => cards.forEach(c => (c.style.transition = '')));
  }

  function goTo(index) {
    active = ((index % total) + total) % total;
    update(false);
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', e => {
      if (!card.classList.contains('cf-active')) { e.preventDefault(); goTo(i); }
    });
  });

  btnPrev?.addEventListener('click', () => goTo(active - 1));
  btnNext?.addEventListener('click', () => goTo(active + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  // Touch swipe
  let touchX = 0;
  const scene = document.querySelector('.coverflow-scene');
  scene?.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  scene?.addEventListener('touchend',   e => {
    const dx = touchX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) goTo(active + (dx > 0 ? 1 : -1));
  }, { passive: true });

  update(true);
})();

/* ── 11. Video CoverFlow (about section) ── */
(function () {
  const track = document.querySelector('.vcf-track');
  if (!track) return;

  const cards   = Array.from(track.querySelectorAll('.vcf-card'));
  const dots    = Array.from(document.querySelectorAll('.vcf-dot'));
  const btnPrev = document.querySelector('.vcf-prev');
  const btnNext = document.querySelector('.vcf-next');
  const total   = cards.length;
  let   active  = 1;

  const POS = ['vcf-far-left', 'vcf-prev', 'vcf-active', 'vcf-next', 'vcf-far-right'];

  function posClass(offset) {
    if (offset === 0)  return 'vcf-active';
    if (offset === -1) return 'vcf-prev';
    if (offset === 1)  return 'vcf-next';
    return offset < 0 ? 'vcf-far-left' : 'vcf-far-right';
  }

  function normalizeOffset(raw) {
    let o = raw % total;
    if (o > Math.floor(total / 2))  o -= total;
    if (o < -Math.ceil(total / 2))  o += total;
    return o;
  }

  function update(instant) {
    if (instant) cards.forEach(c => (c.style.transition = 'none'));
    cards.forEach((card, i) => {
      POS.forEach(cls => card.classList.remove(cls));
      card.classList.add(posClass(normalizeOffset(i - active)));
    });
    dots.forEach((dot, i) => dot.classList.toggle('vcf-dot-active', i === active));
    if (instant) requestAnimationFrame(() => cards.forEach(c => (c.style.transition = '')));
  }

  function goTo(index) {
    active = ((index % total) + total) % total;
    update(false);
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', e => {
      if (!card.classList.contains('vcf-active')) { e.preventDefault(); goTo(i); }
    });
  });

  btnPrev?.addEventListener('click', () => goTo(active - 1));
  btnNext?.addEventListener('click', () => goTo(active + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

  let touchX = 0;
  const scene = document.querySelector('.vcf-scene');
  scene?.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  scene?.addEventListener('touchend', e => {
    const dx = touchX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 48) goTo(active + (dx > 0 ? 1 : -1));
  }, { passive: true });

  // מניעת מסך שחור בין לופים — מאפס 0.3 שניות לפני הסוף
  cards.forEach(card => {
    const video = card.querySelector('video');
    if (!video) return;
    video.addEventListener('timeupdate', () => {
      if (!isNaN(video.duration) && video.currentTime >= video.duration - 0.3) {
        video.currentTime = 0;
      }
    });
  });

  update(true);
})();

/* ── 12. Video placeholder — ready for embed ── */
// To activate: replace the placeholder div with an iframe
// Example YouTube embed:
//   <iframe src="https://www.youtube.com/embed/YOUR_ID?autoplay=1" ...></iframe>
const playBtn = document.getElementById('play-btn');
if (playBtn) {
  playBtn.addEventListener('click', () => {
    // Pulse animation on click (until real video is added)
    playBtn.style.transform = 'scale(0.92)';
    setTimeout(() => { playBtn.style.transform = ''; }, 200);
  });
}

/* ── 13. Lazy Load Background Videos (Coverflow & Showreel) on Interaction ── */
let videosLoaded = false;
function loadVideos() {
  if (videosLoaded) return;
  videosLoaded = true;
  document.querySelectorAll('video[data-src]').forEach(video => {
    video.src = video.getAttribute('data-src');
    video.removeAttribute('data-src');
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  });
  ['scroll', 'mousemove', 'touchstart', 'click'].forEach(evt => {
    window.removeEventListener(evt, loadVideos);
  });
}
['scroll', 'mousemove', 'touchstart', 'click'].forEach(evt => {
  window.addEventListener(evt, loadVideos, { passive: true, once: true });
});
