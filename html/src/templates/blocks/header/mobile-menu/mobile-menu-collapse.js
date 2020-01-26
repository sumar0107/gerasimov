const menu = () => {
  if ($('.mobile-menu__substrate').length > 0) {
    const $menuSubstrate = $('.mobile-menu__substrate')
    const $header = $('.header')
    $('#menu')
      .on('show.bs.collapse', () => {
        $header.addClass('z-i-13')
        $menuSubstrate.collapse('toggle')
      })
      .on('hide.bs.collapse', () => {
        $header.removeClass('z-i-13')
        $menuSubstrate.collapse('toggle')
      })
  }

};

export default menu;



