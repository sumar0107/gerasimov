const headerFixTop = () => {
  const sticky = 7;
  const header = document.querySelector('header.header')
  const headerLid = document.querySelector('.header-lid')
  let didScroll;
  let lastScrollTop = 0;
  const delta = 5;
  const headerHeight = header.clientHeight;

  function elFixTop(el) {
    if (window.pageYOffset > sticky) {
      el.classList.add('head-effect')
    } else {
      el.classList.remove('head-effect')
    }
  }

  if (headerLid) {
    document.addEventListener('DOMContentLoaded', () => {
      elFixTop(headerLid)
    });
    window.addEventListener('scroll', () => {
      elFixTop(headerLid)
    })
  }

  function hasScrolled() {
    const st = $(window).scrollTop();
    // Make scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    // If scrolled down and past the navbar, add class .nav-up.
    if (st > lastScrollTop && st > headerHeight) {
      // Scroll Down
      document.body.classList.remove('head-effect-down');
      document.body.classList.add('head-effect-up');
    } else if (st + $(window).height() < $(document).height()) {
      // Scroll Up
      document.body.classList.remove('head-effect-up');
      document.body.classList.add('head-effect-down');
    }

    lastScrollTop = st;
  }

  window.addEventListener('scroll', (event) => {
    didScroll = true
  });
  setInterval(function () {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

};
export default headerFixTop
// Hide header on scroll down








