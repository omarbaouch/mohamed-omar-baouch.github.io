// IntersectionObserver to reveal elements on scroll
const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  },
);

reveals.forEach((el) => observer.observe(el));

// Dark mode toggle
const toggle = document.getElementById("theme-toggle");
const icon = toggle.querySelector("i");
const setTheme = (dark) => {
  document.body.classList.toggle("dark", dark);
  icon.classList.toggle("fa-sun", dark);
  icon.classList.toggle("fa-moon", !dark);
};

setTheme(localStorage.getItem("theme") === "dark");

toggle.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  setTheme(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Interactive tilt effect for project cards
const projectCards = document.querySelectorAll(".project-card");
projectCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * -8;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
