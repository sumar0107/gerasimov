import MaterialTabsClass from "./material-tabs-class";


const materialTabs = () => {
  if (document.querySelector('.js-mdc-tab-bar')) {
    const tab = new MaterialTabsClass('.js-mdc-tab-bar');
    tab.init();
  }
};

module.exports = materialTabs;
