// Keep the current section when a visitor changes language. Navigation also works without JS.
for (const link of document.querySelectorAll('[data-language]')) {
  link.addEventListener('click', () => {
    link.hash = location.hash && document.getElementById(location.hash.slice(1)) ? location.hash : '';
  });
}
