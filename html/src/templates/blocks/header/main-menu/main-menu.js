import SuperSlide from "superslide.js/superslide-std";
import classie from "classie";


const menu = () => {
  console.log(123);
  const menuHamburger = document.querySelector('.js-menu-btn');
  const myMenu = new SuperSlide({
    slider: document.getElementById('menu'),
    content: document.querySelector('.wrapper__content'),
    animation: 'slideRight',
    allowDrag: true,
    slideContent: true,
    allowContentInteraction: true,
    closeOnBlur: true,
    width: '100%',
    onOpen() {
      classie.add(menuHamburger, 'is-active')
      classie.add(document.body, 'menu-open')
    },
    onClose() {
      classie.remove(menuHamburger, 'is-active')
    },
    beforeOpen() {
      classie.add(this.slider, 'menu-open')
    },
    beforeClose() {
      classie.remove(this.slider, 'menu-open')
      classie.remove(document.body, 'menu-open')
    }
  });


  // Promise resolves once menu is open
  // var openPromise = myMenu.open();
  menuHamburger.addEventListener('click', () => {
    myMenu.toggle()
  })
};

export default menu;



