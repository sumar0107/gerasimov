import Swiper from 'swiper';
import classie from 'classie';

export class WizSlider {
  constructor(el, counter) {
    this.counter = counter;
    this.sliderAll = el;
    this.sliderAllWrapper = this.sliderAll.parentNode;
    this.sliderAllBtnPrev = this.sliderAllWrapper.querySelector('.js-swiper-button-prev');
    this.sliderAllBtnNext = this.sliderAllWrapper.querySelector('.js-swiper-button-next');
    this.sliderAllPagination = this.sliderAllWrapper.querySelector('.swiper-pagination');
    classie.addClass(this.sliderAllBtnPrev, `js-swiper-button-prev-${this.counter}`);
    classie.addClass(this.sliderAllBtnNext, `js-swiper-button-next-${this.counter}`);
    classie.addClass(this.sliderAllPagination, `js-swiper-pagination-${this.counter}`);
    this.sliderPerView = (this.sliderAll.hasAttribute('data-item')) ? this.sliderAll.getAttribute('data-item') : 1;
    this.sliderSpaceBetween = (this.sliderAll.hasAttribute('data-item')) ? 0 : 120;
    this.sliderSpaceBetweenXs = (this.sliderAll.hasAttribute('data-item')) ? 0 : 10;
    this.loop = (!this.sliderAll.hasAttribute('data-loop-false'));
  }

  init() {
    this.slider = new Swiper(this.sliderAll, this.sliderOptions());
  }

  slider() {
    return this.slider
  }

  sliderBreakpoints() {
    if (+this.sliderPerView === 4) {
      return {
        991: {
          slidesPerView: 3,
          slidesPerGroup: 3,
        },
        767: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          spaceBetween: this.sliderSpaceBetweenXs
        },
        540: {
          slidesPerView: 1,
          slidesPerGroup: 1,
          spaceBetween: this.sliderSpaceBetweenXs
        },
      }
    }
    return {
      767: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: this.sliderSpaceBetweenXs
      }
    }

  }

  sliderOptions() {
    return {
      direction: 'horizontal',
      mousewheel: {
        forceToAxis: true,
      },
      autoHeight: true,
      slidesPerView: this.sliderPerView,
      slidesPerGroup: this.sliderPerView,
      loop: this.loop,
      spaceBetween: this.sliderSpaceBetween,
      // effect: 'fade',
      pagination: {
        el: `.js-swiper-pagination-${this.counter}`,
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className}">${index + 1}</span>`;
        },
      },
      navigation: {
        nextEl: `.js-swiper-button-next-${this.counter}`,
        prevEl: `.js-swiper-button-prev-${this.counter}`
      },
      breakpoints: this.sliderBreakpoints(),
    }
  }
}

export const wizSlider = () => {
  window.addEventListener('load', () => {
    if (document.querySelector('.js-swiper')) {
      [...document.querySelectorAll('.js-swiper')].forEach((item, index) => {
        const slider = new WizSlider(item, index);
        // setTimeout(() => slider.init(), 0)
        slider.init()
      });
    }
  });
};
