const menu = () => {
  if ($('.mobile-menu__substrate').length > 0) {
    const $menuSubstrate = $('.mobile-menu__substrate')
    $('#menu')
      .on('show.bs.collapse', () => $menuSubstrate.collapse('toggle'))
      .on('hide.bs.collapse', () => $menuSubstrate.collapse('toggle'))
  }

};

export default menu;



