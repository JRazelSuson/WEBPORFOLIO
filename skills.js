// skills.js
// Tab filtering for skills section
(function(){
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillItems = document.querySelectorAll('.skill-item');

  if (!skillTabs.length || !skillItems.length) return;

  function filterSkills(category) {
    skillItems.forEach(item => {
      const itemCategory = item.getAttribute('data-category');
      if (category === 'all' || itemCategory === category) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  // Click handlers for tabs
  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      skillTabs.forEach(t => t.classList.remove('active'));
      // Add active to clicked tab
      tab.classList.add('active');
      // Filter skills
      const category = tab.getAttribute('data-skill');
      filterSkills(category);
    });
  });

  // Initialize with 'all' category
  filterSkills('all');
})();
