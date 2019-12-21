import objectFitImages from "object-fit-images"
import {polyfill} from "smoothscroll-polyfill"
import Collapse from 'bootstrap/js/src/collapse'
import Tab from './lib/tab'
import onElementHeightChange from "./lib/onElementHeightChange"
import gallery from "../templates/blocks/gallery/gallery";
import materialTabs from "./lib/material-tabs";
import Grid from "./lib/grid"
import headerFixTop from "../templates/includes/header/header";
import readMore from "./lib/read-more";
import frontSlider from "../templates/blocks/front/front";
import personList from "../templates/blocks/person-list/person-list";
import partner from "../templates/blocks/partner/partner";
import gridFilterInit from "./lib/grid-filter";
import ScrollLink from "./lib/scroll-link";
import menu from "../templates/blocks/header/mobile-menu/mobile-menu-collapse";
import popup from "../templates/includes/popup/popup";
import custom from "./lib/custom";


// kick off the polyfill!
polyfill();
objectFitImages();

headerFixTop();
readMore();
frontSlider();
gallery();
materialTabs();
personList();
partner();
popup()
custom()
if (document.querySelector('.js-scroll-link')) {
  const scrollLink = new ScrollLink()
  scrollLink.init()
}
if (document.querySelector('.js-grid-projects .projects__item')) {
  const grid = new Grid('.js-grid-projects', '.js-grid-projects-item', '.projects__item');
  const filter = !!(document.querySelector('[data-filter]'))
  grid.init(filter)
}
if (document.querySelector('.js-grid-publications .publications__item')) {
  const grid = new Grid('.js-grid-publications', '.js-grid-publications-item', '.publications__item');
  const filter = !!(document.querySelector('[data-filter]'))
  grid.init(filter)
}
if (document.querySelector('.js-menu-btn')) {
  menu()
}


const innitFunc = () => {

};
document.addEventListener('DOMContentLoaded', () => {
  innitFunc();
});

window.addEventListener('resize', () => {
  innitFunc();
});

onElementHeightChange(document.body, () => {
  innitFunc();
});
