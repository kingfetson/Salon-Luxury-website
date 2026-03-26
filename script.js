/* ============================================================
   Lumière Salon Nairobi — script.js
   Google Sheets booking capture via Apps Script Web App
   ============================================================

   SETUP:
   1. Deploy Code.gs as a Google Apps Script Web App (see Code.gs).
   2. Paste your Web App URL below.
   ============================================================ */

'use strict';

// ─── CONFIGURATION ────────────────────────────────────────────
const SHEETS_WEBHOOK_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
// ──────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initBookingForm();
  initScrollReveal();
  setYear();
});


// ===== STICKY HEADER =====
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


// ===== MOBILE NAV =====
function initMobileNav() {
  const hamburger  = document.getElementById('hamburger');
  const mobNav     = document.getElementById('mobNav');
  const mobClose   = document.getElementById('mobClose');
  const mobOverlay = document.getElementById('mobOverlay');
  const mLinks     = document.querySelectorAll('.m-link');

  if (!hamburger || !mobNav) return;

  const open = () => {
    mobNav.classList.add('open');
    mobOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    mobNav.classList.remove('open');
    mobOverlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', open);
  mobClose?.addEventListener('click', close);
  mobOverlay?.addEventListener('click', close);
  mLinks.forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobNav.classList.contains('open')) close();
  });
}


// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('header')?.offsetHeight ?? 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


// ===== BOOKING FORM — GOOGLE SHEETS INTEGRATION =====
function initBookingForm() {
  const form       = document.getElementById('bookingForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn  = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('name')?.value.trim();
    const phone   = document.getElementById('phone')?.value.trim();
    const service = document.getElementById('service')?.value;
    const date    = document.getElementById('date')?.value    || 'Not specified';
    const time    = document.getElementById('time')?.value    || 'Any time';
    const notes   = document.getElementById('notes')?.value.trim() || '—';

    // Validation
    if (!name)    return showStatus('error', 'Please enter your full name.');
    if (!phone)   return showStatus('error', 'Please enter your phone number.');
    if (!service) return showStatus('error', 'Please select a service.');

    const phoneClean = phone.replace(/[\s\-().+]/g, '');
    if (!/^\d{9,15}$/.test(phoneClean)) {
      return showStatus('error', 'Please enter a valid phone number.');
    }

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Confirming…';

    const payload = {
      name,
      phone,
      service,
      preferredDate : date,
      preferredTime : time,
      notes,
      submittedAt   : new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
      pageUrl       : window.location.href,
      userAgent     : navigator.userAgent,
    };

    const { ok, error } = await sendToSheets(payload);

    if (ok) {
      showStatus('success', '✓ Booking received! We\'ll confirm your appointment via WhatsApp within 30 minutes.');
      form.reset();
    } else {
      console.error('[Sheets] Error:', error);
      showStatus('error', 'Something went wrong. Please WhatsApp us directly to book.');
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-calendar-check"></i> Confirm Booking';
  });


  async function sendToSheets(payload) {
    if (!SHEETS_WEBHOOK_URL || SHEETS_WEBHOOK_URL.includes('YOUR_APPS_SCRIPT')) {
      console.warn(
        '[Sheets] SHEETS_WEBHOOK_URL not configured.\n' +
        'Deploy Code.gs and paste the Web App URL at the top of script.js.'
      );
      await delay(800);
      return { ok: true };
    }

    try {
      const res = await fetch(SHEETS_WEBHOOK_URL, {
        method  : 'POST',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
        body    : new URLSearchParams(payload).toString(),
      });

      if (!res.ok) {
        return { ok: false, error: `HTTP ${res.status}` };
      }

      const json = await res.json().catch(() => ({ result: 'success' }));
      if (json.result === 'error') return { ok: false, error: json.error };
      return { ok: true };

    } catch (err) {
      return { ok: false, error: err.message };
    }
  }


  function showStatus(type, message) {
    if (!formStatus) return;
    formStatus.textContent = message;
    formStatus.style.display = 'block';

    if (type === 'success') {
      formStatus.style.background = 'rgba(201,168,76,0.1)';
      formStatus.style.color      = '#8a6b10';
      formStatus.style.border     = '1px solid rgba(201,168,76,0.35)';
    } else {
      formStatus.style.background = 'rgba(196,133,110,0.1)';
      formStatus.style.color      = '#8a3a20';
      formStatus.style.border     = '1px solid rgba(196,133,110,0.35)';
    }

    setTimeout(() => { formStatus.style.display = 'none'; },
      type === 'success' ? 7000 : 5000);
  }
}


// ===== SCROLL REVEAL =====
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const els = document.querySelectorAll(
    '.svc-card, .testi-card, .gal-item, .pillar, .info-item'
  );

  els.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.055}s, transform 0.6s ease ${i * 0.055}s`;
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  els.forEach(el => obs.observe(el));
}


// ===== FOOTER YEAR =====
function setYear() {
  const el = document.getElementById('yr');
  if (el) el.textContent = new Date().getFullYear();
}


// ===== UTILITY =====
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
