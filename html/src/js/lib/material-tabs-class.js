import {MDCTabBar} from '@material/tab-bar';


export default class MaterialTabsClass {
  constructor(el) {
    this.MDCTabs = [...document.querySelectorAll(el)]
  }

  init() {
    if (this.MDCTabs.length === 1) {
      this.MDCTabs.forEach(item => {
        this.tabBar = new MDCTabBar(item)
      })
    } else {
      this.tabBar = this.MDCTabs.map(item => new MDCTabBar(item))
    }

  }

  returnTab() {
    return this.tabBar
  }
}
