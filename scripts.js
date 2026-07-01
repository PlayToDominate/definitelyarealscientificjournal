
  const menuButton = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');

  menuButton.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
  });