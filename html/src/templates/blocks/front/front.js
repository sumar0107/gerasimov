import Swiper from 'swiper'
import classie from 'classie'

const createEl = (src, href) => {
  return `<div class='swiper-item'>
        <a href='${href}'>
            <div class='swiper-item__img'>
                <div class='swiper-item__img-inner'>
                    <img  src='${src}'>
                </div>
            </div>
        </a>
    </div>`
}
const virtualSliders = (md) => {
  return window.slidersDta.filter(item => item[md] !== '').map(item => createEl(item[md], item.href))
}

class Front {
  constructor(el, counter) {
    this.counter = counter
    this.DOM = {el}
    this.DOM.wrapper = this.DOM.el.closest('.swiper__wrapper')
    this.DOM.btnPrev = this.DOM.wrapper.querySelector('.js-swiper-button-prev')
    this.DOM.btnNext = this.DOM.wrapper.querySelector('.js-swiper-button-next')
    this.DOM.scrollbar = this.DOM.wrapper.querySelector('.js-swiper-scrollbar')
    this.breakpoint = window.matchMedia('(min-width: 48rem)')
    classie.addClass(this.DOM.btnPrev, `js-swiper-button-prev-${this.counter}`)
    classie.addClass(this.DOM.btnNext, `js-swiper-button-next-${this.counter}`)
    classie.addClass(this.DOM.scrollbar, `js-swiper-scrollbar-${this.counter}`)
  }

  init() {
    this.slider = new Swiper(this.DOM.el, this.sliderOptions())
    this.imgLoad()

    this.slider.virtual.update()
    // this.clickBtn()
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
      return false
    }
    this.breakpoint.addListener(breakpointChecker)
    breakpointChecker()
  }

  clickBtn() {

    this.slider.navigation.nextEl.addEventListener('click', (event) => {
       event.preventDefault()
      console.log(123)
      if (event.target.closest('.swiper-button-disabled')) {
        this.slider.slideTo(0)
      }
    })
    this.slider.navigation.prevEl.addEventListener('click', (event) => {
      event.preventDefault()
      console.log(this.slider.virtual.slides.length)
      console.log(this.slider.activeIndex+1)
      // if (!event.target.closest('.swiper-button-disabled')) {
      //   return
      // }
      // this.slider.slideTo(this.slider.virtual.slides.length)
    })
  }


  imgLoad() {
    // const imageSrcReplace = (src) => {
    //   [...this.slider.el.querySelectorAll('img')].forEach(item => {
    //     item.src = item.dataset[src] // eslint-disable-line no-param-reassign
    //   })
    // }
    const sliderUpdate = (md) => {
      if (this.slider.virtual.slides) {
        this.slider.virtual.removeAllSlides()
      }
      this.slider.virtual.slides = virtualSliders(md)
      this.slider.update()
    }

    const breakpointChecker = () => {
      if (this.breakpoint.matches === true) {
        sliderUpdate('desktop')
        // imageSrcReplace('srcdscp')
        this.slider.update()
      } else if (this.breakpoint.matches === false) {
        sliderUpdate('mobile')
        this.slider.scrollbar.updateSize()
        // imageSrcReplace('srcmob')
      }
      return false
    }
    this.breakpoint.addListener(breakpointChecker)
    breakpointChecker()

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
      keyboard: {
        enabled: true,
      },
      navigation: {
        nextEl: `.js-swiper-button-next-${this.counter}`,
        prevEl: `.js-swiper-button-prev-${this.counter}`,
      },
      virtual: {
        // slides: this.virtualSliders('desktop')
        cache: false
      },
      scrollbar: {
        el: `.js-swiper-scrollbar-${this.counter}`,
        draggable: true,
        hide: false,
      },
      // init: false
      // breakpoints: this.sliderBreakpoints(),
    }
  }
}

const frontSlider = () => {
  window.addEventListener('load', () => {
    if (document.querySelector('.js-front')) {
      [...document.querySelectorAll('.js-front')].forEach((item, index) => {
        const slider = new Front(item, index)
        slider.init()
      })
    }
  })
}
export default frontSlider
