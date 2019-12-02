const headerFixTop = () => {
  const sticky = 7
  const header = document.querySelector('header.header')
  const headerLid = document.querySelector('.header-lid')

  function elFixTop(el) {
    if (window.pageYOffset > sticky) {
      el.classList.add('head-effect')
    } else {
      el.classList.remove('head-effect')
    }
  }

  if (headerLid) {
    window.addEventListener('scroll', () => {
      elFixTop(headerLid)
    })
  }
};
export default headerFixTop
