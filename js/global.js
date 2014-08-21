$("#owl-demo").owlCarousel({

  autoPlay: 5000,

  items : 4,
  itemsDesktop : [1199,3],
  itemsDesktopSmall : [979,3]

});



$(document).foundation();

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);


jQuery(window).scroll(function() {
    if (scroll >= 50) {
        $('#logo-image').attr('src', 'images/CTWDlogo.png');
        $(".important-class").addClass("padding-on-my-header");
    }
    if (scroll < 50) {
        $(".important-class").removeClass("padding-on-my-header");
        $('#logo-image').attr('src', 'images/CTWDlogo.png');
    }
});