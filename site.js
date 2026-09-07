/* Shared Steam attribution and accessible mobile navigation. */
(() => {
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.hostname !== 'store.steampowered.com' || typeof window.gtag !== 'function') return;
    const game = url.pathname.includes('/app/388970/') ? 'izbot'
      : url.pathname.includes('/app/1452790/') ? 'izbot2' : 'ruxar';
    window.gtag('event', 'steam_click', {
      game, page: location.pathname,
      placement: url.searchParams.get('utm_content') || 'unlabelled',
      link_url: url.href
    });
  });

  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.mobile-nav');
  if (!button || !menu) return;
  menu.id = 'mobile-navigation';
  menu.setAttribute('role', 'navigation');
  button.setAttribute('aria-controls', menu.id);
  let previousFocus;
  let background = [];
  let previousOverflow;
  const focusables = () => [...menu.querySelectorAll('a[href], button:not([disabled])')];
  function close(restore = true) {
    if (!document.body.classList.contains('menu-open')) return;
    background.forEach(([element, inert]) => { element.inert = inert; });
    background = [];
    document.body.classList.remove('menu-open');
    document.body.style.overflow = previousOverflow;
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open menu');
    if (restore) (previousFocus || button).focus();
  }
  function open() {
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    // Preserve every ancestor of the menu and toggle; inert their other branches.
    function isolate(parent) {
      [...parent.children].forEach(element => {
        if (element === menu || element === button) return;
        if (element.contains(menu) || element.contains(button)) isolate(element);
        else { background.push([element, element.inert]); element.inert = true; }
      });
    }
    isolate(document.body);
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    button.setAttribute('aria-expanded', 'true');
    button.setAttribute('aria-label', 'Close menu');
    (focusables()[0] || button).focus();
  }
  button.addEventListener('click', () => document.body.classList.contains('menu-open') ? close() : open());
  menu.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => {
    if (!document.body.classList.contains('menu-open')) return;
    if (event.key === 'Escape') { event.preventDefault(); close(); }
    if (event.key === 'Tab') {
      const items = [button, ...focusables()];
      const index = items.indexOf(document.activeElement);
      event.preventDefault();
      items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    }
  });
  window.addEventListener('resize', () => {
    if (getComputedStyle(button).display === 'none') close(false);
  });
})();
