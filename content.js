// content.js
// Reads saved data from localStorage and applies it to the portfolio page

document.addEventListener('DOMContentLoaded', () => {
  // ===== Intro section =====
  const nameEl = document.getElementById('introName');
  const degreeEl = document.getElementById('introDegree');
  const introTextEl = document.getElementById('introText');

  const savedName = localStorage.getItem('portfolio_intro_name');
  const savedDegree = localStorage.getItem('portfolio_intro_degree');
  const savedIntroText = localStorage.getItem('portfolio_intro_text');

  if (nameEl && savedName) nameEl.textContent = savedName;
  if (degreeEl && savedDegree) degreeEl.textContent = savedDegree;
  if (introTextEl && savedIntroText) introTextEl.textContent = savedIntroText;

  // ===== Skills titles =====
  const savedSkillTitlesRaw = localStorage.getItem('portfolio_skill_titles');
  if (savedSkillTitlesRaw) {
    try {
      const titles = JSON.parse(savedSkillTitlesRaw);
      const skillTitleEls = document.querySelectorAll('.skill-item h3');
      skillTitleEls.forEach((el, idx) => {
        if (titles[idx]) {
          el.textContent = titles[idx];
        }
      });
    } catch (e) {
      console.error('Error parsing skill titles from storage', e);
    }
  }

  // ===== Contacts =====
  const contactsRaw = localStorage.getItem('portfolio_contacts');
  if (contactsRaw) {
    try {
      const contacts = JSON.parse(contactsRaw);

      const emailEl = document.getElementById('contactEmail');
      const phoneEl = document.getElementById('contactPhone');
      const fbEl = document.getElementById('contactFacebook');
      const igEl = document.getElementById('contactInstagram');
      const liEl = document.getElementById('contactLinkedIn');
      const ghEl = document.getElementById('contactGithub');

      if (emailEl && contacts.email) {
        emailEl.textContent = contacts.email;
        emailEl.href = 'mailto:' + contacts.email;
      }

      if (phoneEl && contacts.phone) {
        phoneEl.textContent = contacts.phone;
        phoneEl.href = 'tel:' + contacts.phone.replace(/\s+/g, '');
      }

      if (fbEl && contacts.facebookUrl) {
        fbEl.href = contacts.facebookUrl;
        fbEl.textContent = contacts.facebookLabel || contacts.facebookUrl;
      }

      if (igEl && contacts.instagramUrl) {
        igEl.href = contacts.instagramUrl;
        igEl.textContent = contacts.instagramLabel || contacts.instagramUrl;
      }

      if (liEl && contacts.linkedinUrl) {
        liEl.href = contacts.linkedinUrl;
        liEl.textContent = contacts.linkedinLabel || contacts.linkedinUrl;
      }

      if (ghEl && contacts.githubUrl) {
        ghEl.href = contacts.githubUrl;
        ghEl.textContent = contacts.githubLabel || contacts.githubUrl;
      }

    } catch (e) {
      console.error('Error parsing contacts from storage', e);
    }
  }
});
