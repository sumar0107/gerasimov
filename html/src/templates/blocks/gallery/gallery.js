import Swiper from 'swiper';
import classie from 'classie';
import {WizSlider} from "../../mixins/swiper/swiper";

function createListItem(el, src, index) {
  el.insertAdjacentHTML('beforeend', `
                                <div class="gallery-list__item">
                                  <a class="gallery-list__link" href="#" data-index="${index}">
                                      <div class="gallery-list__img">
                                        <div class="gallery-list__img-inner">
                                            <img src="${src}" alt="">
                                        </div>
                                      </div>
                                  </a>
                                </div>`);
}

class Gallery {
  constructor(el, counter) {
    this.counter = counter;
    this.DOM = {el};
    this.DOM.wrapper = this.DOM.el.closest('.swiper__wrapper');
    this.DOM.btnPrev = this.DOM.wrapper.querySelector('.js-swiper-button-prev');
    this.DOM.btnNext = this.DOM.wrapper.querySelector('.js-swiper-button-next');
    this.DOM.btnFullscreen = this.DOM.wrapper.querySelector('.js-swiper-button-fullscreen');
    this.DOM.btnListOpen = this.DOM.wrapper.querySelector('.js-swiper-button-list-open');
    this.DOM.btnListClose = this.DOM.wrapper.querySelector('.js-swiper-button-list-close');
    this.DOM.pagination = this.DOM.wrapper.querySelector('.js-swiper-pagination');
    this.DOM.images = [...this.DOM.wrapper.querySelectorAll('.swiper-item img')];
    this.DOM.list = this.DOM.wrapper.querySelector('.js-gallery-list');
    this.DOM.listRow = this.DOM.list.querySelector('.gallery-list__row');
    classie.addClass(this.DOM.btnPrev, `js-swiper-button-prev-${this.counter}`);
    classie.addClass(this.DOM.btnNext, `js-swiper-button-next-${this.counter}`);
    classie.addClass(this.DOM.pagination, `js-swiper-pagination-${this.counter}`);
  }

  list() {
    console.log(this.DOM.images);
    const {listRow} = this.DOM
    this.DOM.images.forEach((item, index) => {
      createListItem(listRow, item.getAttribute('src'), index)
    })
  }

  listOpen() {
    if (this.DOM.list.closest('.delay')) {
      this.DOM.list.classList.remove('delay')
    }
    document.documentElement.classList.add('list-view')
    this.DOM.list.classList.remove('close')
    this.DOM.list.classList.add('open')
  }

  listСlose() {
    this.DOM.list.classList.remove('open')
    this.DOM.list.classList.add('close')
    document.documentElement.classList.remove('list-view')
  }

  init() {
    this.list()
    this.slider = new Swiper(this.DOM.el, this.sliderOptions());
    const link = [...document.querySelectorAll('.gallery-list__link')]
    link.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        const btn = e.target.closest('.gallery-list__link')
        if (btn) {
          this.slider.slideTo(btn.getAttribute('data-index'), 0);
          this.listСlose()
        }
      })
    })
    this.DOM.btnListOpen.addEventListener('click', (e) => {
      e.preventDefault()
      this.listOpen()
    })
    this.DOM.btnListClose.addEventListener('click', (e) => {
      e.preventDefault()
      this.listСlose()
    })
  }

  slider() {
    return this.slider
  }

  sliderOptions() {
    return {
      direction: 'horizontal',
      // mousewheel: {
      //   forceToAxis: true,
      // },
      autoHeight: true,
      loop: false,
      // effect: 'fade',
      pagination: {
        el: `.js-swiper-pagination-${this.counter}`,
        type: 'fraction',
      },
      navigation: {
        nextEl: `.js-swiper-button-next-${this.counter}`,
        prevEl: `.js-swiper-button-prev-${this.counter}`
      },
      // breakpoints: this.sliderBreakpoints(),
    }
  }
}

const gallery = () => {
  window.addEventListener('load', () => {
    if (document.querySelector('.js-gallery')) {
      [...document.querySelectorAll('.js-gallery')].forEach((item, index) => {
        const slider = new Gallery(item, index);
        slider.init()
      });
    }
  });
};
export default gallery;
