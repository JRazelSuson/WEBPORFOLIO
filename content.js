// content.js (type=module) - Firestore version (replaces localStorage)
import { db } from "./firebase-config.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {
  const portfolioRef = doc(db, "portfolio", "main");

  try {
    const snap = await getDoc(portfolioRef);
    const data = snap.exists() ? snap.data() : {};

    // INTRO
    setText("introName", data?.intro?.name);
    setText("introDegree", data?.intro?.degree);
    setText("introText", data?.intro?.text);

    // SKILLS (keeps your layout; only replaces the <h3> text)
    const savedSkills = Array.isArray(data?.skills) ? data.skills : [];
    const skillItems = document.querySelectorAll(".skill-item h3");
    savedSkills.forEach((title, i) => {
      if (skillItems[i]) skillItems[i].textContent = title;
    });

    // CONTACTS
    const c = data?.contacts ?? {};

    if (c.email) {
      const el = document.getElementById("contactEmail");
      if (el) {
        el.textContent = c.email;
        el.href = "mailto:" + c.email;
      }
    }

    if (c.phone) setText("contactPhone", c.phone);

    setLink("contactFacebook", c.facebookLabel, c.facebookUrl);
    setLink("contactInstagram", c.instagramLabel, c.instagramUrl);
    setLink("contactLinkedIn", c.linkedinLabel, c.linkedinUrl);
    setLink("contactGithub", c.githubLabel, c.githubUrl);
  } catch (err) {
    console.error("Firestore load failed:", err);
  }

  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.textContent = value;
  }

  function setLink(id, label, url) {
    const el = document.getElementById(id);
    if (!el) return;
    if (label) el.textContent = label;
    if (url) el.href = url;
  }
});
