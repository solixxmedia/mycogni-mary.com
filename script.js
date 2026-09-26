/* ============================================
   Cognimary — Main JavaScript
   Features: Hidden Affiliate Links, Mobile Menu, FAQ, Scroll Reveal, Popup
   ============================================ */

// 🔒 CENTRALIZED ORDER LINK (Change this ONE variable to update ALL CTAs)
const ORDER_LINK = "https://hop.clickbank.net/?affiliate=pshree786&vendor=cognicare&pid=pre1&tid=cmry1";

document.addEventListener('DOMContentLoaded', function () {
  
  /* 1. HIDE AFFILIATE LINK ON HOVER & WIRE ALL CTAs */
  const ctaButtons = document.querySelectorAll('.order-btn, a[data-cta]');
  
  ctaButtons.forEach(btn => {
    // Remove href to prevent browser status bar from showing the URL on hover
    btn.setAttribute('href', '#');
    btn.style.cursor = 'pointer';
    
    // Intercept click and open in new tab
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.open(ORDER_LINK, '_blank', 'noopener,noreferrer');
      
      // Optional: Track the click (e.g., for Google Analytics)
      const ctaName = this.getAttribute('data-cta') || 'unknown';
      console.log(`[CTA Clicked]: ${ctaName} -> ${ORDER_LINK}`);
    });
  });

  /* 2. MOBILE NAV TOGGLE */
  const navCollapse = document.getElementById('cmNavCollapse');
  if (navCollapse) {
    navCollapse.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      });
    });
  }

  /* 3. SCROLL REVEAL ANIMATION */
  const revealElements = document.querySelectorAll('.cm-card, .cm-pack, .cm-rev, .cm-acc .accordion-item, .cm-safe__card');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  /* 4. STICKY HEADER SHADOW ON SCROLL */
  const navbar = document.querySelector('.cm-nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(26, 42, 34, 0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }

  /* 5. PURCHASE PROOF POPUP */
  const names = ['James', 'Andrew B.', 'Harper Lewis', 'Robert L.', 'Michael R', 'William Harris', 'Daniel Carter', 'Brian', 'Mark Brooks', 'Devid Johnson', 'Jacob Reed', 'Sarah M.', 'Linda R.', 'Susan K.'];
  const cities = ['Austin, TX', 'Miami, FL', 'Seattle, WA', 'Denver, CO', 'Phoenix, AZ', 'Chicago, IL', 'New York, NY', 'Los Angeles, CA', 'Atlanta, GA', 'Nashville, TN', 'Portland, OR', 'Dallas, TX', 'Boston, MA', 'San Diego, CA'];

  function showPurchasePopup() {
    const popup = document.getElementById('purchasePopup');
    const nameEl = document.getElementById('popupName');
    const loc = document.getElementById('popupLocation');
    if (!popup || !nameEl || !loc) return;
    nameEl.textContent = names[Math.floor(Math.random() * names.length)];
    loc.textContent = cities[Math.floor(Math.random() * cities.length)];
    popup.classList.add('show');
    setTimeout(function () { popup.classList.remove('show'); }, 5000);
  }
  setTimeout(showPurchasePopup, 4000 + Math.random() * 1000);
  setInterval(showPurchasePopup, 30000 + Math.random() * 15000);

});