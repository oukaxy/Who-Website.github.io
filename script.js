document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const scrollLinks = document.querySelectorAll('.scroll-link');
  const cards = document.querySelectorAll('.card');

  // Toggle navbar saat hamburger diklik
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      toggle.classList.toggle('active');
    });
  }

  // Smooth scroll saat klik link navigasi
  if (scrollLinks.length > 0) {
    scrollLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 60, // offset agar tidak ketutup navbar
            behavior: 'smooth'
          });
        }

        // Tutup menu setelah klik (mode mobile)
        if (navLinks && toggle) {
          navLinks.classList.remove('show');
          toggle.classList.remove('active');
        }
      });
    });
  }

  // Animasi slide-in saat card masuk viewport
  if ('IntersectionObserver' in window && cards.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
  }
});