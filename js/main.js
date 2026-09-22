// Talqeen Academy — Main JS

document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile nav toggle ---
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // --- Floating Arabic letters in hero ---
  const floatingWrap = document.querySelector('.hero-bg-letters');
  if (floatingWrap) {
    const letters = ['ب','ت','ث','ج','ح','خ','د','ر','ز','س','ش','ص','ض','ط','ظ','ع','غ','ف','ق','ك','ل','م','ن','و','ه','ي','ءَ','بَ','تَ','نُ','مِ','بَا','نُو','بِي'];
    for (let i = 0; i < 24; i++) {
      const el = document.createElement('span');
      el.textContent = letters[Math.floor(Math.random() * letters.length)];
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 120 + '%';
      el.style.fontSize = (Math.random() * 32 + 24) + 'px';
      el.style.animationDuration = (Math.random() * 18 + 12) + 's';
      el.style.animationDelay = (Math.random() * 8) + 's';
      floatingWrap.appendChild(el);
    }
  }

  // --- YouTube lazy embed ---
  document.querySelectorAll('.yt-lazy').forEach(wrap => {
    wrap.addEventListener('click', function () {
      const id = this.dataset.id;
      this.innerHTML = `<iframe width="100%" height="100%" style="position:absolute;top:0;left:0;" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen allow="autoplay"></iframe>`;
    });
  });

  // --- Testimonial slider ---
  const track = document.querySelector('.testimonials-track');
  if (track) {
    let current = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const visibleCount = () => window.innerWidth > 1024 ? 3 : window.innerWidth > 640 ? 2 : 1;

    function goTo(idx) {
      const count = visibleCount();
      const max = Math.max(0, cards.length - count);
      current = Math.max(0, Math.min(idx, max));
      const cardW = cards[0].offsetWidth + 24;
      track.style.transition = 'transform 0.4s ease';
      track.style.transform = `translateX(-${current * cardW}px)`;
    }

    document.querySelector('.slider-prev')?.addEventListener('click', () => goTo(current - 1));
    document.querySelector('.slider-next')?.addEventListener('click', () => goTo(current + 1));
  }

  // --- Blog search ---
  const searchInput = document.getElementById('blogSearch');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const q = this.value.toLowerCase();
      document.querySelectorAll('.blog-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
      });
    });
  }

  // --- Update copyright year ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Active nav link ---
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (path.endsWith(href) || (href === 'index.html' && (path === '/' || path.endsWith('/')))) {
      a.style.color = 'white';
      a.style.background = 'rgba(255,255,255,0.12)';
    }
  });

  // --- FAQ accordion ---
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all other FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      
      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // --- Share buttons ---
  document.querySelectorAll('.share-btn').forEach(btn => {
    const id = btn.id;
    if (id && id.includes('-share')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        let shareUrl = '';
        switch(id) {
          case 'x-share':
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
            break;
          case 'facebook-share':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            break;
          case 'linkedin-share':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
            break;
          case 'whatsapp-share':
            shareUrl = `https://wa.me/?text=${title}%20${url}`;
            break;
          case 'telegram-share':
            shareUrl = `https://t.me/share/url?url=${url}&text=${title}`;
            break;
          case 'reddit-share':
            shareUrl = `https://www.reddit.com/submit?url=${url}&title=${title}`;
            break;
        }
        
        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      });
    }
  });
});
