// animations.js
// Simple reveal system using data-anim attributes + IntersectionObserver
(function(){
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setInitialHidden() {
    document.querySelectorAll('[data-anim]').forEach(el => {
      el.classList.add('anim-hidden');
    });
  }

  function applyStagger(el, base = 0) {
    // compute a small delay based on its group and index
    const type = el.getAttribute('data-anim');
    let index = 0;
    if (type) {
      const group = Array.from(document.querySelectorAll('[data-anim="' + type + '"]'));
      index = group.indexOf(el);
    }
    const delay = base + (index * 70);
    el.style.setProperty('--delay', delay + 'ms');
  }

  function observeReveals() {
    if (prefersReducedMotion) {
      // immediately show everything
      document.querySelectorAll('[data-anim]').forEach(el => el.classList.add('anim-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          applyStagger(el);
          el.classList.add('anim-in');
          el.classList.remove('anim-hidden');
        } else {
          // optional: remove on exit to allow re-trigger
          // keep visible once seen
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('[data-anim]').forEach(el => io.observe(el));
  }

  function runHeaderIntro() {
    if (prefersReducedMotion) return;
    const logo = document.querySelector('[data-anim="logo"]');
    const navLinks = document.querySelectorAll('[data-anim="nav-link"]');
    if (logo) {
      logo.style.setProperty('--delay','80ms');
      logo.classList.remove('anim-hidden');
      setTimeout(()=> logo.classList.add('anim-in'), 90);
    }
    navLinks.forEach((a,i)=>{
      a.style.setProperty('--delay', (120 + i*50) + 'ms');
      setTimeout(()=>{ a.classList.remove('anim-hidden'); a.classList.add('anim-in'); }, 120 + i*50 + 40);
    });

    // home intro
    const avatar = document.querySelector('[data-anim="avatar"]');
    const homeContent = document.querySelector('[data-anim="home-content"]');
    if (avatar) { applyStagger(avatar, 220); avatar.classList.remove('anim-hidden'); setTimeout(()=>avatar.classList.add('anim-in'), 260); }
    if (homeContent) { applyStagger(homeContent, 260); homeContent.classList.remove('anim-hidden'); setTimeout(()=>homeContent.classList.add('anim-in'), 320); }
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    setInitialHidden();
    // slight delay so CSS transitions will pick up
    requestAnimationFrame(()=> requestAnimationFrame(()=>{
      runHeaderIntro();
      observeReveals();
    }));
  });
})();
