var myMap;

$(document).ready(function() {

    $('.tel-input').inputmask({
        "mask": "+7 (999) 999-99-99"
        , "placeholder": "_"
        , showMaskOnHover: false
        , showMaskOnFocus: true
    });

    restructSlider();

    $(window).resize(function() {
        restructSlider();

        myMap.destroy();

        initMap();
    });

    $('.header__mobile-menu').click(function(e) {
        e.preventDefault();
        $('.header').toggleClass('header--opened_menu');
    });

    $('.projects__slider').slick({
        arrows: true,
        dots: true,
        fade: true,
        autoplay: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    fade: false
                }
            }
        ]
    });

    $('.reviews__slider').slick({
        arrows: true,
        dots: true,
        autoplay: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '50px',
                }
            }
        ]
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('.header').addClass('header--scroll');
        }
        else {
            $('.header').removeClass('header--scroll');
        }
    });

    // map

    initMap();

    // modal

    $('.open-modal').click(function(e) {
        e.preventDefault();
        $('body').addClass('opened-modal');
        $('#call-modal').addClass('modal--opened');
    });

    $('.modal').click(function(e) {
        $(this).removeClass('modal--opened');
        $('body').removeClass('opened-modal');
    });

    $('.modal__content').click(function(e) {
        e.stopPropagation();
    });

    $('.close-modal').click(function(e) {
        $(this).parents('.modal').removeClass('modal--opened');
        $('body').removeClass('opened-modal');
    });

    // form

    $('.contacts__input').focusout(function(e) {
        if ($(this).val() != '') $(this).addClass('contacts__input--full');
        else $(this).removeClass('contacts__input--full');
    });

    $('.contacts__form button').click(function(e) {
        e.preventDefault();

        var err = false;

        var name = $(this).parents('form').find('.contacts__input[name=name]');
        if (name.val() == '') {
            name.addClass('contacts__input--error');
            err = true;
        }

        var phone = $(this).parents('form').find('.contacts__input[name=phone]');
        if (phone.val() == '' || !phone.val().match(/\+7\s\([0-9]{3}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}/)) {
            phone.addClass('contacts__input--error');
            err = true;
        }

        if (!err) {
            $('#call-modal').removeClass('modal--opened');
            $('body').addClass('opened-modal');
            $('#thank-modal').addClass('modal--opened');
            $('.contacts__input').val('').removeClass('contacts__input--full');
        }
    });

    $('.contacts__input').keyup(function(e) {
        if ($(this).val() != '') $(this).removeClass('contacts__input--error');
    });
});

function restructSlider() {
    if ($(window).width() < 992) {
        $('.projects__item').each(function() {
            $(this).append($(this).find('.projects__name'));
        });
    }
    else {
        $('.projects__item').each(function() {
            $(this).find('.projects__content').prepend($(this).find('.projects__name'));
        });
    }
}

function initMap() {
    ymaps.ready(function () {
        myMap = new ymaps.Map('map', {
            center: [43.611423, 39.730661],
            zoom: 16,
            controls: ['zoomControl']
        });

        var newcoord = myMap.getGlobalPixelCenter();

        if (window.innerWidth < 768) {
            newcoord[1] += 200;
        }
        else {
            newcoord[0] -= 420;
        }
        myMap.setGlobalPixelCenter(newcoord);

        var myPlacemark = new ymaps.Placemark([43.611423, 39.730661], {}, {
            iconLayout: 'default#image',
            iconImageHref: 'img/mark.svg',
            iconImageSize: [33, 47],
            iconImageOffset: [-16, -47]
        });

        myMap.geoObjects.add(myPlacemark);

        myMap.balloon.open([43.612323, 39.730661], '<div class="contacts__mark-name">Адрес</div><div class="contacts__mark-address">Сочи, Гагарина 67а</div>', {
            closeButton: false
        });

        myMap.behaviors.disable('scrollZoom');
    });
}