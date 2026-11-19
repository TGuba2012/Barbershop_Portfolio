const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const photo = entry.target;
      const image = photo.querySelector('img');
      const reveal = () => photo.classList.add('is-revealed');

      if (image.complete && image.naturalWidth) reveal();
      else image.addEventListener('load', reveal, { once: true });

      observer.unobserve(photo);
    }
  }, { threshold: 0.12 });

  document.querySelectorAll('.gallery-photo').forEach((photo) => observer.observe(photo));
}
