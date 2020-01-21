import fancybox from '@fancyapps/fancybox'

const popup = () => {
  $.fancybox.defaults.btnTpl.smallBtn =
    `<button type='button' data-fancybox-close class='as123123 fancybox-button fancybox-close-small'">
      <svg class='icon icon-close '><use xlink:href='/themes/egp/img/sprite.svg#icon-close'></use></svg>
    </button>`
  $('[data-fancybox="award-list"]')
    .fancybox({
      buttons: [
        // "zoom",
        // "share",
        // "slideShow",
        // "fullScreen",
        // "download",
        // "thumbs",
        'close'
      ],
      smallBtn: true,
      btnTpl: {
        smallBtn: `<button type='button' data-fancybox-close class='as123123 fancybox-button fancybox-close-small'">
                        <svg class='icon icon-close '>
                          <use xlink:href='/themes/egp/img/sprite.svg#icon-close'></use>
                        </svg>
                    </button>`
      },
      // afterLoad(instance, current) {
      // }
    })
}
export default popup
