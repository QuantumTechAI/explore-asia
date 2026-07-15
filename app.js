/* ----------------------------------------------------
   EXPLORE ASIA LANDING PAGE — APP.JS (V2)
   ---------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  let configData = null;

  // Global Image Error Capture Listener (Capture phase to catch resource loading failures)
  window.addEventListener('error', (e) => {
    if (e.target && e.target.tagName === 'IMG') {
      const placeholder = (configData && configData.images && configData.images.placeholderImage) 
        ? configData.images.placeholderImage 
        : 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80';
      if (e.target.src !== placeholder) {
        e.target.src = placeholder;
      }
    }
  }, true);

  init();

  async function init() {
    try {
      const response = await fetch('./config.json');
      if (!response.ok) {
        throw new Error(`Failed to load config.json: ${response.status}`);
      }
      configData = await response.json();
      
      setupPreloader();
      injectClientFacts(configData);
      setupPackages(configData.packages);
      setupVideoTestimonials(configData.videoTestimonials);
      setupWrittenTestimonials(configData.writtenTestimonials);
      setupDestinations(configData.destinations);
      setupDestinationModal(configData.destinations);
      setupEnquiryForm();
      setupScrollEffects();
      setupWhatsAppClickTracking();
      setupChinarParticles();

    } catch (error) {
      console.error("Initialization Error:", error);
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.classList.add('fade-out');
    }
  }

  /* --- 6.1 — PRELOADER --- */
  function setupPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    if (sessionStorage.getItem('preloader_shown')) {
      preloader.style.display = 'none';
      return;
    }

    sessionStorage.setItem('preloader_shown', 'true');
    setTimeout(() => {
      preloader.classList.add('fade-out');
    }, 1500);
  }

  /* --- CLIENT FACTS INJECTION --- */
  function injectClientFacts(data) {
    const facts = {...data.clientFacts};
    const images = data.images;

    // Safety fallback for unresolved bracket placeholders
    const defaultFacts = {
      businessName: "Explore Asia",
      tagline: "Explore. Experience. Memories Forever.",
      phone: "+91 94190 12345",
      whatsApp: "919419012345",
      email: "info@exploreasia.in",
      address: "Boulevard Road, Dal Lake, Srinagar, Jammu & Kashmir — 190001",
      rating: "4.9",
      ratingCount: "248"
    };

    // Override any placeholder tags with clean, default facts
    Object.keys(facts).forEach(key => {
      if (!facts[key] || facts[key].toString().includes('[[') || facts[key].toString().includes(']]')) {
        facts[key] = defaultFacts[key] || facts[key];
      }
    });

    const logoImgPath = facts.logo || images.logo;
    if (logoImgPath && !logoImgPath.includes('[[LOGO_')) {
      const logoWrapper = document.querySelector('.logo-wrapper');
      if (logoWrapper) {
        logoWrapper.innerHTML = `
          <img src="${logoImgPath}" alt="${facts.businessName} Logo" class="logo-image" style="height: 48px; object-fit: contain;">
          <div class="logo-text">
            <span class="logo-title">${facts.businessName}</span>
            <span class="logo-subtitle">${facts.tagline}</span>
          </div>
        `;
      }
    }

    const phoneClean = facts.phone.replace(/[^0-9+]/g, '');
    const whatsAppClean = facts.whatsApp.replace(/[^0-9]/g, '');

    document.querySelectorAll('.phone-number-text').forEach(el => el.textContent = facts.phone);
    document.querySelectorAll('#header-phone-cta').forEach(el => el.href = `tel:${phoneClean}`);
    document.querySelectorAll('.contact-phone-text').forEach(el => {
      el.textContent = facts.phone;
      el.href = `tel:${phoneClean}`;
    });
    document.querySelectorAll('.contact-phone-link').forEach(el => el.href = `tel:${phoneClean}`);

    document.querySelectorAll('.contact-email-text').forEach(el => {
      el.textContent = facts.email;
      el.href = `mailto:${facts.email}`;
    });

    document.querySelectorAll('.contact-address-text').forEach(el => el.textContent = facts.address);

    const ratingValue = facts.rating || '4.9';
    const ratingCount = facts.ratingCount || '180';
    document.querySelectorAll('.rating-value').forEach(el => el.textContent = ratingValue);
    document.querySelectorAll('.rating-count').forEach(el => el.textContent = ratingCount);

    const generalMsg = `Hi Explore Asia! I'd like to get a quote and plan my Kashmir trip. Could you share some details?`;
    const generalUrl = `https://wa.me/${whatsAppClean}?text=${encodeURIComponent(generalMsg)}`;
    
    document.querySelectorAll('.whatsapp-general-btn').forEach(btn => {
      btn.href = generalUrl;
      btn.setAttribute('target', '_blank');
      btn.setAttribute('rel', 'noopener noreferrer');
    });

    const storyImg = document.getElementById('parallax-story-img');
    if (storyImg && images.ourStoryBg && !images.ourStoryBg.includes('[[OUR_STORY')) {
      storyImg.src = images.ourStoryBg;
    }

    const mapImg = document.querySelector('.static-map-img');
    if (mapImg && images.mapStaticBg && !images.mapStaticBg.includes('[[MAP_')) {
      mapImg.src = images.mapStaticBg;
    }

    // Inject sky image overlay background
    const skyOverlay = document.getElementById('sky-image-overlay');
    if (skyOverlay && images.heroBg && !images.heroBg.includes('[[HERO_')) {
      skyOverlay.style.backgroundImage = `url('${images.heroBg}')`;
    }
  }

  /* --- 6.7 — TOUR PACKAGES (CAROUSEL & FILTER ENGINE) --- */
  let packageCarouselOffset = 0;

  function setupPackages(packages) {
    const track = document.getElementById('packages-carousel-track');
    const filterContainer = document.getElementById('packages-filters');
    const prevBtn = document.getElementById('packages-prev-btn');
    const nextBtn = document.getElementById('packages-next-btn');
    const footerPackagesList = document.getElementById('footer-packages-list');
    
    if (!track) return;

    // A. Populate categories dynamically
    const categories = ['all', ...new Set(packages.map(p => p.category))];
    filterContainer.innerHTML = '';
    categories.forEach((cat, index) => {
      const btn = document.createElement('button');
      btn.className = `filter-tab ${index === 0 ? 'active' : ''}`;
      btn.dataset.category = cat;
      btn.textContent = cat === 'all' ? 'All Packages' : cat;
      filterContainer.appendChild(btn);

      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        
        // Reset Carousel Translation on filter change
        packageCarouselOffset = 0;
        track.style.transform = `translateX(0px)`;
        
        renderFilteredPackages(cat, packages);
      });
    });

    // B. Build footer package list
    if (footerPackagesList) {
      footerPackagesList.innerHTML = '';
      packages.slice(0, 4).forEach(pkg => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#packages" class="footer-pkg-link">${pkg.name}</a>`;
        footerPackagesList.appendChild(li);
      });
      document.querySelectorAll('.footer-pkg-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('packages');
          if (target) {
            window.scrollTo({
              top: target.offsetTop - 80,
              behavior: 'smooth'
            });
          }
        });
      });
    }

    // C. Horizontal Slide controls
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const card = track.querySelector('.package-card');
        if (!card) return;
        
        const cardWidth = card.offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 32;
        
        const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;
        packageCarouselOffset = Math.min(packageCarouselOffset + cardWidth + gap, maxScroll);
        
        track.style.transform = `translateX(-${packageCarouselOffset}px)`;
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const card = track.querySelector('.package-card');
        if (!card) return;
        
        const cardWidth = card.offsetWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.gap) || 32;
        
        packageCarouselOffset = Math.max(packageCarouselOffset - cardWidth - gap, 0);
        track.style.transform = `translateX(-${packageCarouselOffset}px)`;
      });
    }

    // D. Mobile Touch Swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    track.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < touchStartX - 40 && nextBtn) {
        nextBtn.click();
      }
      if (touchEndX > touchStartX + 40 && prevBtn) {
        prevBtn.click();
      }
    }, {passive: true});

    // Initial render
    renderFilteredPackages('all', packages);
  }

  function renderFilteredPackages(category, allPackages) {
    const track = document.getElementById('packages-carousel-track');
    track.style.opacity = '0';

    setTimeout(() => {
      track.innerHTML = '';
      
      const filtered = category === 'all' 
        ? allPackages 
        : allPackages.filter(p => p.category === category);

      if (filtered.length === 0) {
        track.innerHTML = '<div class="packages-loading">No packages found.</div>';
        track.style.opacity = '1';
        return;
      }

      filtered.forEach(pkg => {
        const card = document.createElement('div');
        card.className = `package-card`;
        card.dataset.category = pkg.category;

        const originalPriceStr = pkg.priceOriginal.toLocaleString('en-IN');
        const discountedPriceStr = pkg.priceDiscount.toLocaleString('en-IN');
        
        // WhatsApp text encoding
        const whatsAppMsg = `Hi Explore Asia! I'm interested in the ${pkg.name} package (${pkg.duration}, ₹${discountedPriceStr}${pkg.priceSuffix}). Could you share more details and check availability?`;
        const whatsAppCleanNumber = configData.clientFacts.whatsApp.replace(/[^0-9]/g, '');
        const encodedUrl = `https://wa.me/${whatsAppCleanNumber}?text=${encodeURIComponent(whatsAppMsg)}`;

        card.innerHTML = `
          <div class="package-img-wrapper">
            <img class="package-img" src="${pkg.image}" alt="Scenic view of ${pkg.name} in Kashmir" loading="lazy">
            <span class="package-badge">${pkg.category}</span>
            <span class="package-duration-badge">${pkg.duration}</span>
          </div>
          <div class="package-body">
            <div>
              <div class="package-rating">
                <i class="fa-solid fa-star"></i> <span>${pkg.rating.toFixed(1)}</span>
              </div>
              <h3>${pkg.name}</h3>
              <p class="package-itinerary">${pkg.itinerary}</p>
            </div>
            <div>
              <div class="package-price-row">
                <div class="package-price-wrapper">
                  <span class="package-price-label">Best Deal</span>
                  <span class="price-original">₹${originalPriceStr}</span>
                  <span class="price-discounted">₹${discountedPriceStr}</span>
                </div>
                <span class="price-suffix">${pkg.priceSuffix}</span>
              </div>
              <div class="package-card-ctas">
                <a href="${encodedUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp-dynamic package-whatsapp-cta" data-pkg-name="${pkg.name}" data-pkg-price="${pkg.priceDiscount}">
                  <i class="fa-brands fa-whatsapp"></i> Book on WhatsApp
                </a>
              </div>
            </div>
          </div>
        `;

        track.appendChild(card);
      });

      // Bind dynamic conversion GTM analytics hooks on package card click
      track.querySelectorAll('.package-whatsapp-cta').forEach(button => {
        button.addEventListener('click', (e) => {
          const pkgName = button.dataset.pkgName;
          const pkgPrice = parseFloat(button.dataset.pkgPrice);
          const pkgCategory = allPackages.find(p => p.name === pkgName)?.category || '';

          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'whatsapp_click',
            packageName: pkgName,
            packagePrice: pkgPrice,
            packageCategory: pkgCategory
          });
        });
      });

      track.style.opacity = '1';
    }, 300);
  }

  /* --- 6.9 — VIDEO TESTIMONIALS (FACADE PATTERN) --- */
  function setupVideoTestimonials(videos) {
    const gallery = document.getElementById('video-gallery');
    const modal = document.getElementById('video-modal-overlay');
    const modalWrapper = document.getElementById('modal-video-wrapper');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!gallery) return;
    gallery.innerHTML = '';

    videos.forEach(vid => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = vid.youtubeUrl.match(regExp);
      const videoId = (match && match[2].length === 11) ? match[2] : null;

      if (!videoId) return;

      const thumbUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

      const card = document.createElement('div');
      card.className = 'video-card';
      card.innerHTML = `
        <div class="video-thumb-wrapper">
          <img class="video-thumb" src="${thumbUrl}" alt="Travel video review by ${vid.name}" loading="lazy">
          <div class="video-overlay">
            <span class="video-traveler-name">${vid.name}</span>
            <span class="video-traveler-desc">${vid.location} • ${vid.package}</span>
          </div>
          <button class="video-play-btn" aria-label="Play video"><i class="fa-solid fa-play"></i></button>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!modal || !modalWrapper) return;
        modalWrapper.innerHTML = `
          <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        `;
        modal.classList.remove('id-hidden');
        
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'video_play_click',
          videoTravelerName: vid.name,
          videoYoutubeId: videoId
        });
      });

      gallery.appendChild(card);
    });

    if (closeBtn && modal && modalWrapper) {
      const closeModal = () => {
        modal.classList.add('id-hidden');
        modalWrapper.innerHTML = ''; 
      };

      closeBtn.addEventListener('click', closeModal);
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('id-hidden')) {
          closeModal();
        }
      });
    }
  }

  /* --- 6.10 — TRAVELER VOICES (WRITTEN TESTIMONIALS SLIDER) --- */
  function setupWrittenTestimonials(reviews) {
    const track = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('reviews-prev-btn');
    const nextBtn = document.getElementById('reviews-next-btn');

    if (!track) return;
    track.innerHTML = '';

    reviews.forEach(rev => {
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide';

      let starsHtml = '';
      for (let i = 0; i < rev.rating; i++) {
        starsHtml += '<i class="fa-solid fa-star"></i>';
      }

      slide.innerHTML = `
        <div class="testimonial-stars">${starsHtml}</div>
        <blockquote class="testimonial-quote">"${rev.text}"</blockquote>
        <div class="testimonial-author">${rev.name}</div>
        <div class="testimonial-location">${rev.city}</div>
      `;
      track.appendChild(slide);
    });

    let index = 0;
    const slidesCount = reviews.length;

    function updateSlider() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        index = (index + 1) % slidesCount;
        updateSlider();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        index = (index - 1 + slidesCount) % slidesCount;
        updateSlider();
      });
    }
    
    // Mobile Touch Swipe
    let reviewTouchStartX = 0;
    track.addEventListener('touchstart', e => {
      reviewTouchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    track.addEventListener('touchend', e => {
      const touchEndX = e.changedTouches[0].screenX;
      if (touchEndX < reviewTouchStartX - 40 && nextBtn) {
        nextBtn.click();
      }
      if (touchEndX > reviewTouchStartX + 40 && prevBtn) {
        prevBtn.click();
      }
    }, {passive: true});

    setInterval(() => {
      index = (index + 1) % slidesCount;
      updateSlider();
    }, 8000);
  }

  /* --- 6.12 — EXPLORE THE VALLEY (DESTINATIONS) --- */
  function setupDestinations(destinations) {
    const container = document.getElementById('destinations-mosaic');
    if (!container) return;

    container.innerHTML = '';
    destinations.forEach(dest => {
      const card = document.createElement('div');
      card.className = 'destination-card';
      card.innerHTML = `
        <div class="destination-img-wrapper">
          <img class="destination-img" src="${dest.image}" alt="Scenic view of ${dest.name} in Kashmir" loading="lazy">
        </div>
        <div class="destination-card-overlay">
          <h3>${dest.name}</h3>
          <p>${dest.description}</p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  /* --- 5. DYNAMIC ARTISTIC DESTINATION MODAL SYSTEM --- */
  function setupDestinationModal(destinations) {
    const modal = document.getElementById('destination-modal');
    const closeBtn = document.getElementById('destination-close-btn');
    const cards = document.querySelectorAll('.destination-card');

    const hero = document.getElementById('dest-modal-hero');
    const title = document.getElementById('dest-modal-title');
    const subtitle = document.getElementById('dest-modal-subtitle');
    const story = document.getElementById('dest-modal-story');
    const galleryTrack = document.getElementById('dest-modal-gallery-track');
    const tipsList = document.getElementById('dest-modal-tips');
    const waDestName = document.getElementById('dest-modal-whatsapp-dest-name');
    const waBtn = document.getElementById('dest-modal-whatsapp-btn');

    if (!modal || !closeBtn) return;

    // Use event delegation on parent mosaic container for dynamic items
    const mosaic = document.getElementById('destinations-mosaic');
    if (mosaic) {
      mosaic.addEventListener('click', (e) => {
        const card = e.target.closest('.destination-card');
        if (!card) return;

        const destName = card.querySelector('h3').textContent.trim();
        const destData = destinations.find(d => d.name === destName);
        if (!destData) return;

        // Populate Modal Fields
        if (hero) hero.style.backgroundImage = `url('${destData.image}')`;
        if (title) title.textContent = destData.name;
        if (subtitle) subtitle.textContent = destData.description;
        if (story) story.textContent = destData.fullStory || 'No story text available yet.';
        
        // Gallery
        if (galleryTrack) {
          galleryTrack.innerHTML = '';
          const galleryImgs = destData.gallery || [destData.image];
          galleryImgs.forEach(imgUrl => {
            const img = document.createElement('img');
            img.className = 'dest-modal-gallery-img';
            img.src = imgUrl;
            img.alt = `${destData.name} gallery image`;
            img.loading = 'lazy';
            galleryTrack.appendChild(img);
          });
        }

        // Tips
        if (tipsList) {
          tipsList.innerHTML = '';
          const tips = destData.travelTips || ['Plan your visit in advance.'];
          tips.forEach(tipText => {
            const li = document.createElement('li');
            li.textContent = tipText;
            tipsList.appendChild(li);
          });
        }

        // WhatsApp CTA Button link formatting
        if (waDestName) waDestName.textContent = destData.name;
        if (waBtn) {
          const waCleanNumber = configData.clientFacts.whatsApp.replace(/[^0-9]/g, '');
          const waMsg = `Hi Explore Asia! I am planning a Kashmir tour and I'd love to include ${destData.name} in my itinerary. Could you help me plan a custom quote?`;
          waBtn.href = `https://wa.me/${waCleanNumber}?text=${encodeURIComponent(waMsg)}`;
          waBtn.setAttribute('target', '_blank');
          waBtn.setAttribute('rel', 'noopener noreferrer');
        }

        // Open Modal
        modal.classList.remove('id-hidden');
        document.body.style.overflow = 'hidden';
        if (window.lenis) window.lenis.stop();

        // GTM Track destination view
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: 'destination_view',
          destinationName: destData.name
        });
      });
    }

    const closeModal = () => {
      modal.classList.add('id-hidden');
      document.body.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('id-hidden')) {
        closeModal();
      }
    });
  }

  /* --- 6.5 — ENQUIRY FORM (WHATSAPP REDIRECT V2) --- */
  function setupEnquiryForm() {
    const form = document.getElementById('landing-enquiry-form');
    const successState = document.getElementById('form-success-state');
    const manualWaBtn = document.getElementById('success-manual-wa-btn');
    const resetBtn = document.getElementById('success-reset-btn');

    if (!form) return;

    const urlParams = new URLSearchParams(window.location.search);
    const utms = ['source', 'medium', 'campaign', 'term', 'content'];
    
    utms.forEach(param => {
      const val = urlParams.get(`utm_${param}`);
      if (val) {
        const inputField = document.getElementById(`utm_${param}`);
        if (inputField) {
          inputField.value = val;
        }
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const date = document.getElementById('form-date').value;
      const adults = parseInt(document.getElementById('form-adults').value) || 2;
      const children = parseInt(document.getElementById('form-children').value) || 0;
      const message = document.getElementById('form-message').value.trim();

      const utmSource = document.getElementById('utm_source').value;
      const utmMedium = document.getElementById('utm_medium').value;
      const utmCampaign = document.getElementById('utm_campaign').value;

      // Construct dynamic message body
      const whatsAppMsg = `Hi Explore Asia! I would like to enquire about a custom Kashmir tour package. Here are my details:
- Name: ${name}
- Phone/WhatsApp: ${phone}
- Email: ${email}
- Travel Start Date: ${date}
- Travelers: ${adults} Adults, ${children} Children
- Special Preferences: ${message || 'None specified'}`;

      const whatsAppCleanNumber = configData.clientFacts.whatsApp.replace(/[^0-9]/g, '');
      const encodedWaUrl = `https://wa.me/${whatsAppCleanNumber}?text=${encodeURIComponent(whatsAppMsg)}`;

      // Push GTM dataLayer conversion events
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'enquiry_form_submit',
        travelDate: date,
        partySize: adults + children,
        utmSource: utmSource,
        utmMedium: utmMedium,
        utmCampaign: utmCampaign
      });

      // Show success state and setup manual trigger fallback
      form.classList.add('hidden');
      if (successState) successState.classList.remove('hidden');
      if (manualWaBtn) {
        manualWaBtn.href = encodedWaUrl;
      }

      // Automatically launch WhatsApp tab
      window.open(encodedWaUrl, '_blank');
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        form.classList.remove('hidden');
        if (successState) successState.classList.add('hidden');
      });
    }
  }

  /* --- WhatsApp General Clicks Analytics Tracking --- */
  function setupWhatsAppClickTracking() {
    document.querySelectorAll('#floating-whatsapp-bubble, #mobile-sticky-whatsapp, #mobile-sticky-call, #header-phone-cta').forEach(element => {
      element.addEventListener('click', () => {
        window.dataLayer = window.dataLayer || [];
        
        if (element.classList.contains('contact-phone-link') || element.id === 'header-phone-cta' || element.id === 'mobile-sticky-call') {
          window.dataLayer.push({
            event: 'call_click',
            phoneNumber: configData?.clientFacts.phone || '[[PHONE_NUMBER]]'
          });
        } else {
          window.dataLayer.push({
            event: 'whatsapp_general_click'
          });
        }
      });
    });
  }

  /* --- PLAYFUL ANIMATION: SPARK DRIFTING CHINAR LEAVES --- */
  function setupChinarParticles() {
    const container = document.getElementById('chinar-leaves-container');
    if (!container) return;

    // Check prefers-reduced-motion setting
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Interval loop to spawn drifting leaves
    setInterval(() => {
      // Spawn leaves only in sunset (golden) and starry night (night) states
      const state = document.body.className;
      if (state !== 'state-golden' && state !== 'state-night') return;

      const activeLeaves = container.querySelectorAll('.chinar-leaf');
      if (activeLeaves.length > 15) return; // Keep rendering lightweight

      const leaf = document.createElement('div');
      // Alternate color styles
      leaf.className = `chinar-leaf ${Math.random() > 0.5 ? 'orange' : ''}`;

      // Randomize layout properties
      const startX = Math.random() * 100; // 0 to 100vw
      const sizeScale = 0.5 + Math.random() * 0.8; // 0.5x to 1.3x size
      const duration = 10 + Math.random() * 8; // 10s to 18s duration

      leaf.style.left = `${startX}vw`;
      leaf.style.transform = `scale(${sizeScale})`;
      leaf.style.animationDuration = `${duration}s`;

      container.appendChild(leaf);

      // DOM Cleanup
      setTimeout(() => {
        leaf.remove();
      }, duration * 1000);

    }, 2500);
  }

  /* --- 6.9 — SMOOTH SCROLLING & THE LIVING SKYLINE SHIFTS --- */
  function setupScrollEffects() {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false
    });
    window.lenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const hash = this.getAttribute('href');
        if (hash === '#') return;

        const target = document.querySelector(hash);
        if (target) {
          lenis.scrollTo(target, {
            offset: -80
          });
          
          const mobileMenuBtn = document.getElementById('mobile-menu-btn');
          const mobileNav = document.getElementById('mobile-nav');
          if (mobileMenuBtn && mobileMenuBtn.classList.contains('open')) {
            mobileMenuBtn.classList.remove('open');
            if (mobileNav) mobileNav.style.display = 'none';
          }
        }
      });
    });

    const skyBackdrop = document.getElementById('sky-backdrop');
    if (skyBackdrop) {
      skyBackdrop.innerHTML = `
        <div class="sky-layer dawn active"></div>
        <div class="sky-layer day"></div>
        <div class="sky-layer golden"></div>
        <div class="sky-layer night"></div>
      `;
    }

    const skyLayers = {
      dawn: document.querySelector('.sky-layer.dawn'),
      day: document.querySelector('.sky-layer.day'),
      golden: document.querySelector('.sky-layer.golden'),
      night: document.querySelector('.sky-layer.night')
    };

    const header = document.getElementById('main-header');
    const backToTop = document.getElementById('back-to-top-btn');
    const compassNeedle = document.querySelector('.compass-needle-svg');
    const storyImg = document.getElementById('parallax-story-img');
    const trustStats = document.querySelectorAll('.stat-numberCount');
    let statsAnimated = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPct = docHeight > 0 ? scrollY / docHeight : 0;

      if (header) {
        if (scrollY > 80) {
          header.classList.add('sticky');
        } else {
          header.classList.remove('sticky');
        }
      }

      if (backToTop) {
        if (scrollY > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }

        if (compassNeedle && !prefersReducedMotion) {
          compassNeedle.style.transform = `rotate(${scrollY * 0.4}deg)`;
        }
      }

      if (storyImg && !prefersReducedMotion && window.innerWidth > 768) {
        const bounds = storyImg.parentElement.getBoundingClientRect();
        const elementInView = bounds.top < window.innerHeight && bounds.bottom > 0;
        if (elementInView) {
          const offset = (window.innerHeight - bounds.top) * 0.12;
          storyImg.style.transform = `translateY(${offset - 40}px)`;
        }
      } else if (storyImg) {
        storyImg.style.transform = 'none';
      }

      if (!prefersReducedMotion) {
        updateSkyGradient(scrollPct, skyLayers);
      }

      if (!statsAnimated) {
        const trustSection = document.querySelector('.trust-bar-section');
        if (trustSection) {
          const rect = trustSection.getBoundingClientRect();
          if (rect.top < window.innerHeight - 50) {
            animateStats(trustStats);
            statsAnimated = true;
          }
        }
      }
    });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        lenis.scrollTo(0, {
          duration: 1.5
        });
      });
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileMenuBtn && mobileNav) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        const isOpen = mobileMenuBtn.classList.contains('open');
        mobileNav.style.display = isOpen ? 'block' : 'none';
      });
    }
  }

  function animateStats(stats) {
    stats.forEach(stat => {
      const target = parseFloat(stat.dataset.target);
      const isDecimal = stat.dataset.decimals === '1';
      const duration = 2000;
      const startTime = performance.now();

      function updateCount(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentVal = easeProgress * target;

        if (isDecimal) {
          stat.textContent = currentVal.toFixed(1);
        } else {
          stat.textContent = Math.floor(currentVal).toLocaleString();
        }

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        }
      }

      requestAnimationFrame(updateCount);
    });
  }

  function updateSkyGradient(scrollPct, layers) {
    Object.values(layers).forEach(layer => {
      if (layer) layer.classList.remove('active');
    });

    if (scrollPct <= 0.18) {
      if (layers.dawn) layers.dawn.classList.add('active');
      document.body.className = 'state-dawn';
    } 
    else if (scrollPct > 0.18 && scrollPct <= 0.55) {
      if (layers.day) layers.day.classList.add('active');
      document.body.className = 'state-day';
    } 
    else if (scrollPct > 0.55 && scrollPct <= 0.80) {
      if (layers.golden) layers.golden.classList.add('active');
      document.body.className = 'state-golden';
    } 
    else {
      if (layers.night) layers.night.classList.add('active');
      document.body.className = 'state-night';
    }
  }
});
