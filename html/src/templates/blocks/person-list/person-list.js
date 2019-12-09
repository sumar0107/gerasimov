import Swiper from 'swiper';
import classie from 'classie';
import enquire from 'enquire.js/dist/enquire';

class PersonList {
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
    this.breakpoint = window.matchMedia('(min-width: 33.75rem)');
    this.slidesPerColumn = (this.DOM.el.hasAttribute('data-column')) ? this.DOM.el.getAttribute('data-column') : 1;
  }

  init() {
    if (!this.DOM.el.closest('.swiper-mobile')) {
      this.slider = new Swiper(this.DOM.el, this.sliderOptions());
    } else {
      this.slider = undefined
      const enableSwiper = () => {
        this.slider = new Swiper(this.DOM.el, this.sliderOptions());
      };
      const breakpointChecker = () => {
        if (this.breakpoint.matches === true) {
          if (this.slider !== undefined) {
            this.slider.destroy(true, true);
          }
        } else if (this.breakpoint.matches === false) {
          return enableSwiper();
        }
        return false;
      };
      this.breakpoint.addListener(breakpointChecker);
      breakpointChecker();
    }
  }

  slider() {
    return this.slider
  }

  update() {
    setTimeout(() => {
      if (this.slider) {
        this.slider.update()
      }
      classie.removeClass(this.DOM.wrapper, 'opacity');
    }, 200)
  }

  wrapper() {
    return this.DOM.wrapper
  }

  sliderOptions() {
    return {
      direction: 'horizontal',
      slidesPerView: 5,
      slidesPerColumn: +this.slidesPerColumn,
      spaceBetween: 0,
      autoHeight: false,
      loop: false,
      navigation: {
        nextEl: `.js-swiper-button-next-${this.counter}`,
        prevEl: `.js-swiper-button-prev-${this.counter}`
      },
      scrollbar: {
        el: `.js-swiper-scrollbar-${this.counter}`,
        hide: false,
      },
      breakpoints: {
        540: {
          slidesPerView: 'auto',
          slidesPerColumn: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 'auto',
          slidesPerColumn: 1,
          spaceBetween: 0
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

const personListBtn = (slider) => {
  const buttonTarget = slider.wrapper().closest('.mdc-tab-container__item').getAttribute('id')
  const buttons = [...document.querySelectorAll(`[data-target="#${buttonTarget}"]`)]
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      slider.update()
    })
  })
}
const personList = () => {
  window.addEventListener('load', () => {
    if (document.querySelector('.js-person-list')) {
      [...document.querySelectorAll('.js-person-list')].forEach((item, index) => {
        const slider = new PersonList(item, index);
        slider.init();
        if (slider.wrapper().closest('.opacity')) {
          enquire.register('(max-width: 33.75rem)', {
            setup() {
              slider.update()
              personListBtn(slider)
            },
            match() {
              personListBtn(slider)
            }
          })
        }
      });
    }
  });
};

export default personList;
