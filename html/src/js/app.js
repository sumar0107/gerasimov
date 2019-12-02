import objectFitImages from "object-fit-images"
import {polyfill} from "smoothscroll-polyfill"
import Tab from './lib/tab'
import onElementHeightChange from "./lib/onElementHeightChange"
import sayHello from "./lib/sayHello"
import gallery from "../templates/blocks/gallery/gallery";
import initTabs from "./lib/tabs-material";
import projectGrid from "./lib/projects"
import headerFixTop from "../templates/includes/header/header";
import readMore from "./lib/read-more";


// kick off the polyfill!
polyfill();
objectFitImages();

headerFixTop();
readMore();

gallery();
initTabs();
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
