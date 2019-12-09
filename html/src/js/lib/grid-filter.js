const gridFilter = (el, iso) => {
  // bind filter button click
  const filterBtns = [...document.querySelectorAll(el)];
  filterBtns.forEach(item => {
    item.addEventListener('click', () => {
      const filterValue = item.getAttribute('data-filter');
      iso.arrange({filter: filterValue});
    })
  })
};
const gridFilterInit = (el, iso) => {
  if (document.querySelector(el)) {
    gridFilter(el, iso)
  }
};

export default gridFilterInit
