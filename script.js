const sentences = [
  "Aspiring software engineer",
  "Developed by myself",
  "Designed and implemented in full",
];

let i = 0;
const el = document.getElementById("rotateText");

const START_DELAY = 2000;     // 👈 delay before anything appears (ms)
const ROTATE_INTERVAL = 4000;
const FADE_DURATION = 1000;

function rotate() {
  el.classList.add("fade-out");

  setTimeout(() => {
    el.textContent = sentences[i];
    el.classList.remove("fade-out");
    i = (i + 1) % sentences.length;
  }, FADE_DURATION);
}

/* wait, then begin rotation */
setTimeout(() => {
  rotate(); // first appearance
  setInterval(rotate, ROTATE_INTERVAL);
}, START_DELAY);




document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.9 }
  );

  cards.forEach((card) => observer.observe(card));
});


