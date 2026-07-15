# MASTER BUILD PROMPT — Explore Asia Landing Page

**How to use this:** Paste everything below into Antigravity as one prompt. Attach the logo file when you start the session. Before you paste, fill in the `[[PLACEHOLDER]]` tags in the Client Facts section with the real phone/WhatsApp/email — I've left the reference site's contact details out on purpose since they belong to a different business.

---

## 1. ROLE

You are acting as both creative director and senior frontend engineer for a design studio. You are building a **single-page, high-conversion landing page** for a Google Ads campaign. This page will be judged on two things equally: does it feel like nothing else in the travel industry, and does it load fast enough and convert well enough to justify ad spend. A beautiful page that's slow or confusing to book from is a failure. A fast page that looks like a Bootstrap template is also a failure. You need both.

Before writing a single line of code, do the planning pass described in Section 4. Do not skip it.

---

## 2. CLIENT FACTS

- **Business name:** Explore Asia
- **Tagline (from logo, use as-is):** "Explore. Experience. Memories Forever."
- **Logo:** attached separately. It shows a circular emblem — a snow peak at the center, an Asian pagoda and a Kashmiri houseboat sitting on a lake in the foreground, a plane banking overhead with a contrail, birds, and a compass rose beneath the wordmark. Palette reads as navy/ink blue + warm orange/amber, on white.
- **Core offering (confirmed by actual site content, see Section 6):** guided tour packages, Kashmir being the flagship destination (Srinagar, Pahalgam, Gulmarg, houseboats, Vaishno Devi), sold as multi-night packages, priced per person or per couple, with WhatsApp/phone as the primary conversion channel.
- **Positioning takeaway:** the logo signals a broader "explore Asia" ambition, but the actual product today is Kashmir tourism. Don't force generic "Asia" stock imagery (temples, unrelated skylines) into the page — lean into Kashmir as the real, specific, textured subject, and let the pagoda/compass motif from the logo show up only as a small accent (the compass, the plane path) rather than competing imagery. Specific beats generic.
- **Contact details — REPLACE BEFORE BUILDING:**
  - Phone / click-to-call: `[[PHONE_NUMBER]]`
  - WhatsApp number (for wa.me links): `[[WHATSAPP_NUMBER]]`
  - Email: `[[EMAIL]]`
  - Physical address / service area: `[[ADDRESS_OR_REGION]]`
  - Google review rating + count (if they have a listing): `[[RATING]]`

---

## 3. WHAT TO TAKE FROM THE REFERENCE SITE, AND WHAT TO THROW AWAY

The screenshots I'm giving you are from a competitor's outdated site (Holiday Kashmir Travels). Use them **only as a content inventory** — the categories of information a Kashmir tour site needs — never as a visual reference. If the output looks like that site with a new paint job, you've failed the brief.

**Take (structure/content patterns only):**
- The shape of the enquiry form (name, email, phone, date of arrival, adults, children, message)
- The idea of a tour package grid with itinerary, duration, strike-through price → discounted price, and a rating
- An About section, a testimonials section, a map/location section, a destinations list, a footer with popular packages and contact info
- The footnote convention ("price based on minimum X adults travelling together")

**Throw away entirely:**
- The visual design, layout, spacing, color scheme, typography, card styling, every animation (there is none worth keeping), the cheap emoji-as-icon treatment on package titles, the generic teal-and-white color scheme, the browser-chrome-style form fields, the low-effort "Message us" chat bubble styling

**Sample package data** (pulled from the reference site's structure so you have real numbers to design against — **flag these to me as placeholder and do not treat them as verified Explore Asia pricing**):

| Package | Itinerary | Duration | Price (struck / actual) |
|---|---|---|---|
| Love in the Valley — Honeymoon Edition | 2N Srinagar, 1N Pahalgam, 2N Gulmarg, 1N Houseboat | 6N/7D | ₹49,999 → ₹42,000 /couple |
| Charismatic Kashmir | 3N Srinagar, 1N Pahalgam, 1N Gulmarg, 1N Houseboat | 6N/7D | ₹19,499 → ₹17,000 /person |
| Whispers of Kashmir | 2N Srinagar, 1N Houseboat | 3N/4D | ₹9,499 → ₹8,500 /person |
| The Allure of Kashmir | 3N Srinagar, 1N Houseboat | 4N/5D | ₹11,499 → ₹8,000 /person |
| The Enchanted Valley | 3N Srinagar, 1N Pahalgam, 1N Houseboat | 5N/6D | ₹15,499 → ₹13,000 /person |
| Essence of Kashmir | 3N Srinagar, 1N Pahalgam, 1N Gulmarg, 1N Houseboat | 6N/7D | ₹17,499 → ₹16,500 /person |
| Captivating Kashmir | 3N Srinagar, 2N Pahalgam, 1N Gulmarg, 1N Houseboat | 7N/8D | ₹19,499 → ₹18,500 /person |
| Kashmir — Heaven Unveiled | 3N Srinagar, 2N Pahalgam, 2N Gulmarg, 1N Houseboat | 8N/9D | ₹27,499 → ₹21,000 /person |
| Vaishno Devi Darshan | 2N Katra, 1N Patnitop | 3N/4D | ₹11,499 → ₹7,600 /person |

Footnote to include: *"Pricing based on a minimum of 4–6 adults travelling together."*

**Destinations list** (for the destinations section, Section 6.9): Srinagar, Gulmarg, Sonamarg, Pahalgam, Leh, Kargil, Yusmarg, Aru Valley, Vaishno Devi, Patnitop, Nishat Garden, Shalimar Garden, Dachigam National Park, Khilanmarg, Dal Lake, Betaab Valley.

**Written testimonials — do not reuse the reference site's actual reviews or names.** Those belong to real people reviewing a different business; copying them onto Explore Asia would be presenting someone else's words as reviews of a company they never used. Write **fresh placeholder testimonial copy** in a similar voice/length (short, warm, specific detail, first name + city), clearly marked as sample copy to be swapped for real Explore Asia reviews before launch.

---

## 4. DESIGN PLANNING PASS (do this before coding)

Work through this explicitly, and show me the plan before you build:

1. **Palette** — 5–6 named hex values derived from the logo and from Kashmir itself (not a generic travel-site teal, not the "cream background + terracotta accent" look, not a near-black-with-neon-accent look — both of those read as default AI design choices regardless of subject, so avoid them here). Starting point to adapt, not copy blindly:
   - Ink Navy `#0B1E33` — primary dark, from the logo's blue
   - Saffron Amber `#E1802E` — primary CTA accent, from the logo's orange
   - Lake Teal `#1E5C63` — secondary, for water/depth
   - Parchment `#F5EFE2` — warm light section background (paper/pashmina feel, not sterile white)
   - Chinar Maroon `#8C3A2B` — sparing accent, from the chinar leaf red seen across Kashmir in autumn
   - Snow White `#FCFBF8`
2. **Typography** — two families, used deliberately:
   - Display: a warm, characterful serif with real presence (e.g. Fraunces) for headlines — it should feel like a heritage travel brand, not a SaaS product
   - Body: a clean, humanist sans (e.g. Inter or Manrope) for readability
   - Use the display face's italic for eyebrows/taglines instead of introducing a third "script" font — that's the cheaper, more disciplined choice
3. **Layout concept** — sketch in prose + ASCII how the page flows (see Section 6 for the section list; you're deciding densities, alternating rhythms, where full-bleed breaks happen)
4. **The signature element** — this is the one idea the whole page gets built around. Proposed direction, adapt if you find something stronger: **"The Living Skyline."** A continuous mountain-ridge silhouette (echoing the peak in the logo) runs behind every section as a fixed/parallax background layer. As the visitor scrolls from hero to footer, the sky behind that ridge shifts through a full Kashmir day — dawn mist over Dal Lake, clear daylight, golden hour over the houseboats, dusk, and a starry night with a few drifting chinar leaves or snowflakes — so the page itself feels like it's living through a day rather than sitting static. This directly answers the brief's ask that the visitor should feel like they're "living in" the page.
5. **Self-critique** — before moving to code, check the plan against the three generic-AI-design defaults (warm cream + terracotta serif; near-black + single neon accent; hairline-rule broadsheet with zero border-radius). If any part of your plan matches one of these by default rather than because the brief demanded it, change it and note what you changed.

---

## 5. TECHNICAL REQUIREMENTS

- **Stack:** static HTML5 + CSS3 + vanilla JS (or a static-exported Next.js page if you prefer working in that framework) — no heavy client-side framework overhead. This is a Google Ads landing page; Core Web Vitals affect Quality Score and cost-per-click directly, so treat performance as a hard constraint, not a nice-to-have.
- **Animation libraries:** GSAP + ScrollTrigger for scroll-driven work (the Living Skyline, section reveals, parallax layers), Lenis or a lightweight custom smooth-scroll for scroll feel. Keep the JS bundle lean — don't pull in a library for something three lines of vanilla JS can do.
- **Performance budget:** target LCP under 2.5s, CLS under 0.1. Serve images as WebP/AVIF with responsive `srcset`, lazy-load everything below the fold, inline critical CSS, defer non-critical JS.
- **YouTube embeds must use a facade/lite-embed pattern** (render a static thumbnail + play button, only load the actual YouTube iframe on click) — a real `<iframe>` per video will tank load time.
- **Responsive:** mobile-first. Most Google Ads traffic for a travel query is mobile. The sticky bottom action bar (Section 6.13) is not optional on mobile.
- **Accessibility:** semantic HTML, visible keyboard focus states, alt text on every image, `prefers-reduced-motion` fallback that disables the parallax/skyline animation and scroll-jacking for anyone who's set that preference.
- **SEO/Ads hygiene:** proper meta title/description, Open Graph tags, `TravelAgency`/`LocalBusiness` schema.org markup, a fast-loading favicon.
- **Conversion tracking hooks:** fire a `dataLayer` event (or equivalent) on: form submit, call-button click, WhatsApp-button click, and each package's "Enquire Now" click. Capture UTM parameters from the URL into hidden form fields so leads are attributable back to the specific ad.
- **WhatsApp links:** use `wa.me/[[WHATSAPP_NUMBER]]?text=` with a prefilled message referencing the specific package when clicked from a package card (e.g. "Hi, I'm interested in the Charismatic Kashmir package").

---

## 6. SECTION-BY-SECTION SPEC

### 6.1 — Preloader
A short (under 1.5s) brand-reveal animation before the page shows: the compass from the logo rotates to find north, or the houseboat draws itself in as an SVG line-animation, then dissolves into the hero. Skippable/instant for repeat visitors (use `sessionStorage` to only show it once per session).

### 6.2 — Sticky header
Transparent over the hero, solidifying (background + shadow) after ~80px of scroll. Logo left, minimal nav (Packages, About, Reviews, Contact — 4 items max, this is a conversion page not a brochure site), a single prominent CTA button on the right ("Plan My Trip" or "Get a Free Quote"), plus the phone number as a click-to-call link next to it on desktop.

### 6.3 — Hero
Full-bleed. Background: the start of the Living Skyline (dawn over Dal Lake — mist, houseboats, distant peaks), subtle ambient motion (drifting mist layer, very slow parallax), not a busy stock photo. Kinetic headline (words animate in on load, staggered) — something like "Kashmir, at its own pace" or "The valley you've been putting off." Subheadline one line, warm and specific, not generic ("Handpicked houseboats, quiet mornings on Dal Lake, and a team that answers the phone"). Two CTAs: primary "Enquire Now" (scrolls to form), secondary "Talk to us on WhatsApp." A small scroll-cue at the bottom (not a generic bouncing chevron — something on-brand, e.g. a thin animated line resembling a Shikara's wake).

### 6.4 — Trust bar
A slim strip overlapping the bottom edge of the hero (glassmorphism card, not a hard-edged div): 4 stats with animated count-up on scroll into view — years of experience, travelers served, Google rating, "24/7 on WhatsApp." Real numbers to be supplied by the client; use sensible placeholders and mark them.

### 6.5 — Enquiry form
This is the primary conversion point — treat it as such, not an afterthought bolted to the bottom. On desktop, consider a form that stays visible as a sticky card while the visitor scrolls through packages (so the CTA is never more than one glance away). Fields: Name, Phone, Email, Preferred travel dates, Adults, Children, Message (optional). Inline validation, a clear success state, and the UTM-capture hidden fields from Section 5.

### 6.6 — Why Explore Asia
A tight USP section — 4 items max, icon + one line each (personalized itineraries, real local guides, transparent pricing, always-on WhatsApp support, or whatever the client actually differentiates on). Micro-interaction on hover (icon comes to life briefly), not a full animation per card — restraint here, save the motion budget for the hero and the skyline.

### 6.7 — Tour packages
The commercial core of the page. Grid of package cards using the data in Section 3. Each card: package name, itinerary summary, duration, strike-through original price → actual price, star rating, three actions (Enquire Now → scrolls to/opens form pre-filled with package name, Call, WhatsApp with prefilled message). Subtle hover tilt/lift, not a cartoonish 3D flip. Consider simple category filter tabs if there's a natural grouping (Honeymoon / Family / Pilgrimage / Adventure) rather than dumping nine cards flat.

### 6.8 — Our story
Narrative section, not a wall of text. A short, specific paragraph (not generic "we love travel" copy) about why this business exists, paired with a parallax image of Srinagar. End with a "Plan My Trip" CTA.

### 6.9 — Video testimonials (new section)
Build this as a reusable component fed by a simple data array, since real video URLs will be added later:

```
const videoTestimonials = [
  { youtubeUrl: "[[PASTE_YOUTUBE_URL_1]]", name: "[[Traveler name]]", location: "[[City]]", package: "[[Package name]]" },
  { youtubeUrl: "[[PASTE_YOUTUBE_URL_2]]", name: "[[Traveler name]]", location: "[[City]]", package: "[[Package name]]" },
  { youtubeUrl: "[[PASTE_YOUTUBE_URL_3]]", name: "[[Traveler name]]", location: "[[City]]", package: "[[Package name]]" }
]
```

Display as a horizontal gallery (or a "film reel" strip) of thumbnail cards — pull each thumbnail from the YouTube video ID automatically (`https://img.youtube.com/vi/{id}/maxresdefault.jpg`), overlay the traveler's name/location/package and a custom play button styled in the site's palette (not YouTube's red). On click, swap the thumbnail for the actual embedded player (facade pattern — see Section 5) so nothing loads from YouTube until the visitor asks for it. Leave the array easy to find and edit — this is the part I'll be updating myself once the client sends real video links.

### 6.10 — Traveler voices (written testimonials)
Written reviews in a carousel or gentle auto-scrolling marquee, star rating, name + city. Use fresh placeholder copy per Section 3 — do not reuse the competitor's actual reviews or names.

### 6.11 — Find us
Custom-styled map (a muted/parchment-toned map style, not default Google blue-and-white, to stay in the page's palette) plus a business info card (address, rating, hours). If a real Google Business listing exists, embed it; otherwise use a static styled map graphic with a pin.

### 6.12 — Explore the valley (destinations)
Take the reference site's flat footer tag-list of destinations and turn it into something worth looking at: an interactive mosaic/grid where each destination name reveals a small image on hover (desktop) or is laid out as a scrollable image-card row (mobile), using the destination list in Section 3.

### 6.13 — Final CTA banner
One last full-width push before the footer — restate the core offer, both CTAs again. If the client wants urgency (seasonal window, limited slots), keep it honest and specific, not a fake countdown timer.

### 6.14 — Footer
Contact details, social icons, quick links to packages, quick links to destinations, business registration info if applicable, copyright line.

### 6.15 — Persistent floating elements
- WhatsApp bubble, bottom-right, gentle pulse animation, prefilled generic message
- Mobile-only sticky bottom bar: Call / WhatsApp / Enquire, always visible, this is the highest-leverage conversion element on mobile traffic from ads
- Back-to-top control styled as something on-brand (a compass needle, a paper boat) rather than a generic up-arrow

---

## 7. QUALITY BAR BEFORE YOU CALL IT DONE

- Works and looks intentional at 375px width, not just desktop
- Every animation respects `prefers-reduced-motion`
- Keyboard focus is visible on every interactive element
- No lorem ipsum anywhere in the final version — every placeholder is clearly marked `[[LIKE_THIS]]` so it's easy for me to find and swap
- The page has exactly one "loud" idea (the Living Skyline) — everything else is disciplined and quiet around it
- Nothing in the final result reads as a reskin of the reference screenshots

---

## 8. THINGS I STILL NEED TO SUPPLY YOU

- Real phone, WhatsApp number, email, address
- Real Google rating/review count if available
- The 2–3 YouTube testimonial video URLs
- High-resolution real photography (Dal Lake, houseboats, Gulmarg, Pahalgam) — don't rely on generic stock imagery if the client can supply their own shots
- Confirmed, verified package names/itineraries/pricing (the table above is structural placeholder pulled from a competitor's site, not confirmed Explore Asia data)
