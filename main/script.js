var navStatus = true;

$(document).on('readystatechange', function() {
})

$(document).on('click', '#nav-toggle', function() {
    if (navStatus) {
        $('nav:not(inactive)').addClass("inactive");
        $(this).children().css("transform", "rotateZ(180deg)");
    }
    else {
        $('nav.inactive').removeClass("inactive");
        $(this).children().css("transform", "rotateZ(0)");
    }
    navStatus = !navStatus;
})