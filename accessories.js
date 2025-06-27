document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for nav links
  document.querySelectorAll('.nav-links a').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      if (this.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 60,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});