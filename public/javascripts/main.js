/*global jQuery */
(function ($) {
    "use strict";

    jQuery(document).ready(function ($) {
        /*---------------------------------
         All Window Scroll Function Start
        --------------------------------- */
        $(window).scroll(function () {
            // Header Fix Js Here
            if ($(window).scrollTop() >= 200) {
                $('#header-area').addClass('fixTotop');
            } else {
                $('#header-area').removeClass('fixTotop');
            }

            // Scroll top Js Here
            if ($(window).scrollTop() >= 400) {
                $('.scroll-top').slideDown(400);
            } else {
                $('.scroll-top').slideUp(400);
            }
        });
        /*--------------------------------
         All Window Scroll Function End
        --------------------------------- */

        // Partner Carousel
        $(".partner-content-wrap").owlCarousel({
            loop: true,
            margin: 15,
            autoplay: true,
            autoplayTimeout: 1500,
            nav: false,
            dots: false,
            rtl: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 3
                },
                1000: {
                    items: 5
                }
            }
        }); // Partner Carousel End


        // // Funfact Count JS
        // $('.counter').counterUp({
        //     delay: 10,
        //     time: 1000
        // });

        // Video Bg JS 
        $('#mobileapp-video-bg').YTPlayer({
            fitToBackground: true,
            videoURL: 'MMAjpmjHr8o',
            containment: '#mobile-app-area',
            quality: 'highres',
            loop: true,
            showControls: false,
            opacity: 1,
            mute: true
        }); // Video Bg End

        // Click to Scroll TOP
        $(".scroll-top").click(function () {
            $('html, body').animate({
                scrollTop: 0
            }, 1500);
        }); //Scroll TOP End

        // SlickNav or Mobile Menu
        $(".mainmenu").slicknav({
            'label': '',
            'prependTo': '#header-bottom .container .row'
        }); // SlickNav End


        // Slideshow
        $("#slideslow-bg").vegas({
            overlay: true,
            transition: 'fade',
            transitionDuration: 2000,
            delay: 4000,
            color: '#000',
            animation: 'random',
            animationDuration: 20000,
            slides: [
                {
                    src: './images/slide1.jpg'
                },
                {
                    src: '/images/slide2.jpg'
                },
                {
                    src: 'images/slide3.jpg'
                },
                {
                    src: 'images/slide4.jpg'
                }
            ]
        }); // Slideshow

        // // Home Page Two Date Picker JS

        // $('#startDate2').datepicker({
        //     uiLibrary: 'bootstrap4',
        //     iconsLibrary: 'fontawesome',
        //     minDate: today,
        //     maxDate: function () {
        //         return $('#endDate2').val();
        //     }
        // });

        // $('#endDate2').datepicker({
        //     uiLibrary: 'bootstrap4',
        //     iconsLibrary: 'fontawesome',
        //     minDate: function () {
        //         return $('#startDate2').val();
        //     }
        // });

        // // Car Details Slider Start
        // $(".car-preview-crousel").owlCarousel({
        //     loop: true,
        //     items: 1,
        //     autoplay: true,
        //     autoplayHoverPause: true,
        //     autoplayTimeout: 2000,
        //     nav: false,
        //     dots: true,
        //     animateOut: 'fadeOut',
        //     animateIn: 'fadeIn'
        // });

        // Home 2 Service Carousel
        $(".service-container-wrap").owlCarousel({
            loop: true,
            items: 3,
            margin: 20,
            autoplay: true,
            autoplayHoverPause: true,
            autoplayTimeout: 2000,
            nav: false,
            dots: true,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                1000: {
                    items: 3
                }
            }
        });


    }); //Ready Function End

    // jQuery(window).load(function () {
    //     jQuery('.preloader').fadeOut();
    //     jQuery('.preloader-spinner').delay(350).fadeOut('slow');
    //     jQuery('body').removeClass('loader-active');
    //     jQuery(".popular-car-gird").isotope();
    // }); //window load End


}(jQuery));