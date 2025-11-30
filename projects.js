// projects.js
// Toggle between carousel and all projects view
(function(){
  const viewBtns = document.querySelectorAll('.project-view-btn');
  const carouselView = document.getElementById('carousel-view');
  const allView = document.getElementById('all-view');

  if (!viewBtns.length || !carouselView || !allView) return;

  function switchView(viewType) {
    // Update buttons
    viewBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-view="${viewType}"]`).classList.add('active');

    // Show/hide views
    if (viewType === 'carousel') {
      carouselView.classList.remove('hidden');
      allView.classList.add('hidden');
    } else if (viewType === 'all') {
      carouselView.classList.add('hidden');
      allView.classList.remove('hidden');
    }
  }

  // Click handlers
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const viewType = btn.getAttribute('data-view');
      switchView(viewType);
    });
  });

  // Initialize with carousel view
  switchView('carousel');
})();
