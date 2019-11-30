import {MDCTabBar} from '@material/tab-bar';


const initTabs = () => {
  if (document.querySelector('.mdc-tab-bar')) {
    const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));
  }
};
module.exports = initTabs;
