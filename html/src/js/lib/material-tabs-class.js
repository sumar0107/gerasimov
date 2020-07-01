import { MDCTabBar } from '@material/tab-bar'
import { MDCSelect } from '@material/select'
import enquire from 'enquire.js/dist/enquire'

export default class MaterialTabsClass {
  constructor(el) {
    this.MDCTabs = el
    this.wrapper = this.MDCTabs.parentElement
  }

  init() {
    this.initTabBar()
    const initSelect = () => this.initSelect()
    const destroyedSelect = () => this.destroyedSelect()

    enquire.register('(max-width: 33.75rem)', {
      setup() {
        // console.log('setup');
      },
      match() {
        // console.log('window < 540');
        initSelect()
      },
      unmatch() {
        // console.log('window > 540');
        destroyedSelect()
      }
    })
  }

  initTabBar() {
    this.tabBar = new MDCTabBar(this.MDCTabs)
  }

  createSelect() {
    // eslint-disable-next-line no-use-before-define
    const listItems = this.tabBar.tabList_
      .map((item, index) => {
        const attributes = [...item.root_.attributes].map(atr => {
          if (atr.nodeName === 'class') {
            return ''
          }
          if (atr.nodeName === 'id') {
            return `data-id="${atr.nodeValue}"`
          }
          return `${atr.nodeName}="${atr.nodeValue}"`
        }).join(' ')
        if (item.active) {
          return `<li class='mdc-list-item mdc-list-item--selected' data-value='${index}' aria-selected='true' ${attributes}>${item.root_.name || item.root_.innerText}</li>`
        } else {
          return `<li class='mdc-list-item' data-value='${index}' ${attributes}>${item.root_.name || item.root_.innerText}</li>`
        }
      })
      .join('')
    const select = `<div class='mdc-select'>
              <div class='mdc-select__anchor'>
                <svg class='mdc-select__dropdown-icon icon icon-arrow-down '>
                  <use xlink:href='/themes/egp/img/sprite.svg#icon-arrow-down'></use>
                </svg>
                <div class='mdc-select__selected-text'></div>
              </div>
              <div class='mdc-select__menu mdc-menu mdc-menu-surface'>
                <ul class='mdc-list nav-list-group'>
                  ${listItems}
                </ul>
              </div>
            </div>`
    this.wrapper.insertAdjacentHTML('beforeend', select)

    this.selectEl = this.wrapper.querySelector('.mdc-select')
  }

  initSelect() {
    this.createSelect()
    this.select = new MDCSelect(this.selectEl)
    this.select.listen('MDCSelect:change', () => {
      // console.log(`Index -- ${this.select.selectedIndex}`, `Value -- "${this.select.value}"`);
      setTimeout(() => this.tabBar.activateTab(this.select.selectedIndex), 0);
    });
  }

  destroyedSelect() {
    if (this.selectEl) {
      this.tabBar.activateTab(+this.select.selectedIndex)
      this.select.destroy()
      this.selectEl.remove()
    }
  }

  getTab() {
    return this.tabBar
  }

  getSelect() {
    return this.select
  }
}
