document.addEventListener('DOMContentLoaded', () => {
  // =========================
  // 1. PROJECT CAROUSEL LOGIC
  // =========================
  const cards = document.querySelectorAll('.project-item');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  let currentIndex = 0;

  if (cards.length && prevBtn && nextBtn) {
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
  } else {
    console.warn('Carousel elements not found on this page. Skipping carousel setup.');
  }

  // =====================================
  // 2. HIDDEN ADMIN ACCESS: LOGO TRIPLE CLICK
  // =====================================
  const logo = document.querySelector('.logo');
  if (logo) {
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
  }

  // OPTIONAL: keyboard shortcut Ctrl+Shift+A
  document.addEventListener('keydown', (e) => {
    const isCtrlShiftA = e.ctrlKey && e.shiftKey && (e.key === 'a' || e.key === 'A');
    if (isCtrlShiftA) {
      e.preventDefault();
      window.location.href = 'admin.html';
    }
  });

  // =====================================
  // 3. WELCOME GIF OVERLAY (always show)
  // =====================================
  const overlay = document.getElementById('welcomeOverlay');
  const enterBtn = document.getElementById('enterSiteBtn');

  if (overlay && enterBtn) {
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';

    enterBtn.addEventListener('click', () => {
      overlay.classList.remove('visible');
      overlay.classList.add('hidden');
      document.body.style.overflow = '';
    });
  }

  // =====================================
  // 4. OLD-SCHOOL CALENDAR
  // =====================================
  const calendarBody = document.getElementById('calendarBody');
  const monthSpan = document.getElementById('calendarMonth');
  const yearSpan = document.getElementById('calendarYear');
  const prevMonth = document.getElementById('prevMonthBtn');
  const nextMonth = document.getElementById('nextMonthBtn');

  if (calendarBody && monthSpan && yearSpan && prevMonth && nextMonth) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function renderCalendar(year, month) {
      monthSpan.textContent = monthNames[month];
      yearSpan.textContent = year;

      calendarBody.innerHTML = '';

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      let date = 1;

      for (let r = 0; r < 6; r++) {
        const row = document.createElement('tr');

        for (let c = 0; c < 7; c++) {
          const cell = document.createElement('td');

          if (r === 0 && c < firstDay) {
            cell.textContent = '';
          } else if (date > daysInMonth) {
            cell.textContent = '';
          } else {
            cell.textContent = date;

            if (
              date === today.getDate() &&
              year === today.getFullYear() &&
              month === today.getMonth()
            ) {
              cell.classList.add('calendar-today');
            }

            date++;
          }

          row.appendChild(cell);
        }

        calendarBody.appendChild(row);
      }
    }

    renderCalendar(currentYear, currentMonth);

    prevMonth.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
    });

    nextMonth.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
    });
  }
});
