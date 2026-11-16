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

const cursorMedia = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");

if (cursorMedia.matches) {
  const hero = document.querySelector(".pixel-student");

  if (hero) {
    const cursor = document.createElement("div");
    const avatar = hero.cloneNode(true);
    let pressTimer;

    cursor.className = "site-cursor";
    cursor.setAttribute("aria-hidden", "true");
    avatar.classList.replace("pixel-student", "site-cursor-avatar");
    avatar.removeAttribute("role");
    avatar.removeAttribute("aria-label");
    avatar.querySelector(".ground-shadow")?.remove();
    avatar.querySelector(".sparkles")?.remove();
    cursor.append(avatar);
    document.body.append(cursor);
    document.body.classList.add("has-site-cursor");

    document.addEventListener("pointermove", (event) => {
      if (event.pointerType === "touch") return;
      cursor.style.transform = `translate3d(${event.clientX - 64}px, ${event.clientY - 40}px, 0)`;
      cursor.classList.add("is-visible");
    });

    document.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "touch") return;
      cursor.classList.add("is-pressing");
      window.clearTimeout(pressTimer);
      pressTimer = window.setTimeout(() => cursor.classList.remove("is-pressing"), 180);
    });

    document.addEventListener("pointerleave", (event) => {
      if (event.pointerType !== "touch") cursor.classList.remove("is-visible");
    });

    document.addEventListener("pointerenter", (event) => {
      if (event.pointerType !== "touch") cursor.classList.add("is-visible");
    });

    cursorMedia.addEventListener("change", (event) => {
      if (event.matches) return;
      window.clearTimeout(pressTimer);
      cursor.remove();
      document.body.classList.remove("has-site-cursor");
    });
  }
}
