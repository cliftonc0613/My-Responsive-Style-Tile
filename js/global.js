$("#owl-demo").owlCarousel({

  autoPlay: 5000,

  items : 4,
  itemsDesktop : [1199,3],
  itemsDesktopSmall : [979,3]

});



$(document).foundation();

var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

$(document).on('close.fndtn.alert-box', function(event) {
  console.info('An alert box has been closed!');
});



