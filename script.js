// IntersectionObserver to reveal elements on scroll
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

reveals.forEach((el) => observer.observe(el));

// Dark mode toggle
const toggle = document.getElementById('theme-toggle');
const icon = toggle.querySelector('i');
const setTheme = (dark) => {
  document.body.classList.toggle('dark', dark);
  icon.classList.toggle('fa-sun', dark);
  icon.classList.toggle('fa-moon', !dark);
};

setTheme(localStorage.getItem('theme') === 'dark');

toggle.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark');
  setTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
