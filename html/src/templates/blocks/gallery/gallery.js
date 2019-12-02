import Swiper from 'swiper';
import classie from 'classie';

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
    this.DOM.btnlistShow = this.DOM.wrapper.querySelector('.js-swiper-button-list-open');
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
    const {listRow} = this.DOM;
    this.DOM.images.forEach((item, index) => {
      createListItem(listRow, item.getAttribute('src'), index)
    })
  }

  listShow() {
    if (this.DOM.list.closest('.delay')) {
      classie.removeClass(this.DOM.list, 'delay')
    }
    classie.addClass(document.documentElement, 'list-view');
    classie.removeClass(this.DOM.list, 'close');
    classie.addClass(this.DOM.list, 'open');
  }

  listHide() {
    classie.removeClass(this.DOM.list, 'open');
    classie.addClass(this.DOM.list, 'close');
    classie.removeClass(document.documentElement, 'list-view');
  }

  init() {
    this.list();
    this.slider = new Swiper(this.DOM.el, this.sliderOptions());
    const link = [...document.querySelectorAll('.gallery-list__link')];
    link.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const btn = e.target.closest('.gallery-list__link');
        if (btn) {
          this.slider.slideTo(btn.getAttribute('data-index'), 0);
          this.listHide();
        }
      })
    });
    this.DOM.btnlistShow.addEventListener('click', (e) => {
      e.preventDefault();
      this.listShow();
    });
    this.DOM.btnListClose.addEventListener('click', (e) => {
      e.preventDefault();
      this.listHide();
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
      fadeEffect: {
        crossFade: true
      },
      effect: 'fade',
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
        slider.init();
      });
    }
  });
};
export default gallery;
