'use strict';
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const heroVideo = document.querySelector('.hero-video');
const year = document.getElementById('year');
const dialog = document.getElementById('projectDialog');
const dialogArt = document.getElementById('dialogArt');

if (year) year.textContent = new Date().getFullYear();

if (heroVideo) {
  heroVideo.addEventListener('canplay', () => heroVideo.classList.add('is-ready'));
  heroVideo.addEventListener('error', () => heroVideo.classList.remove('is-ready'));
}

function closeMenu() {
  mainNav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
}
menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (mainNav && menuToggle && !mainNav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
});
window.matchMedia('(min-width: 701px)').addEventListener('change', closeMenu);

const filterButtons = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projects.forEach(project => {
      project.hidden = filter !== 'all' && project.dataset.category !== filter;
    });
  });
});

function closeDialog() {
  if (dialog?.open) dialog.close();
  dialogArt.replaceChildren();
}
document.querySelectorAll('.project-open').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    const art = card?.querySelector('.project-art');
    document.getElementById('dialogTitle').textContent = button.dataset.title;
    document.getElementById('dialogCategory').textContent = button.dataset.categoryLabel;
    document.getElementById('dialogDescription').textContent = button.dataset.description;
    if (art) dialogArt.append(art.cloneNode(true));
    dialog.showModal();
  });
});
document.querySelector('.dialog-close')?.addEventListener('click', closeDialog);
dialog?.addEventListener('click', event => {
  if (event.target === dialog) closeDialog();
});
dialog?.addEventListener('close', () => dialogArt.replaceChildren());

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.project-card,.approach-copy,.approach-orb,.contact-inner').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}
