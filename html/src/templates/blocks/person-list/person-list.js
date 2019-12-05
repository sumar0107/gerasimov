import Swiper from 'swiper';
import classie from 'classie';


class PersonList {
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

  update() {
    setTimeout(() => {
      this.slider.update()
      classie.removeClass(this.DOM.wrapper, 'opacity');
    }, 1000)
  }

  wrapper() {
    return this.DOM.wrapper
  }

  sliderOptions() {
    return {
      direction: 'horizontal',
      slidesPerView: 5,
      slidesPerColumn: 2,
      spaceBetween: 0,
      autoHeight: false,
      loop: false,
      navigation: {
        nextEl: `.js-swiper-button-next-${this.counter}`,
        prevEl: `.js-swiper-button-prev-${this.counter}`
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1440: {
          slidesPerView: 4,
        }
      }
    }
  }
}

const personList = () => {
  window.addEventListener('load', () => {
    if (document.querySelector('.js-person-list')) {
      [...document.querySelectorAll('.js-person-list')].forEach((item, index) => {
        const slider = new PersonList(item, index);
        slider.init();
        if (slider.wrapper().closest('.opacity')) {
          document.querySelector('.js-person-list-btn').addEventListener('click', (e) => {
            slider.update()
          })
        }
      });
    }
  });
};
export default personList;
