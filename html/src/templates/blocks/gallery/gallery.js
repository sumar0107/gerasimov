import Swiper from 'swiper';
import classie from 'classie';
import {WizSlider} from "../../mixins/swiper/swiper";

class Gallery {
  constructor(el, counter) {
    this.counter = counter;
    this.DOM = {el};
    this.DOM.wrapper = this.DOM.el.closest('.swiper__wrapper');
    this.DOM.btnPrev = this.DOM.wrapper.querySelector('.js-swiper-button-prev');
    this.DOM.btnNext = this.DOM.wrapper.querySelector('.js-swiper-button-next');
    this.DOM.btnFullscreen = this.DOM.wrapper.querySelector('.js-swiper-button-fullscreen');
    this.DOM.btnList = this.DOM.wrapper.querySelector('.js-swiper-button-list');
    this.DOM.pagination = this.DOM.wrapper.querySelector('.js-swiper-pagination');
    classie.addClass(this.DOM.btnPrev, `js-swiper-button-prev-${this.counter}`);
    classie.addClass(this.DOM.btnNext, `js-swiper-button-next-${this.counter}`);
    classie.addClass(this.DOM.pagination, `js-swiper-pagination-${this.counter}`);
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
