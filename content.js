document.addEventListener("DOMContentLoaded", () => {

  // INTRO
  const nameEl = document.getElementById("introName");
  const degreeEl = document.getElementById("introDegree");
  const introEl = document.getElementById("introText");

  const savedName = localStorage.getItem("portfolio_intro_name");
  const savedDegree = localStorage.getItem("portfolio_intro_degree");
  const savedIntro = localStorage.getItem("portfolio_intro_text");

  if (savedName) nameEl.textContent = savedName;
  if (savedDegree) degreeEl.textContent = savedDegree;
  if (savedIntro) introEl.textContent = savedIntro;

  // SKILLS
  const savedSkills = JSON.parse(localStorage.getItem("portfolio_skill_titles") || "[]");
  const skillItems = document.querySelectorAll(".skill-item h3");

  savedSkills.forEach((title, i) => {
    if (skillItems[i]) skillItems[i].textContent = title;
  });

  // CONTACTS
  const savedContacts = JSON.parse(localStorage.getItem("portfolio_contacts") || "{}");

  if (savedContacts.email) {
    const el = document.getElementById("contactEmail");
    el.textContent = savedContacts.email;
    el.href = "mailto:" + savedContacts.email;
  }

  if (savedContacts.phone) {
    document.getElementById("contactPhone").textContent = savedContacts.phone;
  }

  if (savedContacts.facebookLabel) {
    const fb = document.getElementById("contactFacebook");
    fb.textContent = savedContacts.facebookLabel;
    fb.href = savedContacts.facebookUrl;
  }

  if (savedContacts.instagramLabel) {
    const ig = document.getElementById("contactInstagram");
    ig.textContent = savedContacts.instagramLabel;
    ig.href = savedContacts.instagramUrl;
  }

  if (savedContacts.linkedinLabel) {
    const li = document.getElementById("contactLinkedIn");
    li.textContent = savedContacts.linkedinLabel;
    li.href = savedContacts.linkedinUrl;
  }

  if (savedContacts.githubLabel) {
    const gh = document.getElementById("contactGithub");
    gh.textContent = savedContacts.githubLabel;
    gh.href = savedContacts.githubUrl;
  }
});
