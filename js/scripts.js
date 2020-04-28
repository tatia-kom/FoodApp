$(document).ready(function() {

    restructSliders();

    $('.already__block').slick({
        arrows: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 1500,
        infinite: true,
        centerMode: true,
        centerPadding: '50px',
        slidesToShow: 5,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 501,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $(window).resize(function() {
        restructSliders();
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() > 0) {
            $('.header').addClass('header--scroll');
        }
        else {
            $('.header').removeClass('header--scroll');
        }
    });

    // menu

    $('.top__mobile-button').click(function(e) {
        e.preventDefault();
        if (!$('.header').hasClass('header--opened_menu')) {

            $('.top').addClass('top--opened_menu');
            $('.header').addClass('header--opened_menu');
        }
        else {
            $('.header').removeClass('header--opened_menu');
            $('.top').removeClass('top--opened_menu');
        }
    });

    $('.scroll-to').click(function(e) {
        e.preventDefault();
        $('.header').removeClass('header--opened_menu');
        $('.top').removeClass('top--opened_menu');
        var scroll_el = $(this).attr('href');
        var destination = $(scroll_el).offset().top;
        if ($(window).width() < 768) {
            if ($(this).attr('href') == '#who') {
                destination += 210;
            }
            else {
                destination -= 250;
            }
        }
        $('html, body').animate( { scrollTop: destination }, 500 );
    });

    // modal

    $('.open-modal').click(function(e) {
        e.preventDefault();
        $('body').addClass('opened-modal');
        $('#form-modal').addClass('modal--opened');
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

    $('.data-input').keyup(function() {
        $(this).removeClass('data-input--error');
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
}

function SendData(Params)
{
    var emailId = Params && Params.email ? Params.email : null;
    var nameId = Params && Params.name ? Params.name : null;

    var params = {};

    var error = false;
    if(emailId)
    {
        var mail = $('#' + emailId);
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(mail && mail.val().match(mailformat))
        {
            params.email = mail.val();
        }
        else{
            error = true;
            if(mail)
            {
                mail.addClass('data-input--error');
            }
            
        }
    }

    if(nameId)
    {
        var name = $('#' + nameId);
        if(name && name.val())
        {
            params.name = name.val();
        }
        else{
            error = true;
            if(name)
            {
                name.addClass('data-input--error');
            }
        }
        
    }

    if((params.name || params.email) && !error)
    {
        $.ajax({
            type: "POST",
            url: "https://foodapp-proxy.herokuapp.com/api/common/subscriptions",
            data: params,
            success: function(data)
            {
                // TODO: Какое то уведомление, что success

                $('#form-modal').removeClass('modal--opened');
                if (!$('body').hasClass('opened-modal')) {
                    $('body').addClass('opened-modal');
                }
                $('#success-modal').addClass('modal--opened');
            },
            fail: function(data){
                // TODO: Какое то уведомление, что fail

                $('#form-modal').removeClass('modal--opened');
                if (!$('body').hasClass('opened-modal')) {
                    $('body').addClass('opened-modal');
                }
                $('#error-modal').addClass('modal--opened');
            }
        });
    
        return false;
    }else{
        // TODO: Ошибка какая то
    }
    
}