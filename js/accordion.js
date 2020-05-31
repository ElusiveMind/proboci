jQuery(document).ready(function($) {
  var details = $('.details');
  details.find("tr").not('.accordion').hide();
  details.find("tr").eq(0).show();

  details.find(".accordion").click(function() {
    $('.accordion').siblings('tr').hide();
    $(this).siblings("tr").fadeToggle(250);
  }).eq(0).trigger('click');
});
