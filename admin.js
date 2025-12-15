// admin.js (type=module) - Firestore version (replaces localStorage)
import { db } from "./firebase-config.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const portfolioRef = doc(db, "portfolio", "main");

  // ---------- DEFAULTS ----------
  const DEFAULT_SKILLS = [
    "Computer Hardware Assembly",
    "Web Design",
    "Presentation",
    "CSS",
    "HTML",
    "JAVASCRIPT",
    "Figma",
    "Visual Studio Code",
    "Github",
    "Video Editing",
    "Android Studio",
    "Blender",
  ];

  // ---------- HELPERS ----------
  const $ = (id) => document.getElementById(id);

  function escapeHtml(str) {
    return String(str ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function setStatus(el, msg) {
    if (!el) return;
    el.textContent = msg;
    setTimeout(() => (el.textContent = ""), 2000);
  }

  // ---------- LOAD FROM FIRESTORE ----------
  async function loadAll() {
    const snap = await getDoc(portfolioRef);
    const data = snap.exists() ? snap.data() : {};

    // INTRO
    if ($("introNameInput")) $("introNameInput").value = data?.intro?.name ?? "";
    if ($("introDegreeInput")) $("introDegreeInput").value = data?.intro?.degree ?? "";
    if ($("introTextInput")) $("introTextInput").value = data?.intro?.text ?? "";

    // SKILLS
    const savedSkillTitles =
      Array.isArray(data?.skills) && data.skills.length ? data.skills : DEFAULT_SKILLS;

    const skillsList = $("skillsList");
    if (skillsList) {
      skillsList.innerHTML = "";
      savedSkillTitles.forEach((title, i) => {
        skillsList.innerHTML += `
          <label>Skill #${i + 1}</label>
          <input id="skillInput${i}" type="text" value="${escapeHtml(title)}" />
        `;
      });
    }

    // CONTACTS
    const c = data?.contacts ?? {};
    if ($("emailInput")) $("emailInput").value = c.email ?? "";
    if ($("phoneInput")) $("phoneInput").value = c.phone ?? "";

    if ($("facebookLabelInput")) $("facebookLabelInput").value = c.facebookLabel ?? "";
    if ($("facebookUrlInput")) $("facebookUrlInput").value = c.facebookUrl ?? "";

    if ($("instagramLabelInput")) $("instagramLabelInput").value = c.instagramLabel ?? "";
    if ($("instagramUrlInput")) $("instagramUrlInput").value = c.instagramUrl ?? "";

    if ($("linkedinLabelInput")) $("linkedinLabelInput").value = c.linkedinLabel ?? "";
    if ($("linkedinUrlInput")) $("linkedinUrlInput").value = c.linkedinUrl ?? "";

    if ($("githubLabelInput")) $("githubLabelInput").value = c.githubLabel ?? "";
    if ($("githubUrlInput")) $("githubUrlInput").value = c.githubUrl ?? "";
  }

  await loadAll();

  // ---------- SAVE INTRO ----------
  const introForm = $("introForm");
  const introStatus = $("introStatus");

  if (introForm) {
    introForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const payload = {
        intro: {
          name: $("introNameInput")?.value ?? "",
          degree: $("introDegreeInput")?.value ?? "",
          text: $("introTextInput")?.value ?? "",
        },
        updatedAt: serverTimestamp(),
      };

      await setDoc(portfolioRef, payload, { merge: true });
      setStatus(introStatus, "Intro saved!");
    });
  }

  // ---------- SAVE SKILLS ----------
  const skillsForm = $("skillsForm");
  const skillsStatus = $("skillsStatus");

  if (skillsForm) {
    skillsForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newTitles = [];
      let i = 0;
      while (true) {
        const input = $(`skillInput${i}`);
        if (!input) break;
        newTitles.push(input.value ?? "");
        i++;
      }

      await setDoc(
        portfolioRef,
        { skills: newTitles, updatedAt: serverTimestamp() },
        { merge: true }
      );

      setStatus(skillsStatus, "Skills saved!");
    });
  }

  // ---------- SAVE CONTACTS ----------
  const contactsForm = $("contactsForm");
  const contactsStatus = $("contactsStatus");

  if (contactsForm) {
    contactsForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const contacts = {
        email: $("emailInput")?.value ?? "",
        phone: $("phoneInput")?.value ?? "",
        facebookLabel: $("facebookLabelInput")?.value ?? "",
        facebookUrl: $("facebookUrlInput")?.value ?? "",
        instagramLabel: $("instagramLabelInput")?.value ?? "",
        instagramUrl: $("instagramUrlInput")?.value ?? "",
        linkedinLabel: $("linkedinLabelInput")?.value ?? "",
        linkedinUrl: $("linkedinUrlInput")?.value ?? "",
        githubLabel: $("githubLabelInput")?.value ?? "",
        githubUrl: $("githubUrlInput")?.value ?? "",
      };

      await setDoc(
        portfolioRef,
        { contacts, updatedAt: serverTimestamp() },
        { merge: true }
      );

      setStatus(contactsStatus, "Contacts saved!");
    });
  }
});
