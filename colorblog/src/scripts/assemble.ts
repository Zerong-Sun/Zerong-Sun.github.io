function initAssemble() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll<HTMLElement>('[data-assemble]');
  const routes = document.querySelectorAll<SVGGeometryElement>('.route-draw');
  const nodes = document.querySelectorAll<HTMLElement>('.timeline-node');

  if (reduced) {
    items.forEach((el) => el.classList.add('is-in'));
    routes.forEach((el) => el.classList.add('is-in'));
    nodes.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.classList.add('is-in');

        if (el.hasAttribute('data-stagger')) {
          [...el.children].forEach((child, i) => {
            window.setTimeout(() => child.classList.add('is-in'), i * 60);
          });
        }

        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  items.forEach((el) => {
    // Main article content can exceed the viewport; intersection ratio may never reach threshold.
    if (el.classList.contains('article-body') || el.classList.contains('prose')) {
      el.classList.add('is-in');
      return;
    }
    io.observe(el);
  });
  routes.forEach((el) => io.observe(el));
  nodes.forEach((el) => io.observe(el));
}

function initPhotoStripDrag() {
  document.querySelectorAll<HTMLElement>('[data-photo-strip]').forEach((strip) => {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let vel = 0;
    let lastX = 0;
    let lastT = 0;
    let raf = 0;

    const stopInertia = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    const inertia = () => {
      if (Math.abs(vel) < 0.2) {
        stopInertia();
        return;
      }
      strip.scrollLeft -= vel;
      vel *= 0.92;
      raf = requestAnimationFrame(inertia);
    };

    strip.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'touch') return;
      isDown = true;
      stopInertia();
      strip.classList.add('is-dragging');
      startX = e.pageX - strip.offsetLeft;
      scrollLeft = strip.scrollLeft;
      lastX = e.pageX;
      lastT = performance.now();
      strip.setPointerCapture(e.pointerId);
    });

    strip.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - strip.offsetLeft;
      strip.scrollLeft = scrollLeft - (x - startX) * 1.15;
      const now = performance.now();
      const dt = now - lastT || 1;
      vel = ((e.pageX - lastX) / dt) * 14;
      lastX = e.pageX;
      lastT = now;
    });

    const end = () => {
      if (!isDown) return;
      isDown = false;
      strip.classList.remove('is-dragging');
      raf = requestAnimationFrame(inertia);
    };

    strip.addEventListener('pointerup', end);
    strip.addEventListener('pointercancel', end);
    strip.addEventListener('pointerleave', end);
  });
}

function boot() {
  initAssemble();
  initPhotoStripDrag();
}

boot();
document.addEventListener('astro:page-load', boot);
