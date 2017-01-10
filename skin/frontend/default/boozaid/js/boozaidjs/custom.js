jQuery(function($){
	
	/* Mobile Menu */
	
	/* Mobile Menu */
	
	$("#navigation").mmenu({
			extensions	: [ 'effect-slide-menu', 'pageshadow','effect-menu-slide', 'effect-listitems-slide', 'multiline', 'pagedim'],
			counters	: true,
			navbar 		: {
				title		: 'Menu'
			},
			offCanvas: {
               position  : "right",
            },
			navbars		: [
			{
				position	: 'top',
				content		: [
					'prev',
					'title',
					'close'
				]
			}]
		}, {clone: true});
		
	var API = $("#mm-navigation").data("mmenu");

	$("#menuBtn").click(function() {
		API.open();
	});
	
	/* Reviews Slider */
	
	$('#reviews .videos .slides').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
		arrows: false,
		pauseOnHover: false,
        autoplay: false,
		infinite: false,
		vertical: true,
		verticalSwiping: true,
		arrows: true,
		 responsive: [
			{
			  breakpoint: 992,
			  settings: {
				vertical: false,
				verticalSwiping: false
			  }
			},
			
			{
			  breakpoint: 767,
			  settings: {
				slidesToShow: 1,
				vertical: false,
				verticalSwiping: false
			  }
			}
		]
    });
	
	/* As Seen On Slider */

    $('#asSeenOn .slides').slick({
        slidesToShow: 5.99,
        slidesToScroll: 1,
		arrows: false,
        autoplay: true,
		infinite: true,
		speed: 1000,
		autoplaySpeed: 1000,
		pauseOnHover: false,
		draggable: false,
		 responsive: [
			{
			  breakpoint: 1370,
			  settings: {
				slidesToShow: 5
			  }
			},
			{
			  breakpoint: 992,
			  settings: {
				slidesToShow: 4
			  }
			},
			
			{
			  breakpoint: 767,
			  settings: {
					slidesToShow: 3
			  }
			}
		]
    });
	
	/* FAQs Tabs */
	
	$("#faqs dl dt").on("click", function(){
		$(this).next("dd").slideToggle();
	});

	/* Fancy Box */
	
	$(".fancybox").fancybox({
		openEffect: "elastic",
		closeEffect: "elastic"
	});
	
	$(".fancybox-media").fancybox({
		openEffect: "elastic",
		closeEffect: "elastic",
		helpers : {
			media : {}
		}
	});
	
	/* Placeholder for Older Browser */
	$("input, textarea").placeholder();	
	
});
