import MaterialTabsClass from "./material-tabs-class";


const materialTabs = () => {
  if (document.querySelector('.js-mdc-tab-bar')) {
    const tabs = [...document.querySelectorAll('.js-mdc-tab-bar')];
    tabs.forEach(item => {
      const tab = new MaterialTabsClass(item);
      tab.init();
    })
  }
};

module.exports = materialTabs;
