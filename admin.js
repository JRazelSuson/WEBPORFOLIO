// admin.js
// Admin panel logic to save data into localStorage

document.addEventListener('DOMContentLoaded', () => {
  // ===== Defaults (match your current portfolio) =====
  const DEFAULT_INTRO = {
    name: 'James Razel',
    degree: 'BS in Information Technology',
    text: `Hi there! I’m passionate about web design and technology whether it’s coding simple websites, building PCs, 
or experimenting with new tools. Outside of tech, I enjoy photography, music, gaming, and keeping active at the gym. 
All of these inspire my creativity in different ways.`
  };

  const DEFAULT_SKILL_TITLES = [
    'Computer Hardware Assembly',
    'Web Design',
    'Presentation',
    'CSS',
    'HTML',
    'JAVASCRIPT',
    'Figma',
    'Visual Studio Code',
    'Github',
    'Video Editing',
    'Android Studio',
    'Blender'
  ];

  const DEFAULT_CONTACTS = {
    email: 'susonjamesrazel@gmail.com',
    phone: '+63 976 210 5211',
    facebookLabel: 'JRazel Suson',
    facebookUrl: 'https://www.facebook.com/M0kusei',
    instagramLabel: '@m0ku_sei',
    instagramUrl: 'https://www.instagram.com/m0ku_sei/',
    linkedinLabel: 'James Razel Suson',
    linkedinUrl: 'https://www.linkedin.com/in/james-razel-suson-935606335/',
    githubLabel: 'jrazelsuson',
    githubUrl: 'https://github.com/JRazelSuson'
  };

  // ===== Intro form =====
  const introForm = document.getElementById('introForm');
  const introNameInput = document.getElementById('introNameInput');
  const introDegreeInput = document.getElementById('introDegreeInput');
  const introTextInput = document.getElementById('introTextInput');
  const introStatus = document.getElementById('introStatus');

  // Prefill intro fields
  introNameInput.value = localStorage.getItem('portfolio_intro_name') || DEFAULT_INTRO.name;
  introDegreeInput.value = localStorage.getItem('portfolio_intro_degree') || DEFAULT_INTRO.degree;
  introTextInput.value = localStorage.getItem('portfolio_intro_text') || DEFAULT_INTRO.text;

  introForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = introNameInput.value.trim() || DEFAULT_INTRO.name;
    const degree = introDegreeInput.value.trim() || DEFAULT_INTRO.degree;
    const text = introTextInput.value.trim() || DEFAULT_INTRO.text;

    localStorage.setItem('portfolio_intro_name', name);
    localStorage.setItem('portfolio_intro_degree', degree);
    localStorage.setItem('portfolio_intro_text', text);

    introStatus.textContent = '✅ Intro saved! Refresh your portfolio page to see changes.';
    setTimeout(() => introStatus.textContent = '', 4000);
  });

  // ===== Skills form =====
  const skillsForm = document.getElementById('skillsForm');
  const skillsStatus = document.getElementById('skillsStatus');
  const skillsListEl = document.getElementById('skillsList');

  let savedSkillTitles = DEFAULT_SKILL_TITLES;
  const storedSkillsRaw = localStorage.getItem('portfolio_skill_titles');
  if (storedSkillsRaw) {
    try {
      const parsed = JSON.parse(storedSkillsRaw);
      if (Array.isArray(parsed) && parsed.length === DEFAULT_SKILL_TITLES.length) {
        savedSkillTitles = parsed;
      }
    } catch (e) {
      console.warn('Could not parse saved skill titles, using defaults');
    }
  }

  // Build inputs dynamically
  skillsListEl.innerHTML = '';
  savedSkillTitles.forEach((title, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'admin-field';

    const label = document.createElement('label');
    label.textContent = `Skill #${index + 1}`;
    label.setAttribute('for', `skillInput${index}`);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = `skillInput${index}`;
    input.value = title;

    wrapper.appendChild(label);
    wrapper.appendChild(input);
    skillsListEl.appendChild(wrapper);
  });

  skillsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newTitles = [];

    savedSkillTitles.forEach((_, index) => {
      const input = document.getElementById(`skillInput${index}`);
      newTitles.push(input.value.trim() || DEFAULT_SKILL_TITLES[index]);
    });

    localStorage.setItem('portfolio_skill_titles', JSON.stringify(newTitles));
    skillsStatus.textContent = '✅ Skills saved! Refresh your portfolio page to see changes.';
    setTimeout(() => skillsStatus.textContent = '', 4000);
  });

  // ===== Contacts form =====
  const contactsForm = document.getElementById('contactsForm');
  const contactsStatus = document.getElementById('contactsStatus');

  const emailInput = document.getElementById('emailInput');
  const phoneInput = document.getElementById('phoneInput');
  const facebookLabelInput = document.getElementById('facebookLabelInput');
  const facebookUrlInput = document.getElementById('facebookUrlInput');
  const instagramLabelInput = document.getElementById('instagramLabelInput');
  const instagramUrlInput = document.getElementById('instagramUrlInput');
  const linkedinLabelInput = document.getElementById('linkedinLabelInput');
  const linkedinUrlInput = document.getElementById('linkedinUrlInput');
  const githubLabelInput = document.getElementById('githubLabelInput');
  const githubUrlInput = document.getElementById('githubUrlInput');

  // Prefill contacts
  let contactsData = DEFAULT_CONTACTS;
  const storedContactsRaw = localStorage.getItem('portfolio_contacts');
  if (storedContactsRaw) {
    try {
      const parsed = JSON.parse(storedContactsRaw);
      contactsData = { ...DEFAULT_CONTACTS, ...parsed };
    } catch (e) {
      console.warn('Could not parse saved contacts, using defaults');
    }
  }

  emailInput.value = contactsData.email;
  phoneInput.value = contactsData.phone;
  facebookLabelInput.value = contactsData.facebookLabel;
  facebookUrlInput.value = contactsData.facebookUrl;
  instagramLabelInput.value = contactsData.instagramLabel;
  instagramUrlInput.value = contactsData.instagramUrl;
  linkedinLabelInput.value = contactsData.linkedinLabel;
  linkedinUrlInput.value = contactsData.linkedinUrl;
  githubLabelInput.value = contactsData.githubLabel;
  githubUrlInput.value = contactsData.githubUrl;

  contactsForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newContacts = {
      email: emailInput.value.trim() || DEFAULT_CONTACTS.email,
      phone: phoneInput.value.trim() || DEFAULT_CONTACTS.phone,
      facebookLabel: facebookLabelInput.value.trim() || DEFAULT_CONTACTS.facebookLabel,
      facebookUrl: facebookUrlInput.value.trim() || DEFAULT_CONTACTS.facebookUrl,
      instagramLabel: instagramLabelInput.value.trim() || DEFAULT_CONTACTS.instagramLabel,
      instagramUrl: instagramUrlInput.value.trim() || DEFAULT_CONTACTS.instagramUrl,
      linkedinLabel: linkedinLabelInput.value.trim() || DEFAULT_CONTACTS.linkedinLabel,
      linkedinUrl: linkedinUrlInput.value.trim() || DEFAULT_CONTACTS.linkedinUrl,
      githubLabel: githubLabelInput.value.trim() || DEFAULT_CONTACTS.githubLabel,
      githubUrl: githubUrlInput.value.trim() || DEFAULT_CONTACTS.githubUrl
    };

    localStorage.setItem('portfolio_contacts', JSON.stringify(newContacts));

    contactsStatus.textContent = '✅ Contacts saved! Refresh your portfolio page to see changes.';
    setTimeout(() => contactsStatus.textContent = '', 4000);
  });
});
