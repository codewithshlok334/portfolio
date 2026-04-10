/* ── THEME TOGGLE ─────────────────────────────────── */
const toggleBtn = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

toggleBtn.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── MOBILE MENU ──────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

/* ── SMOOTH SCROLL + ACTIVE LINK ─────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── SCROLL REVEAL ────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.project-card, .about-card, .skill-category, .contact-item, .cert-chip')
  .forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

/* ── SKILL BARS ───────────────────────────────────── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.fill').forEach(fill => {
        fill.style.width = fill.style.getPropertyValue('--w') ||
          fill.style.cssText.match(/--w:\s*(\d+%)/)?.[1] || '0%';
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-category').forEach(cat => barObserver.observe(cat));

// Also trigger fills via CSS custom property
document.querySelectorAll('.fill').forEach(fill => {
  const w = getComputedStyle(fill).getPropertyValue('--w').trim();
  if (w) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          fill.style.width = w;
          observer.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });
    observer.observe(fill);
  }
});

/* ── NAVBAR SCROLL STYLE ──────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.boxShadow = window.scrollY > 20
    ? '0 4px 30px rgba(0,0,0,0.3)'
    : 'none';
});

/* ── CONTACT FORM ─────────────────────────────────── */
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  // Simulate submission (replace with real backend/EmailJS)
  setTimeout(() => {
    note.textContent = '✓ Message received! I\'ll get back to you soon.';
    form.reset();
    btn.textContent = 'Send Message →';
    btn.disabled = false;
    setTimeout(() => { note.textContent = ''; }, 5000);
  }, 1200);
});

/* ── STAGGER CARD REVEALS ─────────────────────────── */
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
