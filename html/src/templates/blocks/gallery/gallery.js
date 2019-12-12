import Swiper from 'swiper';
import classie from 'classie';
import imagesLoaded from 'imagesloaded';

function createListItem(el, src, index) {
  el.insertAdjacentHTML('beforeend', `
                                <div class='gallery-list__item'>
                                  <a class='gallery-list__link' href='#' data-index='${index}'>
                                      <div class='gallery-list__img'>
                                        <div class='gallery-list__img-inner'>
                                            <img src='${src}' alt=''>
                                        </div>
                                      </div>
                                  </a>
                                </div>`);
}

function isFullScreen() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    classie.addClass(document.body, 'slideshow-open')
    return true;
  }
  classie.removeClass(document.body, 'slideshow-open')
  return false
}

function closeFullScreen(el) {
  if (el.exitFullscreen) {
    el.exitFullscreen();
  } else if (el.webkitExitFullscreen) {
    el.webkitExitFullscreen();
  } else if (el.mozCancelFullScreen) {
    el.mozCancelFullScreen();
  } else if (el.msExitFullscreen) {
    el.msExitFullscreen();
  }
}

function openFullScreen(el) {
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}

function debounce(...args) {
  const [fn, delay, immediate] = args
  let timeout;
  return () => {
    const elem = this;
    const originalArguments = args;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        fn.apply(elem, originalArguments);
      }
    }, delay);
    if (callNow) {
      fn.apply(elem, originalArguments);
    }
  };
}

let respond;

class Gallery {
  constructor(el, counter) {
    this.counter = counter;
    this.DOM = {el};
    this.DOM.wrapper = this.DOM.el.closest('.swiper__wrapper');
    this.DOM.btnPrev = this.DOM.wrapper.querySelector('.js-swiper-button-prev');
    this.DOM.btnNext = this.DOM.wrapper.querySelector('.js-swiper-button-next');
    this.DOM.btnFullscreen = this.DOM.wrapper.querySelector('.js-swiper-button-fullscreen');
    this.DOM.btnFullscreenClose = this.DOM.wrapper.querySelector('.js-swiper-button-fullscreen-close');
    this.DOM.btnlistShow = this.DOM.wrapper.querySelector('.js-swiper-button-list-open');
    this.DOM.btnListClose = this.DOM.wrapper.querySelector('.js-swiper-button-list-close');
    this.DOM.pagination = this.DOM.wrapper.querySelector('.js-swiper-pagination');
    this.DOM.scrollbar = this.DOM.wrapper.querySelector('.js-swiper-scrollbar');
    this.DOM.images = [...this.DOM.wrapper.querySelectorAll('.swiper-item img')];
    this.DOM.list = this.DOM.wrapper.querySelector('.js-gallery-list');
    this.DOM.listRow = this.DOM.list.querySelector('.gallery-list__row');
    classie.addClass(this.DOM.btnPrev, `js-swiper-gallery-button-prev-${this.counter}`);
    classie.addClass(this.DOM.btnNext, `js-swiper-gallery-button-next-${this.counter}`);
    classie.addClass(this.DOM.pagination, `js-swiper-gallery-pagination-${this.counter}`);
    classie.addClass(this.DOM.scrollbar, `js-swiper-gallery-scrollbar-${this.counter}`);
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

  mouseMoveOn() {
    const revealUI = () => {
      if (classie.hasClass(document.body, 'hide-project-ui')) {
        classie.removeClass(document.body, 'hide-project-ui');
      }
      clearTimeout(respond);
      respond = setTimeout(() => {
        if (isFullScreen()) {
          classie.addClass(document.body, 'hide-project-ui');
        }
      }, 2500);
    }
    this.DOM.el.addEventListener('mousemove', debounce(revealUI, 100));
  }

  mouseMoveOff() {
    classie.removeClass(document.body, 'hide-project-ui');
    $(this.DOM.el).off('mousemove');
    setTimeout(()=>this.slider.update(),0)
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
    this.DOM.btnFullscreen.addEventListener('click', () => {
      this.flClick()
    });
    this.DOM.btnFullscreenClose.addEventListener('click', () => {
      this.flClick()
    });
    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', () => {
      this.DOM.btnFullscreen.classList.toggle('active');
      this.DOM.btnFullscreenClose.classList.toggle('active');
      this.DOM.wrapper.dataset.view = (this.DOM.wrapper.dataset.view === 'detail') ? '' : 'detail';
      if (!isFullScreen()) {
        this.mouseMoveOff();
      }
    });
    imagesLoaded(this.slider.el).on('done', () => this.slider.init());
  }

  flClick() {
    if (isFullScreen()) {
      closeFullScreen(document);
      this.mouseMoveOff();
    } else {
      openFullScreen(this.DOM.wrapper);
      this.mouseMoveOn();
    }
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
        el: `.js-swiper-gallery-pagination-${this.counter}`,
        type: 'fraction',
      },
      navigation: {
        nextEl: `.js-swiper-gallery-button-next-${this.counter}`,
        prevEl: `.js-swiper-gallery-button-prev-${this.counter}`
      },
      scrollbar: {
        el: `.js-swiper-gallery-scrollbar-${this.counter}`,
        hide: false,
      },
      init: false
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
