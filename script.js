document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.project-item');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;

  if (!cards.length || !prevBtn || !nextBtn) {
    console.error("Carousel elements not found. Check your HTML class names.");
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
