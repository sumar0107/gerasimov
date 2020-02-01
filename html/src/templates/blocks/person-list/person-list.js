import Swiper from 'swiper'
import classie from 'classie'
import enquire from 'enquire.js/dist/enquire'

class PersonList {
  constructor(el, counter) {
    this.counter = counter
    this.DOM = {el}
    this.DOM.wrapper = this.DOM.el.closest('.swiper__wrapper')
    this.DOM.btnPrev = this.DOM.wrapper.querySelector('.js-swiper-button-prev')
    this.DOM.btnNext = this.DOM.wrapper.querySelector('.js-swiper-button-next')
    this.DOM.btnWrapper = this.DOM.btnNext.closest('.swiper__button-right')
    this.DOM.imgWrapper = this.DOM.el.querySelector('.person__img-inner')
    // this.DOM.scrollbar = this.DOM.wrapper.querySelector('.js-swiper-scrollbar');
    classie.addClass(this.DOM.btnPrev, `js-swiper-button-prev-${this.counter}`)
    classie.addClass(this.DOM.btnNext, `js-swiper-button-next-${this.counter}`)
    // classie.addClass(this.DOM.scrollbar, `js-swiper-scrollbar-${this.counter}`);
    this.breakpoint = window.matchMedia('(min-width: 48rem)')
    this.slidesPerColumn = (this.DOM.el.hasAttribute('data-column')) ? +this.DOM.el.getAttribute('data-column') : 1
  }

  init() {
    if (!this.DOM.el.closest('.swiper-mobile') && this.slidesPerColumn !== 2) {
      this.slider = new Swiper(this.DOM.el, this.sliderOptions())
    } else {
      this.slider = undefined
      const enableSwiper = () => {
        this.slider = new Swiper(this.DOM.el, this.sliderOptions())
      }
      const breakpointChecker = () => {
        if (this.breakpoint.matches === true) {
          if (this.slider !== undefined) {
            this.slider.destroy(true, true)
          }
          if (this.slidesPerColumn === 2) {
            return enableSwiper()
          }
        } else if (this.breakpoint.matches === false) {
          if (this.slider !== undefined && this.slidesPerColumn === 2) {
            this.slider.destroy(true, true)
          }
          return enableSwiper()
        }
        return false
      }
      this.breakpoint.addListener(breakpointChecker)
      breakpointChecker()
    }
    this.btnHeight()
    window.addEventListener('resize', () => {
      this.btnHeight()
    })
  }

  slider() {
    return this.slider
  }

  update() {
    setTimeout(() => {
      if (this.slider) {
        this.slider.update()
      }
      this.btnHeight()
      classie.removeClass(this.DOM.wrapper, 'opacity')
    }, 200)
  }

  wrapper() {
    return this.DOM.wrapper
  }

  btnHeight() {
    // if (!(this.slidesPerColumn > 1)){
      this.DOM.btnWrapper.style.height = `${this.DOM.imgWrapper.clientHeight}px`
    // }
  }

  sliderOptions() {
    return {
      direction: 'horizontal',
      slidesPerView: 5,
      slidesPerColumn: this.slidesPerColumn,
      spaceBetween: 0,
      autoHeight: false,
      loop: false,
      navigation: {
        nextEl: `.js-swiper-button-next-${this.counter}`,
        prevEl: `.js-swiper-button-prev-${this.counter}`
      },
      // scrollbar: {
      //   el: `.js-swiper-scrollbar-${this.counter}`,
      //   hide: false,
      // },
      breakpoints: {
        540: {
          slidesPerView: 2,
          // slidesPerColumn: 1,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          // slidesPerColumn: 1,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 0
        },
        1440: {
          slidesPerView: 4,
        }
      }
    }
  }
}

const $personListBtn = (btn, sliders) => {
  $(btn).on('shown.bs.tab', () => sliders.forEach(item => {
    if (item.wrapper().closest('.show') && item.wrapper().closest('.opacity')) {
      item.update()
    }
  }))
}

const slidersFn = () => {
  return [...document.querySelectorAll('.js-person-list')].map((item, index) => {
    const slider = new PersonList(item, index)
    slider.init()
    return slider
  })
}
const personList = () => {
  if (document.querySelector('.js-person-list')) {
    const sliders = slidersFn()
    enquire.register('(max-width: 33.75rem)', {
      setup() {
        sliders.forEach(item => {
          if (item.wrapper().closest('.show') && item.wrapper().closest('.opacity')) {
            item.update()
          }
        })
        $personListBtn('.mdc-tab-bar [data-toggle="tab"]', sliders)
      },
      match() {
        $personListBtn('.mdc-select [data-toggle="tab"]', sliders)
      }
    })
  }
}

export default personList
