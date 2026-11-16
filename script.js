// Language toggle: every translatable element carries data-en and data-he.
const toggle = document.getElementById("lang-toggle");
const translatable = document.querySelectorAll("[data-en][data-he]");

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
  translatable.forEach((el) => {
    el.textContent = el.dataset[lang];
  });
  // The button always offers the *other* language.
  toggle.textContent = lang === "he" ? "English" : "עברית";
  document.title = lang === "he" ? "אחמד | טכניון" : "Ahmad | Technion";
  try {
    localStorage.setItem("lang", lang);
  } catch (e) {
    // Storage unavailable: the choice just won't be remembered.
  }
}

toggle.addEventListener("click", () => {
  setLanguage(document.documentElement.lang === "he" ? "en" : "he");
});

let saved = null;
try {
  saved = localStorage.getItem("lang");
} catch (e) {}
setLanguage(saved === "he" ? "he" : "en");
