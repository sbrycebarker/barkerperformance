$(document).ready(function() {



    $(window).scroll(function() {
        let sc = $(window).scrollTop();
        if (sc > 2100 && sc < 2800) {
            $("#" + 'about').css("color", "#ff2800")
        } else {
            $('#about').css("color", "inherit")
        }
    })

})
