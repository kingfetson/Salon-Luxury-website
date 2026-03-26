# 💄 Lumière Salon Nairobi — Website

> A luxury, editorial-style landing page for a premium hair and beauty salon in Nairobi, Kenya — with live Google Sheets appointment capture built in.

---

## ✨ Design Philosophy

| Attribute | Choice |
|---|---|
| **Aesthetic** | Luxury editorial — warm, refined, tactile |
| **Display Font** | [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) — classic serif with italic flair |
| **Body Font** | [Jost](https://fonts.google.com/specimen/Jost) — geometric, clean, modern |
| **Palette** | Deep Espresso · Warm Cream · Antique Gold · Dusty Rose |
| **Mood** | High-end fashion magazine meets intimate Nairobi neighbourhood salon |

---

## 📁 Project Structure

```
lumiere-salon-nairobi/
│
├── index.html    # Full page markup — semantic HTML5
├── style.css     # All styles — CSS variables, responsive layout
├── script.js     # JavaScript — nav, booking form, Sheets, animations
└── Code.gs       # Google Apps Script — booking capture backend
```

> **Zero build tools. Zero dependencies.** Open `index.html` and it works instantly.

---

## 🗂️ Page Sections

| Section | Description |
|---|---|
| **Hero** | Full-screen salon image, italic headline, dual CTAs, animated stats |
| **Marquee Strip** | Scrolling services ticker in espresso band |
| **Services** | 6-card grid with dark, light & gold card variants, from-pricing labels |
| **Gallery** | Asymmetric CSS grid with tall/wide image spans |
| **About** | Two-column with floating stat card and brand pillars |
| **Testimonials** | 3-column review grid with featured dark card |
| **Booking / Contact** | Split layout — salon info + appointment form |
| **Footer** | Brand column, quick links, contact details, social icons |

---

## 🚀 Quick Start

### 1. Get the files

```bash
git clone https://github.com/yourname/lumiere-salon-nairobi.git
cd lumiere-salon-nairobi
```

Or download and extract the ZIP.

### 2. Open in browser

```bash
# Simplest — just open the file
open index.html

# Better — use VS Code Live Server
# Right-click index.html → Open with Live Server
```

### 3. Customise your details

| Find (in files) | Replace with | File(s) |
|---|---|---|
| `Lumière` | Your salon name | `index.html`, `style.css`, `Code.gs` |
| `+254700000000` | Your real number | `index.html` |
| `hello@lumieresalon.co.ke` | Your email | `index.html` |
| `Westlands Square, 3rd Floor` | Your address | `index.html` |
| `YOUR_APPS_SCRIPT_WEB_APP_URL_HERE` | Your Apps Script URL | `script.js` |

---

## 📊 Google Sheets Booking Integration

Every appointment request from the website is instantly captured in a Google Sheet — fully automatic, zero cost.

### Flow

```
Client fills form  →  script.js POSTs data  →  Code.gs processes it  →  Row added to Sheet
                                                       ↓
                                            Optional email alert to you
```

### Setup (5 minutes)

**Step 1 — Create a Google Sheet**

Go to [sheets.google.com](https://sheets.google.com) → new spreadsheet.
Name it `Lumière Salon – Bookings`.

**Step 2 — Open Apps Script**

Inside the sheet: **Extensions → Apps Script**

**Step 3 — Add the backend**

Delete all existing code. Paste the full contents of `Code.gs`.

To receive email alerts for every new booking, add your email:
```javascript
var NOTIFY_EMAIL = 'you@yoursalon.co.ke';   // line 43 in Code.gs
```

**Step 4 — Deploy**

```
Deploy → New Deployment
  Type          →  Web App
  Execute as    →  Me
  Who has access →  Anyone
```

Click **Deploy** → copy the URL.

**Step 5 — Connect**

Open `script.js`, paste the URL on line 14:

```javascript
const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/YOUR_ID/exec';
```

**Step 6 — Test**

Submit a test booking. A new row should appear in the sheet within seconds.

---

### Sheet Column Structure

| Column | Content | Notes |
|---|---|---|
| **Timestamp** | Date & time, Nairobi EAT | Auto-filled |
| **Client Name** | Full name | From form |
| **Phone** | Phone number | From form |
| **Service** | Selected service | From dropdown |
| **Preferred Date** | Requested date | From form |
| **Preferred Time** | Requested time slot | From form |
| **Notes** | Special requests | From form |
| **Status** | `New` (default) | Update manually |
| **Stylist Assigned** | Blank — fill manually | Assign a stylist |
| **Page URL** | Referral page | Auto-filled |
| **Device** | Mobile / Desktop | Auto-detected |

> 💡 **Tip:** Add a Data Validation dropdown on the Status column:
> `New` → `Confirmed` → `Rescheduled` → `Completed` → `No-Show`

> 💡 **Tip:** New rows are automatically highlighted in a light gold tint for quick scanning.

---

## 🎨 Design System

### Colour Palette

```css
--cream:       #f9f5ef   /* Page background */
--cream-dark:  #f0ead9   /* Alternate section background */
--espresso:    #1a1209   /* Primary dark — text, dark cards, footer */
--espresso-mid:#2d1f0e   /* Contact section background */
--gold:        #c9a84c   /* Signature accent — icons, underlines, highlights */
--gold-light:  #e8c97a   /* Hero gold on dark backgrounds */
--blush:       #e8c4b8   /* Soft decorative accent */
--rose:        #c4856e   /* Italic text highlights, error states */
--text-body:   #4a3728   /* Standard body text */
--text-muted:  #8a7060   /* Secondary / caption text */
```

### Fonts

| Role | Font | Source |
|---|---|---|
| Headlines, italic display | Playfair Display | Google Fonts |
| Body, UI labels, buttons | Jost | Google Fonts |

### Key Animations

| Animation | Element | Behaviour |
|---|---|---|
| `fadeUp` | Hero content | Slides up on page load |
| `marquee` | Services ticker | Continuous horizontal scroll |
| `scrollPulse` | Hero scroll line | Breathing scale pulse |
| Scroll reveal | Cards, pillars, gallery | Fade + slide up on scroll |
| `::after` underline | Nav links, service cards | Grows from left on hover |

---

## ⚙️ Features

- ✅ **Luxury editorial design** — Playfair Display italics, gold accents, cream palette
- ✅ **Animated marquee** — continuous scrolling services strip
- ✅ **Asymmetric gallery grid** — tall + wide CSS grid spans
- ✅ **3 service card variants** — light, dark (espresso), gold
- ✅ **Floating stat card** on About image with absolute positioning
- ✅ **Full booking form** — name, phone, service, date, time, notes
- ✅ **Google Sheets integration** — live appointment capture + email alerts
- ✅ **Mobile drawer navigation** — slide-in panel, overlay, Escape key
- ✅ **Scroll reveal animations** — `IntersectionObserver`, staggered delays
- ✅ **Sticky header** — transparent → solid with shadow on scroll
- ✅ **Floating WhatsApp button** — persistent booking shortcut
- ✅ **Sepia-tinted map** — embedded Google Map styled to match palette
- ✅ **Zero dependencies** — no npm, no bundler, no framework

---

## 📞 Booking Channels

| Channel | Where |
|---|---|
| 📋 Booking form | Contact section → Google Sheets |
| 💬 WhatsApp float | Bottom-right corner (always visible) |
| 💬 WhatsApp header | Header CTA button (desktop) |
| 💬 WhatsApp mobile | Mobile nav bottom button |

---

## 🌍 Deployment

### Recommended — Static Hosts (Free)

| Platform | Free | How |
|---|---|---|
| [Netlify](https://netlify.com) | ✅ | Drag & drop the folder |
| [Vercel](https://vercel.com) | ✅ | Connect GitHub repo |
| [GitHub Pages](https://pages.github.com) | ✅ | Push to `gh-pages` branch |
| [Cloudflare Pages](https://pages.cloudflare.com) | ✅ | Global CDN, instant deploy |

> ⚠️ `Code.gs` is deployed separately in Google Apps Script — not in your hosting folder.

### cPanel / Traditional Hosting

Upload `index.html`, `style.css`, and `script.js` to your `public_html` folder via FTP or File Manager. Point your domain to that folder.

---

## 🖼️ Swapping Images

All images use Unsplash URLs. Replace them with your own salon photos for best results.

**Hero image** — in `style.css`:
```css
.hero-bg {
  background: url('YOUR_HERO_PHOTO_URL') center/cover no-repeat;
}
```

**Gallery images** — in `index.html`, find the `.gal-item` divs:
```html
<div class="gal-item tall" style="background-image:url('YOUR_PHOTO_URL')"></div>
```

**About image** — in `index.html`, find `.about-img`:
```html
<div class="about-img" style="background-image:url('YOUR_TEAM_PHOTO_URL')"></div>
```

---

## 🔧 Customisation Guide

### Add a Service Card

```html
<article class="svc-card">
  <div class="svc-icon"><i class="fas fa-ICON-NAME"></i></div>
  <h3>Service Title</h3>
  <p>Short description of the service.</p>
  <div class="svc-price">From <strong>Ksh X,XXX</strong></div>
  <a href="#contact" class="svc-link">Book Now <i class="fas fa-arrow-right"></i></a>
</article>
```

Add `class="svc-card svc-dark"` for espresso background or `class="svc-card svc-gold"` for the gold gradient.

### Add a Testimonial

```html
<div class="testi-card">
  <div class="testi-quote">"</div>
  <p>"Your client's quote here."</p>
  <div class="testi-footer">
    <div class="testi-av">AB</div>
    <div>
      <strong>Client Name</strong>
      <span>⭐⭐⭐⭐⭐ · Neighbourhood</span>
    </div>
  </div>
</div>
```

### Add a Time Slot to Booking Form

```html
<option>6:00 PM</option>
```

---

## ✅ Pre-Launch Checklist

- [ ] Replace all `+254700000000` with real number
- [ ] Replace email placeholder with real email
- [ ] Update salon address / location details
- [ ] Deploy `Code.gs` and paste Web App URL in `script.js`
- [ ] Set `NOTIFY_EMAIL` in `Code.gs` for booking alerts
- [ ] Test booking form → verify row in Google Sheet
- [ ] Replace Unsplash hero/gallery/about images with real photos
- [ ] Update social media links (Instagram, TikTok, Facebook)
- [ ] Add a real favicon in `<head>`
- [ ] Update service prices (Ksh amounts)
- [ ] Add/remove service cards to match your actual menu
- [ ] Test on mobile — especially booking form
- [ ] Check Google Map embed shows correct location

---

## 📄 License

Free for personal and commercial use. Adapt freely for your salon or clients.

---

<div align="center">

*Lumière — French for "Light"*

**Built for beauty. Designed for Nairobi.**

</div>
