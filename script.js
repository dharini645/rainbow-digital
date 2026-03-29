// Cursor
const cur = document.getElementById('cur');
document.addEventListener('mousemove', e => {
  cur.style.left = e.clientX + 'px';
  cur.style.top = e.clientY + 'px';
});
document.querySelectorAll('a,button,.svc-card,.why-card,.hstat,.g-cell').forEach(el => {
  el.addEventListener('mouseenter', () => cur.classList.add('big'));
  el.addEventListener('mouseleave', () => cur.classList.remove('big'));
});

// Nav scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', scrollY > 60);
});

// Scroll reveal with stagger
const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const children = entry.target.querySelectorAll('.svc-card,.why-card,.hstat,.g-cell');
      if (children.length) {
        children.forEach((el, i) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'none';
          }, i * 60);
        });
      }
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => {
  el.querySelectorAll('.svc-card,.why-card,.g-cell').forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(24px)';
    c.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });
  obs.observe(el);
});


