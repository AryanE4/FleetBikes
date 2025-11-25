// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

initNavbarScroll();
initMobileMenu();
initScrollButton();
initVideoControls();
initFadeInElements();
initSmoothAnchors();
initFaqAccordions();
initPricingHover();
initStationSimulation();
initStatsCounter();
initButtonRipples();
initHeroParallax();
initPageReveal();
initConsoleSignature();
initVideoRestrictions();
initContactForm();

function initNavbarScroll() {
  if (!navbar) return;
  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggleMenu = () => mobileMenu.classList.toggle('active');
  hamburger.addEventListener('click', toggleMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.remove('active'));
  });

  document.addEventListener('click', event => {
    if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
      mobileMenu.classList.remove('active');
    }
  });
}

function initScrollButton() {
  const scrollBtn = document.querySelector('.scroll-btn');
  if (!scrollBtn) return;
  scrollBtn.addEventListener('click', () => {
    document.getElementById('next')?.scrollIntoView({ behavior: 'smooth' });
  });
}

function initVideoControls() {
  const video = document.getElementById('heroVideo');
  const muteBtn = document.querySelector('.mute-btn');
  if (!video || !muteBtn) return;

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    muteBtn.textContent = video.muted ? '🔇' : '🔊';
  });
}

function initFadeInElements() {
  const elements = document.querySelectorAll('.fade-element');
  if (!elements.length) return;

  elements.forEach(el => el.classList.add('hidden'));

  const reveal = () => {
    elements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 100) {
        el.classList.remove('hidden');
      }
    });
  };

  window.addEventListener('scroll', reveal);
  reveal();
}

function initSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      event.preventDefault();
      document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initFaqAccordions() {
  const faqItems = document.querySelectorAll('[data-faq-item]');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-item__trigger');
    if (!trigger) return;

    trigger.addEventListener('click', () => toggleFaqItem(item, faqItems));
    trigger.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleFaqItem(item, faqItems);
      }
    });
  });
}

function toggleFaqItem(targetItem, allItems) {
  const targetTrigger = targetItem.querySelector('.faq-item__trigger');
  const targetPanel = targetItem.querySelector('.faq-item__panel');
  const targetIcon = targetItem.querySelector('.faq-item__icon');
  if (!targetTrigger || !targetPanel) return;

  const isExpanded = targetTrigger.getAttribute('aria-expanded') === 'true';

  allItems.forEach(item => {
    const trigger = item.querySelector('.faq-item__trigger');
    const panel = item.querySelector('.faq-item__panel');
    const icon = item.querySelector('.faq-item__icon');
    if (!trigger || !panel) return;

    trigger.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
    item.classList.remove('faq-item--active');
    if (icon) icon.textContent = '+';
  });

  if (!isExpanded) {
    targetTrigger.setAttribute('aria-expanded', 'true');
    targetPanel.setAttribute('aria-hidden', 'false');
    targetItem.classList.add('faq-item--active');
    if (targetIcon) targetIcon.textContent = '–';
  }
}

function initPricingHover() {
  const pricingCards = document.querySelectorAll('.pricing-card');
  if (!pricingCards.length) return;

  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      pricingCards.forEach(other => {
        if (other !== card) other.style.opacity = '0.6';
      });
    });
    card.addEventListener('mouseleave', () => {
      pricingCards.forEach(other => {
        other.style.opacity = '1';
      });
    });
  });
}

function initStationSimulation() {
  const stationStatuses = document.querySelectorAll('.station-status');
  if (!stationStatuses.length) return;

  const updateStationAvailability = () => {
    stationStatuses.forEach(status => {
      if (Math.random() > 0.3) return;
      const currentNumberMatch = status.textContent.match(/\d+/);
      if (!currentNumberMatch) return;
      const currentNumber = parseInt(currentNumberMatch[0], 10);
      const change = Math.floor(Math.random() * 3) - 1;
      const newNumber = Math.max(0, Math.min(20, currentNumber + change));
      status.textContent = `${newNumber} bikes available`;

      if (newNumber > 5) {
        status.className = 'station-status available';
      } else if (newNumber > 0) {
        status.className = 'station-status limited';
      } else {
        status.className = 'station-status unavailable';
      }
    });
  };

  updateStationAvailability();
  setInterval(updateStationAvailability, 10000);
}

function initStatsCounter() {
  const statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let hasAnimated = false;

  const animateStats = () => {
    if (hasAnimated) return;
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop >= window.innerHeight - 200) return;
    hasAnimated = true;

    statNumbers.forEach(stat => {
      const text = stat.textContent;
      const numberMatch = text.match(/\d+/);
      if (!numberMatch) return;
      const targetNumber = parseInt(numberMatch[0], 10);
      const suffix = text.replace(numberMatch[0], '');
      let current = 0;
      const increment = targetNumber / 60;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          stat.textContent = `${targetNumber}${suffix}`;
          clearInterval(timer);
        } else {
          stat.textContent = `${Math.floor(current)}${suffix}`;
        }
      }, 30);
    });
  };

  window.addEventListener('scroll', animateStats);
  animateStats();
}

function initButtonRipples() {
  const buttons = document.querySelectorAll('.btn');
  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener('click', event => {
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.add('ripple');
      button.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);

      const label = button.textContent.toLowerCase();
      if (label.includes('download') && label.includes('app')) {
        alert('🎉 Fleet Bikes app will be available soon on App Store and Google Play!');
      } else if (label.includes('contact')) {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      } else if (label.includes('learn more')) {
        document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
      } else if (label.includes('get started')) {
        alert('📱 Sign up coming soon! Download the app to get started.');
      } else if (label.includes('subscribe') || label.includes('get pass')) {
        alert('💳 Payment integration coming soon! Stay tuned.');
      }
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    .btn { position: relative; overflow: hidden; }
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    @keyframes ripple-animation {
      to { transform: scale(2); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

function initHeroParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  });
}

function initPageReveal() {
  window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s';
      document.body.style.opacity = '1';
    }, 100);
  });
}

function initConsoleSignature() {
  console.log('%c🚲 Fleet Bikes', 'color: #4CAF50; font-size: 24px; font-weight: bold;');
  console.log('%cSmart Campus Mobility Solution', 'color: #888; font-size: 14px;');
  console.log('%cDeveloped by: Kishlay & Savitender (ID: 231302050)', 'color: #666; font-size: 12px;');
  console.log('%cSGT University', 'color: #444; font-size: 12px;');
}

function initVideoRestrictions() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  video.controls = false;
  video.disablePictureInPicture = true;
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const feedbackEl = contactForm.querySelector('.contact-form__feedback');
  const feedbackText = contactForm.querySelector('.contact-form__message');
  const checkIcon = contactForm.querySelector('.contact-form__check');
  const downloadBtn = contactForm.querySelector('.contact-form__download');
  const submissionStore = [];

  const params = new URLSearchParams(window.location.search);
  const isAdmin = params.get('admin') === 'true';
  if (downloadBtn) {
    downloadBtn.hidden = !isAdmin;
  }

  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const payload = buildPayload(formData);
    const errors = validatePayload(payload);

    if (errors.length) {
      setFeedback(errors[0], false);
      return;
    }

    submissionStore.push(payload);
    setFeedback('Your message has been sent!', true);
    contactForm.reset();

    // ===== Method B — Google Sheets (optional) =====
    // To enable, deploy a Google Apps Script web app and add the endpoint below.
    // sendToGoogleSheets(payload).catch(() => setFeedback('Google Sheets sync failed, but your local copy is safe.', false));
  });

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      if (!submissionStore.length) {
        setFeedback('No submissions to download yet.', false);
        return;
      }
      const blob = new Blob([JSON.stringify(submissionStore, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `fleetbikes-contact-${Date.now()}.json`;
      anchor.click();
      URL.revokeObjectURL(url);
      setFeedback('Export ready! Check your downloads folder.', true);
    });
  }

  function buildPayload(formData) {
    const sanitize = value => (value ? value.toString().trim() : '');
    return {
      fullName: sanitize(formData.get('fullName')),
      studentEmail: sanitize(formData.get('studentEmail')).toLowerCase(),
      phoneNumber: sanitize(formData.get('phoneNumber')),
      subject: sanitize(formData.get('subject')),
      message: sanitize(formData.get('message')),
      timestamp: new Date().toISOString()
    };
  }

  function validatePayload(payload) {
    const errors = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!payload.fullName) {
      errors.push('Please share your full name.');
    }
    if (!payload.studentEmail || !emailPattern.test(payload.studentEmail)) {
      errors.push('Enter a valid student email address.');
    } else if (!payload.studentEmail.endsWith('.edu') && !payload.studentEmail.includes('.ac.')) {
      errors.push('Student email must use your campus domain.');
    }
    if (!payload.subject) {
      errors.push('Subject cannot be empty.');
    }
    if (!payload.message || payload.message.length < 10) {
      errors.push('Message must be at least 10 characters.');
    }

    return errors;
  }

  function setFeedback(message, isSuccess) {
    if (!feedbackEl || !feedbackText) return;
    feedbackEl.classList.add('contact-form__feedback--visible');
    feedbackEl.classList.remove('contact-form__feedback--success', 'contact-form__feedback--error');
    feedbackEl.classList.add(isSuccess ? 'contact-form__feedback--success' : 'contact-form__feedback--error');
    feedbackText.textContent = message;

    if (checkIcon) {
      checkIcon.style.opacity = '0';
      checkIcon.style.transform = 'scale(0.6)';
      checkIcon.textContent = isSuccess ? '✓' : '';
      if (isSuccess) {
        checkIcon.style.animation = 'none';
        void checkIcon.offsetWidth;
        checkIcon.style.animation = '';
      }
    }
  }
}

/*
async function sendToGoogleSheets(payload) {
  const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
  const response = await fetch(scriptURL, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Google Sheets sync failed');
  }
}
*/
