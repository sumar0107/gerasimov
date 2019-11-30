import objectFitImages from "object-fit-images"
import {polyfill} from "smoothscroll-polyfill"
import $ from 'jquery'
import Tab from './lib/tab' // Modal
import onElementHeightChange from "./lib/onElementHeightChange"
import sayHello from "./lib/sayHello"
import gallery from "../templates/blocks/gallery/gallery";
import initTabs from "./lib/tabs-material";
import projectGrid from "./lib/projects"


// kick off the polyfill!
polyfill();
objectFitImages();


sayHello();

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
console.log(Tab) // Tabs

console.log($.fn.tab)
