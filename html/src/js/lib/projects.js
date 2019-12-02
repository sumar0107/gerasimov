import Isotope from 'isotope-layout';
import cellsByRow from 'isotope-cells-by-row';

const projectGrid = () => {
  const iso = new Isotope('.js-grid-projects', {
    itemSelector: '.js-grid-projects-item',
    // layoutMode: 'fitRows',
    layoutMode: 'cellsByRow',
    cellsByRow: {
      columnWidth: 264,
      rowHeight: 250
    },
    transitionDuration: '0.8s',
    // only opacity for reveal/hide transition
    hiddenStyle: {
      opacity: 0
    },
    visibleStyle: {
      opacity: 1
    }
  });

  // bind filter button click
  const filterBtns = [...document.querySelectorAll('.js-filters-btn')];
  filterBtns.forEach(item => {
    item.addEventListener('click', () => {
      const filterValue = item.getAttribute('data-filter');
      iso.arrange({filter: filterValue});
    })
  })
};
export default projectGrid
