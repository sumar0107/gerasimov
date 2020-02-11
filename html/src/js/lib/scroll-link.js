import { gsap } from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import 'waypoints/lib/jquery.waypoints'
import MaterialTabsClass from './material-tabs-class'
import enquire from 'enquire.js/dist/enquire'


gsap.registerPlugin(ScrollToPlugin)
export default class ScrollLink {
  constructor() {
    this.tabEl = document.querySelector('.js-mdc-tab-bar-scroll')
    this.wpOffsetUp = 168
    this.wpOffsetDown = 68
  }

  init() {
    this.initTab()
    this.links = this.tab.getTab().tabList_.map((item) => {
      return item.root_
    })
    this.els = this.links.map((item, index) => {
      let el = document.querySelector(`${item.getAttribute('href')}`)
      el.setAttribute('data-index', index)
      return el
    })
    this.eventTabs()
    this.eventSelect()
    this.wayPointDown()
    this.wayPointUp()
  }

  wpOffset(event, select) {
    if (event) {
      let elTarget = (select) ? event.target.closest('.mdc-list-item') : event.target.closest('.js-scroll-link')
      const href = elTarget.getAttribute('href')
      const el = document.querySelector(`${href}`)
      return (el.getBoundingClientRect().top > 0) ? this.wpOffsetDown : this.wpOffsetUp
    }
    return (document.body.closest('.head-effect-up')) ? this.wpOffsetDown : this.wpOffsetUp
  }

  eventTabs() {

    const self = this
    this.links.forEach((item, index) => {
      item.addEventListener('click', (event) => {
        event.preventDefault()
        document.body.classList.add('scrolling')
        self.animation($(event.target.closest('.js-scroll-link')).attr('href'), self.wpOffset(event), self.tab, index, false)
      })
    })
  }

  eventSelect() {
    const self = this
    enquire.register('(max-width: 33.75rem)', {
      match() {
        if (self.tab.getSelect()) {
          self.selectLi = [...self.tab.getSelect().menuElement_.querySelectorAll('.mdc-list-item')]
          self.selectLi.forEach((item, index) => {
            item.addEventListener('click', (event) => {
              event.preventDefault()
              document.body.classList.add('scrolling')
              self.animation($(event.target.closest('.mdc-list-item')).attr('href'), self.wpOffset(event, true), self.tab, event.target.closest('.mdc-list-item').dataset.value, true)
            })
          })
        }
      }
    })
  }

  initTab() {
    this.tab = new MaterialTabsClass(this.tabEl)
    this.tab.init()
  }

  animation(y, offsetY, tab, index, select) {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y,
        offsetY,
        autoKill: false
      },
      onComplete() {
        if (select) {
          tab.getSelect().value = index
        } else {
          tab.getTab().activateTab(+index)
        }
        document.body.classList.remove('scrolling')
      }
    })
  }

  wayPointDown() {
    const self = this
    $(self.els).waypoint(function (direction) {
      self.wayPoint(direction === 'down', self.tab, this.element.dataset.index)
    }, {
      offset: self.wpOffset()
    })
  }

  wayPointUp() {
    const self = this
    $(self.els).waypoint(function (direction) {
      self.wayPoint(direction === 'up', self.tab, this.element.dataset.index)
    }, {
      offset: -self.wpOffset()
    })
  }

  wayPoint(directionInner, tab, index) {
    if (directionInner && !document.body.closest('.scrolling')) {
      if (tab.getSelect()) {
        tab.getSelect().value = index
      } else {
        tab.getTab().activateTab(+index)
      }
    }
  }
}
