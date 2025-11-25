// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll(".mobile-menu a");
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
  });
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
    mobileMenu.classList.remove("active");
  }
});

// ===== SCROLL BUTTON =====
const scrollBtn = document.querySelector(".scroll-btn");

if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    document.getElementById("next").scrollIntoView({ 
      behavior: "smooth" 
    });
  });
}

// ===== VIDEO MUTE/UNMUTE =====
const video = document.getElementById("heroVideo");
const muteBtn = document.querySelector(".mute-btn");

if (muteBtn && video) {
  muteBtn.addEventListener("click", () => {
    if (video.muted) {
      video.muted = false;
      muteBtn.textContent = "🔊";
    } else {
      video.muted = true;
      muteBtn.textContent = "🔇";
    }
  });
}

// ===== FADE-IN ANIMATION ON SCROLL =====
const fadeElements = document.querySelectorAll(".fade-element");

// Add hidden class initially to all fade elements
fadeElements.forEach(el => {
  el.classList.add("hidden");
});

function reveal() {
  fadeElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (elementTop < windowHeight - 100) {
      el.classList.remove("hidden");
    }
  });
}

// Reveal on scroll
window.addEventListener("scroll", reveal);

// Initial reveal on page load
reveal();

// ===== SMOOTH SCROLLING FOR ALL NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  
  question.addEventListener("click", () => {
    // Close other items
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove("active");
      }
    });
    
    // Toggle current item
    item.classList.toggle("active");
  });
});

// ===== PRICING CARD HOVER EFFECT =====
const pricingCards = document.querySelectorAll(".pricing-card");

pricingCards.forEach(card => {
  card.addEventListener("mouseenter", () => {
    pricingCards.forEach(otherCard => {
      if (otherCard !== card) {
        otherCard.style.opacity = "0.6";
      }
    });
  });
  
  card.addEventListener("mouseleave", () => {
    pricingCards.forEach(otherCard => {
      otherCard.style.opacity = "1";
    });
  });
});

// ===== STATION CARDS - REAL-TIME UPDATE SIMULATION =====
function updateStationAvailability() {
  const stationStatuses = document.querySelectorAll(".station-status");
  
  stationStatuses.forEach(status => {
    // Skip if it's not supposed to change
    if (Math.random() > 0.3) return;
    
    const currentText = status.textContent;
    const currentNumber = parseInt(currentText.match(/\d+/)[0]);
    
    // Randomly change bike count by -1, 0, or +1
    const change = Math.floor(Math.random() * 3) - 1;
    const newNumber = Math.max(0, Math.min(20, currentNumber + change));
    
    status.textContent = ${newNumber} bikes available;
    
    // Update status class
    if (newNumber > 5) {
      status.className = "station-status available";
    } else if (newNumber > 0) {
      status.className = "station-status limited";
    }
  });
}

// Update station availability every 10 seconds
setInterval(updateStationAvailability, 10000);

// ===== COUNTER ANIMATION FOR STATS =====
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector(".stats-section");
let statsAnimated = false;

function checkStatsVisibility() {
  if (!statsSection || statsAnimated) return;
  
  const sectionTop = statsSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;
  
  if (sectionTop < windowHeight - 200) {
    statsAnimated = true;
    
    // Animate the percentage numbers (if they're just numbers)
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(stat => {
      const text = stat.textContent;
      const numberMatch = text.match(/\d+/);
      if (numberMatch) {
        const targetNumber = parseInt(numberMatch[0]);
        const suffix = text.replace(numberMatch[0], '');
        
        // Animate the number
        let current = 0;
        const increment = targetNumber / 60; // 60 frames
        
        const animation = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            stat.textContent = targetNumber + suffix;
            clearInterval(animation);
          } else {
            stat.textContent = Math.floor(current) + suffix;
          }
        }, 30);
      }
    });
  }
}

window.addEventListener("scroll", checkStatsVisibility);
checkStatsVisibility(); // Check on load

// ===== BUTTON CLICK HANDLERS =====
const allButtons = document.querySelectorAll(".btn");

allButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    // Create ripple effect
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
    
    // Handle different button actions
    const buttonText = button.textContent.toLowerCase();
    
    if (buttonText.includes("download") || buttonText.includes("app")) {
      alert("🎉 Fleet Bikes app will be available soon on App Store and Google Play!");
    } else if (buttonText.includes("contact")) {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    } else if (buttonText.includes("learn more")) {
      document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
    } else if (buttonText.includes("get started")) {
      alert("📱 Sign up coming soon! Download the app to get started.");
    } else if (buttonText.includes("subscribe") || buttonText.includes("get pass")) {
      alert("💳 Payment integration coming soon! Stay tuned.");
    }
  });
});

// Add ripple effect CSS dynamically
const style = document.createElement("style");
style.textContent = `
  .btn {
    position: relative;
    overflow: hidden;
  }
  
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
  }
  
  @keyframes ripple-animation {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===== PARALLAX EFFECT FOR HERO =====
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = translateY(${scrolled * 0.5}px);
  }
});

// ===== LOADING ANIMATION =====
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = "1";
  }, 100);
});

// ===== CONSOLE MESSAGE =====
console.log("%c🚲 Fleet Bikes", "color: #4CAF50; font-size: 24px; font-weight: bold;");
console.log("%cSmart Campus Mobility Solution", "color: #888; font-size: 14px;");
console.log("%cDeveloped by: Kishlay & Savitender (ID: 231302050)", "color: #666; font-size: 12px;");
console.log("%cSGT University", "color: #444; font-size: 12px;");

// ===== PREVENT DEFAULT VIDEO CONTROLS =====
if (video) {
  video.controls = false;
  video.disablePictureInPicture = true;
}