
const verseText = document.getElementById("verseText");
const verseRef = document.getElementById("verseRef");
const verseBox = document.getElementById("verseBox");
const newVerseBtn = document.getElementById("newVerseBtn");
const searchToggleBtn = document.getElementById("searchToggleBtn");
const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");


const intenseWords = [
  "fire", "wrath", "blood", "judgment", "power",
  "battle", "strength", "vengeance", "fear", "death"
];

const coolWords = [
  "peace", "calm", "rest", "comfort", "gentle",
  "mercy", "grace", "love", "joy", "hope", "still", "quiet"
];


async function getRandomVerse() {
  verseBox.classList.add("fade-out");

  setTimeout(async () => {
    try {
      const res = await fetch("https://bible-api.com/?random=verse");
      const data = await res.json();

      verseText.textContent = `"${data.text.trim()}"`;
      verseRef.textContent = `— ${data.reference}`;
      checkIntensity(data.text);
    } catch {
      verseText.textContent = "⚠️ Could not load verse.";
      verseRef.textContent = "";
      document.body.classList.remove("intense", "warm", "cool", "neutral");
    }

    verseBox.classList.remove("fade-out");
    verseBox.classList.add("fade-in");
  }, 400);
}


async function searchVerse() {
  const query = searchInput.value.trim();
  if (!query) return alert("Enter a verse or keyword.");

  verseBox.classList.add("fade-out");
  searchBar.classList.remove("active"); 

  setTimeout(async () => {
    try {
      const res = await fetch(`https://bible-api.com/${encodeURIComponent(query)}`);
      const data = await res.json();

      if (data.text) {
        verseText.textContent = `"${data.text.trim()}"`;
        verseRef.textContent = `— ${data.reference}`;
        checkIntensity(data.text);
      } else {
        verseText.textContent = "❌ Verse not found.";
        verseRef.textContent = "";
        document.body.classList.remove("intense", "warm", "cool", "neutral");
      }
    } catch {
      verseText.textContent = "⚠️ Error fetching verse.";
      verseRef.textContent = "";
      document.body.classList.remove("intense", "warm", "cool", "neutral");
    }

    verseBox.classList.remove("fade-out");
    verseBox.classList.add("fade-in");
  }, 400);
}


function checkIntensity(text) {
  const lower = text.toLowerCase();
  const isIntense = intenseWords.some(word => lower.includes(word));
  const isCool = coolWords.some(word => lower.includes(word));


  document.body.classList.remove("intense", "warm", "cool", "neutral");

  if (isIntense) {

    document.body.classList.add("intense", "warm");
  } else if (isCool) {
    document.body.classList.add("cool");
  } else {

    document.body.classList.add("neutral");
  }
}

searchToggleBtn.addEventListener("click", () => {
  searchBar.classList.toggle("active");
});


searchBtn.addEventListener("click", searchVerse);
newVerseBtn.addEventListener("click", getRandomVerse);


window.onload = getRandomVerse;
