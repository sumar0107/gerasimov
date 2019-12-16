import fancybox from '@fancyapps/fancybox';

const popup = () => {
  $.fancybox.defaults.btnTpl.smallBtn =
    `<button type="button" data-fancybox-close class="as123123 fancybox-button fancybox-close-small"">
      <svg class="icon icon-close "><use xlink:href="./assets/img/sprite.svg#icon-close"></use></svg>
    </button>`;
  $('[data-fancybox="award-list"]')
    .fancybox({
      buttons: [
        // "zoom",
        // "share",
        // "slideShow",
        // "fullScreen",
        // "download",
        // "thumbs",
        "close"
      ],
      smallBtn: true,
      btnTpl: {
        // smallBtn: '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}">' +
        //   '<svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg>' +
        //   "</button>",
        smallBtn: `<button type="button" data-fancybox-close class="as123123 fancybox-button fancybox-close-small"">
                        <svg class="icon icon-close ">
                          <use xlink:href="./assets/img/sprite.svg#icon-close"></use>
                        </svg>
                    </button>`
      },
      afterLoad(instance, current) {
// console.log(111111111);
      }
    });

// .on('click', (e) => {
//     e.preventDefault()
//   })
}
export default popup
