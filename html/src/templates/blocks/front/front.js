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

class Front {
  constructor(el, counter) {
    this.counter = counter;
    this.DOM = {el};
    this.DOM.wrapper = this.DOM.el.closest('.swiper__wrapper');
    this.DOM.btnPrev = this.DOM.wrapper.querySelector('.js-swiper-button-prev');
    this.DOM.btnNext = this.DOM.wrapper.querySelector('.js-swiper-button-next');
    this.DOM.scrollbar = this.DOM.wrapper.querySelector('.js-swiper-scrollbar');
    classie.addClass(this.DOM.btnPrev, `js-swiper-button-prev-${this.counter}`);
    classie.addClass(this.DOM.btnNext, `js-swiper-button-next-${this.counter}`);
    classie.addClass(this.DOM.scrollbar, `js-swiper-scrollbar-${this.counter}`);
  }

  init() {
    this.slider = new Swiper(this.DOM.el, this.sliderOptions());
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
      loop: true,
      fadeEffect: {
        crossFade: true
      },
      effect: 'fade',
      navigation: {
        nextEl: `.js-swiper-button-next-${this.counter}`,
        prevEl: `.js-swiper-button-prev-${this.counter}`
      },
      scrollbar: {
        el: `.js-swiper-scrollbar-${this.counter}`,
        hide: false,
      },
      // breakpoints: this.sliderBreakpoints(),
    }
  }
}

const frontSlider = () => {
  window.addEventListener('load', () => {
    if (document.querySelector('.js-front')) {
      [...document.querySelectorAll('.js-front')].forEach((item, index) => {
        const slider = new Front(item, index);
        slider.init();
      });
    }
  });
};
export default frontSlider;
