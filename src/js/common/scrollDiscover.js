export default function scrollDiscover() {
  let scrollPos = 0;
  const nav = document.querySelector('.arr-down');

  function checkPosition() {
    let windowY = window.scrollY;
    if (windowY < scrollPos) {
      // Scrolling UP
      nav.classList.add('is-visible');
      nav.classList.remove('is-hidden');
    } else {
      // Scrolling DOWN
      nav.classList.add('is-hidden');
      nav.classList.remove('is-visible');
    }
    scrollPos = windowY;
  }

  window.addEventListener('scroll', checkPosition);
}

