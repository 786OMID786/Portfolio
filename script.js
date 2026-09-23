const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
const year = document.getElementById('year');

function applyTheme(theme) {
  const light = theme === 'light';
  root.dataset.theme = light ? 'light' : 'dark';
  themeToggle.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  themeToggle.setAttribute('aria-pressed', String(light));
  themeIcon.textContent = light ? '☾' : '☀';
  document.querySelector('meta[name="theme-color"]').content = light ? '#f5f3ed' : '#111812';
}
let preference;
try { preference = localStorage.getItem('portfolio-theme'); } catch (_) { /* Storage may be disabled. */ }
applyTheme(preference === 'light' || preference === 'dark' ? preference : 'dark');
themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('portfolio-theme', next); } catch (_) { /* Keep the toggle usable. */ }
});
function closeMenu() {
  nav.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}
menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!nav.contains(event.target) && !menuToggle.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width: 861px)').addEventListener('change', closeMenu);
year.textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const emailConfig = window.EMAILJS_CONFIG || {};
const emailIsConfigured = Boolean(
  window.emailjs &&
  emailConfig.publicKey && !emailConfig.publicKey.startsWith('YOUR_') &&
  emailConfig.serviceId && !emailConfig.serviceId.startsWith('YOUR_') &&
  emailConfig.templateId && !emailConfig.templateId.startsWith('YOUR_')
);

if (emailIsConfigured) {
  emailjs.init({
    publicKey: emailConfig.publicKey,
    blockHeadless: true,
    limitRate: { id: 'portfolio-contact', throttle: 10000 }
  });
}

if (contactForm && formStatus) {
  if (!emailIsConfigured) formStatus.textContent = 'Connect EmailJS to activate message delivery. See README.md for setup.';
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    if (contactForm.elements.website.value) return;
    if (!emailIsConfigured) {
      formStatus.dataset.state = 'error';
      formStatus.textContent = 'The email form needs EmailJS account IDs. See README.md for setup.';
      return;
    }
    const button = contactForm.querySelector('button[type="submit"]');
    const label = button.querySelector('span');
    const fields = new FormData(contactForm);
    const firstName = fields.get('firstName').trim();
    const lastName = fields.get('lastName').trim();
    const senderEmail = fields.get('email').trim();
    const templateParams = {
      first_name: firstName,
      last_name: lastName,
      from_name: `${firstName} ${lastName}`,
      from_email: senderEmail,
      reply_to: senderEmail,
      subject: fields.get('subject').trim() || 'Portfolio contact message',
      message: fields.get('message').trim(),
      website: ''
    };
    button.disabled = true;
    label.textContent = 'Sending…';
    formStatus.dataset.state = '';
    formStatus.textContent = 'Sending your message…';
    try {
      await emailjs.send(emailConfig.serviceId, emailConfig.templateId, templateParams);
      formStatus.dataset.state = 'success';
      formStatus.textContent = 'Thanks! Your message has been sent.';
      contactForm.reset();
    } catch (error) {
      console.error('EmailJS could not send the contact message:', error?.status || 'request failed');
      formStatus.dataset.state = 'error';
      formStatus.textContent = 'Your message could not be sent. Please try again or email me directly at noori7omid86@gmail.com.';
    } finally {
      button.disabled = false;
      label.textContent = 'Send message';
    }
  });
}
