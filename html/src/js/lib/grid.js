import Isotope from 'isotope-layout'
import imagesLoaded from 'imagesloaded'
import gridFilterInit from './grid-filter'
// import cellsByRow from 'isotope-cells-by-row';

export default class Grid {
  constructor(el, itemSelector, columnWidth) {
    this.el = document.querySelector(el)
    this.itemSelector = itemSelector
    this.columnWidth = columnWidth
  }

  options() {
    return {
      itemSelector: this.itemSelector,
      // layoutMode: 'fitRows',
      // fitRows: {
      //   gutter: 60
      // },
      // layoutMode: 'cellsByRow',
      // cellsByRow: {
      //   columnWidth: 264,
      //   rowHeight: 250
      // },
      percentPosition: true,
      masonry: {
        // use element for option
        columnWidth: this.columnWidth,
        horizontalOrder: true
      },
      transitionDuration: '0.45s',
      // only opacity for reveal/hide transition
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      }
    }
  }

  init(filter) {


    this.iso = new Isotope(this.el, this.options())
    if (filter) {
      this.filter(document.querySelector('.mdc-tab--active').getAttribute('data-filter'))
      gridFilterInit('[data-filter]', this.iso)
    }
    const imgLoad = imagesLoaded(this.el)
    imgLoad.on('progress', (instance, image) => {
      if (image.isLoaded) {
        image.img.classList.remove('opacity')
      }
    })
  }

  filter(filterValue) {
    this.iso.arrange({filter: filterValue})
  }

  getIso() {
    return this.iso
  }
}


