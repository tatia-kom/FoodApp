$(document).ready(function() {

    restructSliders();

    $(window).resize(function() {
        restructSliders();
    });

    // menu

    $('.top__mobile-button').click(function(e) {
        e.preventDefault();
        $('.header').toggleClass('header--opened_menu');
    });

    $('.scroll-to').click(function(e) {
        e.preventDefault();
        $('.header').removeClass('header--opened_menu');
        var scroll_el = $(this).attr('href');
        var destination = $(scroll_el).offset().top;
        $('html, body').animate( { scrollTop: destination }, 500 );
    });

    // modal

    $('.open-modal').click(function(e) {
        e.preventDefault();
        $('body').addClass('opened-modal');
        $('.modal').addClass('modal--opened');
    });

    $('.modal').click(function(e) {
        $(this).removeClass('modal--opened');
        $('body').removeClass('opened-modal');
    });

    $('.modal__content').click(function(e) {
        e.stopPropagation();
    });

    $('.modal__close').click(function(e) {
        $(this).parents('.modal').removeClass('modal--opened');
        $('body').removeClass('opened-modal');
    });
});

function restructSliders() {

    if ($(window).width() < 768) {
        if (!$('.tariffs__flex').hasClass('slick-slider')) {
            $('.tariffs__flex').slick({
                arrows: false,
                dots: false,
                autoplay: false,
                infinite: true,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1,
                slidesToScroll: 1
            });
        }
    }
    else {
        if ($('.tariffs__flex').hasClass('slick-slider')) {
            $('.tariffs__flex').slick('unslick');
        }
    }

    if ($(window).width() < 992) {
        if (!$('.already__block').hasClass('slick-slider')) {
            $('.already__block').slick({
                arrows: false,
                dots: false,
                autoplay: false,
                infinite: true,
                centerMode: true,
                centerPadding: '50px',
                slidesToShow: 3,
                slidesToScroll: 1,
                responsive: [
                    {
                        breakpoint: 501,
                        settings: {
                            slidesToShow: 1
                        }
                    }
                ]
            });
        }
    }
    else {
        if ($('.already__block').hasClass('slick-slider')) {
            $('.already__block').slick('unslick');
        }
    }
}