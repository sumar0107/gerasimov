const readMore = () => {
  const btns = [...document.querySelectorAll('.js-read-more-btn')]
  btns.forEach(item => {
    item.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-read-more-btn')
      if (!btn) {
        return
      }
      e.preventDefault()
      const block = document.querySelector(btn.getAttribute('href'))
      if (btn.closest('.open')) {
        block.style.display = 'none'
        btn.querySelector('span').innerText = 'Читать дальше'
        btn.classList.remove('open')
      } else {
        block.style.display = 'block'
        btn.querySelector('span').innerText = 'Свернуть'
        btn.classList.add('open')
      }
    })
  })
};
export default readMore
