// List the rotating sentences
const sentences = [
  "Aspiring software engineer",
  "Developed by myself",
  "Designed and implemented in full",
];

let i = 0;
const el = document.getElementById("rotateText");

function rotate() {
  // fade out
  el.classList.add("fade-out");

  // after fade out finishes, change text and fade in
  setTimeout(() => {
    i = (i + 1) % sentences.length;
    el.textContent = sentences[i];
    el.classList.remove("fade-out");
  }, 1000); // must match CSS transition time
}
setInterval(rotate, 4000); // change every 2.5s



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
