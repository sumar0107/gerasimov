import Swiper from 'swiper';
import classie from 'classie';
import imagesLoaded from 'imagesloaded'


class Front {
  constructor(el, counter) {
    this.counter = counter;
    this.DOM = {el};
    this.DOM.wrapper = this.DOM.el.closest('.swiper__wrapper');
    this.DOM.btnPrev = this.DOM.wrapper.querySelector('.js-swiper-button-prev');
    this.DOM.btnNext = this.DOM.wrapper.querySelector('.js-swiper-button-next');
    this.DOM.scrollbar = this.DOM.wrapper.querySelector('.js-swiper-scrollbar');
    this.breakpoint = window.matchMedia('(min-width: 48rem)');
    classie.addClass(this.DOM.btnPrev, `js-swiper-button-prev-${this.counter}`);
    classie.addClass(this.DOM.btnNext, `js-swiper-button-next-${this.counter}`);
    classie.addClass(this.DOM.scrollbar, `js-swiper-scrollbar-${this.counter}`);
  }

  init() {
    this.slider = new Swiper(this.DOM.el, this.sliderOptions());
    this.imgLoad()
    imagesLoaded(this.slider.el).on('done', () => this.slider.init());
    this.click()
  }

  slider() {
    return this.slider
  }

  click() {
    const nextSlider = () => this.slider.slideNext()
    const breakpointChecker = () => {
      if (this.breakpoint.matches === true) {
        [...this.slider.slides].forEach(item => item.removeEventListener('click', nextSlider, false))
      } else if (this.breakpoint.matches === false) {
        [...this.slider.slides].forEach(item => item.addEventListener('click', nextSlider, false))
      }
      return false;
    };
    this.breakpoint.addListener(breakpointChecker);
    breakpointChecker();
  }

  imgLoad() {
    const imageSrcReplace = (src) => {
      [...this.slider.el.querySelectorAll('img')].forEach(item => {
        item.src = item.dataset[src] // eslint-disable-line no-param-reassign
      })
      this.slider.update()
    }


    const breakpointChecker = () => {
      if (this.breakpoint.matches === true) {
        imageSrcReplace('srcdscp')
      } else if (this.breakpoint.matches === false) {
        imageSrcReplace('srcmob')
      }
      return false;
    };
    this.breakpoint.addListener(breakpointChecker);
    breakpointChecker();

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
      init: false
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
