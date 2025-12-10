document.addEventListener("DOMContentLoaded", () => {

  // INTRO -------------------------------
  const introForm = document.getElementById("introForm");
  const introStatus = document.getElementById("introStatus");

  document.getElementById("introNameInput").value =
    localStorage.getItem("portfolio_intro_name") || "";

  document.getElementById("introDegreeInput").value =
    localStorage.getItem("portfolio_intro_degree") || "";

  document.getElementById("introTextInput").value =
    localStorage.getItem("portfolio_intro_text") || "";

  introForm.addEventListener("submit", e => {
    e.preventDefault();

    localStorage.setItem("portfolio_intro_name",
      document.getElementById("introNameInput").value);

    localStorage.setItem("portfolio_intro_degree",
      document.getElementById("introDegreeInput").value);

    localStorage.setItem("portfolio_intro_text",
      document.getElementById("introTextInput").value);

    introStatus.textContent = "Intro saved!";
    setTimeout(() => introStatus.textContent = "", 2000);
  });

  // SKILLS ------------------------------
  const DEFAULT_SKILLS = [
    "Computer Hardware Assembly","Web Design","Presentation","CSS","HTML",
    "JAVASCRIPT","Figma","Visual Studio Code","Github","Video Editing",
    "Android Studio","Blender"
  ];

  const skillsForm = document.getElementById("skillsForm");
  const skillsList = document.getElementById("skillsList");
  const skillsStatus = document.getElementById("skillsStatus");

  let savedSkillTitles =
    JSON.parse(localStorage.getItem("portfolio_skill_titles") || "null")
    || DEFAULT_SKILLS;

  skillsList.innerHTML = "";
  savedSkillTitles.forEach((title, i) => {
    skillsList.innerHTML += `
      <label>Skill #${i+1}</label>
      <input id="skillInput${i}" value="${title}">
    `;
  });

  skillsForm.addEventListener("submit", e => {
    e.preventDefault();

    const newTitles = [];
    savedSkillTitles.forEach((_, i) => {
      newTitles.push(document.getElementById(`skillInput${i}`).value);
    });

    localStorage.setItem("portfolio_skill_titles", JSON.stringify(newTitles));

    skillsStatus.textContent = "Skills saved!";
    setTimeout(() => skillsStatus.textContent = "", 2000);
  });

  // CONTACTS ----------------------------
  const contactsForm = document.getElementById("contactsForm");
  const contactsStatus = document.getElementById("contactsStatus");

  let contacts = JSON.parse(localStorage.getItem("portfolio_contacts") || "{}");

  function loadContact(id, key) {
    document.getElementById(id).value = contacts[key] || "";
  }

  loadContact("emailInput", "email");
  loadContact("phoneInput", "phone");
  loadContact("facebookLabelInput", "facebookLabel");
  loadContact("facebookUrlInput", "facebookUrl");
  loadContact("instagramLabelInput", "instagramLabel");
  loadContact("instagramUrlInput", "instagramUrl");
  loadContact("linkedinLabelInput", "linkedinLabel");
  loadContact("linkedinUrlInput", "linkedinUrl");
  loadContact("githubLabelInput", "githubLabel");
  loadContact("githubUrlInput", "githubUrl");

  contactsForm.addEventListener("submit", e => {
    e.preventDefault();

    contacts = {
      email: document.getElementById("emailInput").value,
      phone: document.getElementById("phoneInput").value,
      facebookLabel: document.getElementById("facebookLabelInput").value,
      facebookUrl: document.getElementById("facebookUrlInput").value,
      instagramLabel: document.getElementById("instagramLabelInput").value,
      instagramUrl: document.getElementById("instagramUrlInput").value,
      linkedinLabel: document.getElementById("linkedinLabelInput").value,
      linkedinUrl: document.getElementById("linkedinUrlInput").value,
      githubLabel: document.getElementById("githubLabelInput").value,
      githubUrl: document.getElementById("githubUrlInput").value,
    };

    localStorage.setItem("portfolio_contacts", JSON.stringify(contacts));

    contactsStatus.textContent = "Contacts saved!";
    setTimeout(() => contactsStatus.textContent = "", 2000);
  });

});
