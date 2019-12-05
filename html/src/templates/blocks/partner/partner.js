import Swiper from 'swiper';
import classie from 'classie';


class Partner {
  constructor(el, counter) {
    this.counter = counter;
    this.DOM = {el};
    this.DOM.wrapper = this.DOM.el.closest('.swiper__wrapper');
    this.DOM.btnPrev = this.DOM.wrapper.querySelector('.js-swiper-button-prev');
    this.DOM.btnNext = this.DOM.wrapper.querySelector('.js-swiper-button-next');
    classie.addClass(this.DOM.btnPrev, `js-swiper-button-prev-${this.counter}`);
    classie.addClass(this.DOM.btnNext, `js-swiper-button-next-${this.counter}`);
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
      slidesPerView: 4,
      spaceBetween: 0,
      autoHeight: false,
      loop: true,
      navigation: {
        nextEl: `.js-swiper-button-next-${this.counter}`,
        prevEl: `.js-swiper-button-prev-${this.counter}`
      },
      breakpoints: {
        480: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        }
      }
    }
  }
}

const partner = () => {
  window.addEventListener('load', () => {
    if (document.querySelector('.js-partner')) {
      [...document.querySelectorAll('.js-partner')].forEach((item, index) => {
        const slider = new Partner(item, index);
        slider.init();
      });
    }
  });
};
export default partner;
