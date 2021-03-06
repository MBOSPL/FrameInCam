( function($) {
  'use strict';
$(function(e) {	

$(window).scroll(function(){
	  var sticky = $('#header_nav'),
		  scroll = $(window).scrollTop();

	  if (scroll >= 100) sticky.addClass('sticky');
	  else sticky.removeClass('sticky');
	});

$(window).scroll(function(){
	  var sticky = $('.nav-scroll'),
		  scroll = $(window).scrollTop();

	  if (scroll >= 500){ sticky.addClass('fixed-nav');
	  $('.hlisting_header').css("display", "none");
	  }
	  else { sticky.removeClass('fixed-nav'); 
	  $('.hlisting_header').css("display", "block");
	  }
	});
/*------------------------------------------------------------------
	Category-Slider
	-------------------------------------------------------------------*/
	$('#category_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
		600:{items:3},
		900:{items:4},
        1200:{items:6}
    }
	})
	
	/*------------------------------------------------------------------
	Header Style 2 menu-toggle-bar
	-------------------------------------------------------------------*/
	$('.menu-toggle-bar').on('click', function(e) {
		   $(".navbar-collapse").toggleClass("shownav");
	});
/*------------------------------------------------------------------
	Category-Slider-2
	-------------------------------------------------------------------*/
	$('#category_slider2 .owl-carousel').owlCarousel({
    loop:true,
    margin:30,
    nav:true,
	dots:false,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
		600:{items:2},
		900:{items:3},
        1200:{items:4}
    }
	})
	
/*------------------------------------------------------------------
	Popular-Listings
	-------------------------------------------------------------------*/
	$('#popular_listing_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
	dots:false,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
        700:{items:2}, 
		1200:{items:3}
    }
	})
	
	$('#popular_listing_slider1 .owl-carousel').owlCarousel({
    loop:true,
   // rtl:true,
    margin:0,
    nav:true,
	dots:false,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1}
    }
	})

/*------------------------------------------------------------------
	Recent-Listings
	-------------------------------------------------------------------*/
	$('#recent_listing_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:15,
    nav:true,
	dots:false,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
        700:{items:2}, 
		1200:{items:3}
    }
	})
/*------------------------------------------------------------------
	Testimonial-Slider
	-------------------------------------------------------------------*/
	$('#testimonial_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
        1000:{items:1}
    }
	})
	
	/*------------------------------------------------------------------
	Testimonial-Slider
	-------------------------------------------------------------------*/
	$('#testimonial_slider2 .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
	dots:false,
    nav:true,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
        1000:{items:1}
    }
	})

/*------------------------------------------------------------------
	Listing-Gallery-Slider
	-------------------------------------------------------------------*/
	$('#listing_img_slider .owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:true,
	dots:false,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
		400:{items:2},
		768:{items:3},
        992:{items:4}
    }
	})
	
/*-------------------------------------------------------------------------------
	  Smooth scroll to anchor
	-------------------------------------------------------------------------------*/
	var navbar=$('.js-navbar');
	var navbarAffixHeight=80
	$('.js-target-scroll').on('click', function(e) {
		var target = $(this.hash);
		if (target.length) {
			$('html,body').animate({
				scrollTop: (target.offset().top - navbarAffixHeight + 1)
			}, 1000);
			return false;
		}
	});
	
/*-------------------------------------------------------------------------------
		Dashboard-Navigation
	-------------------------------------------------------------------------------*/
	$('#dashboard-responsive-nav-trigger').on('click', function(e) {
		   $("#dashboard-nav").toggle("show");
	});

/*------------------------------------------------------------------
	Testimonial-Slider
	-------------------------------------------------------------------*/
	$('#reviews-slider.owl-carousel').owlCarousel({
    loop:true,
    margin:0,
    nav:false,
	autoplay:true,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
        1000:{items:1}
    }
	})
/*------------------------------------------------------------------
	Categories-Slider
	-------------------------------------------------------------------*/
	$('#categories-slider .owl-carousel').owlCarousel({
    loop:true,
    margin:20,
    nav:false,
	autoplay:false,
    autoplayTimeout:5000,
    responsive:{
        0:{items:1},
		600:{items:2},
		900:{items:3},
        1000:{items:6}
    }
	})


/*-------------------------------------------------------------------------------
		Add-Navigation-Arrow
	-------------------------------------------------------------------------------*/
$(function() {
    $('#navigation li.menu-item-has-children .arrow').on('click', function(e) {
        e.stopPropagation();
		var $el = $(this).siblings('ul.sub-menu').slideToggle();
    });
        $('#navigation li.menu-item-has-children .arrow').on('click', function(e) {
        e.stopImmediatePropagation();  
    });
});	

});
})(jQuery);