import objectFitImages from "object-fit-images"
import {polyfill} from "smoothscroll-polyfill"
import Tab from './lib/tab'
import onElementHeightChange from "./lib/onElementHeightChange"
import sayHello from "./lib/sayHello"
import gallery from "../templates/blocks/gallery/gallery";
import materialTabs from "./lib/material-tabs";
import projectGrid from "./lib/projects"
import headerFixTop from "../templates/includes/header/header";
import readMore from "./lib/read-more";
import frontSlider from "../templates/blocks/front/front";
import scrollLink from "./lib/scroll-link";
import personList from "../templates/blocks/person-list/person-list";
import partner from "../templates/blocks/partner/partner";


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

if (document.querySelector('.js-scroll-link')) {
  scrollLink();
}
if (document.querySelector('.js-grid-projects')) {
  projectGrid();
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
