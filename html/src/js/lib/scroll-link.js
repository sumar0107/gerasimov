import {TweenLite} from "gsap/TweenLite";
import 'waypoints/lib/jquery.waypoints';
import ScrollToPlugin from "gsap/ScrollToPlugin";
import MaterialTabsClass from "./material-tabs-class";


const scrollLink = () => {
  const tab = new MaterialTabsClass('.js-mdc-tab-bar-scroll');
  tab.init();
  // eslint-disable-next-line no-use-before-define
  const links = tab.returnTab().tabList_.map((item) => {
    return item.root_
  });
  const els = links.map((item, index) => {
    let el = document.querySelector(`${item.getAttribute('href')}`)
    el.setAttribute('data-index', index);
    return el
  });
  const wpOffset = 168;

  // down
  $(els).waypoint(function (direction) {
    if (direction === 'down' && !document.body.closest('.scrolling')) {
      tab.returnTab().activateTab(+this.element.dataset.index);
    }
  }, {
    offset: wpOffset
  });

  // up
  $(els).waypoint(function (direction) {
    if (direction === 'up' && !document.body.closest('.scrolling')) {
      tab.returnTab().activateTab(+this.element.dataset.index);
    }
  }, {
    offset: -wpOffset
  });
  links.forEach((item, index) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      document.body.classList.add('scrolling')
      TweenLite.to(window, 1, {
        scrollTo: {
          y: $(event.target.closest('.js-scroll-link')).attr('href'),
          offsetY: wpOffset,
          autoKill: false
        },
        onComplete() {
          tab.returnTab().activateTab(+index);
          document.body.classList.remove('scrolling')
        }
      });
    })
  })


  // Promise resolves once menu is open
  // var openPromise = myMenu.open();
  // menuHamburger.addEventListener('click', () => {
  //   myMenu.toggle()
  // })
};

export default scrollLink;



