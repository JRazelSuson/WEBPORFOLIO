
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-item');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;

  
  if (!cards.length || !prevBtn || !nextBtn) {
    console.warn("Carousel elements not found. Skipping carousel setup.");
    return;
  }

  function updateActiveCard() {
    cards.forEach((card, index) => {
      card.classList.toggle('active', index === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateActiveCard();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateActiveCard();
  });

  updateActiveCard();
});


document.addEventListener('keydown', (e) => {

  const isCtrlShiftA =
    e.ctrlKey &&
    e.shiftKey &&
    (e.key === 'a' || e.key === 'A');

  if (isCtrlShiftA) {
    e.preventDefault();
    window.location.href = 'admin.html';
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.logo');
  if (!logo) return;

  let clickCount = 0;
  let clickTimer = null;

  logo.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 3) {
      
      clickCount = 0;
      clearTimeout(clickTimer);
      window.location.href = 'admin.html';
      return;
    }

    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
      clickCount = 0;
    }, 1000);
  });
});
