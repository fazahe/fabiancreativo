
// Cambiar el tema según la preferencia del sistema
if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
) {
    $("html").attr("data-theme", "dark");
} else {
    $("html").attr("data-theme", "light");
}

$(document).ready(function () {

    // Animación de desplazamiento horizontal
    const elementoCosa = $('.slogan');
    const windowHeight = $(window).height();
    const scrollHeight = $(document).height() - windowHeight;

    $(window).on('scroll', function () {
        const scrollY = $(window).scrollTop();
        const translateX = (scrollY / scrollHeight) * -1000;

        if ($(window).width() <= 1500) {
            elementoCosa.css('transform', `translateX(${translateX}%)`);
        }
    });

    // Elementos aleatorios del carrucel de about
    var $container = $(".cont-cards");
    var $divs = $container.children(".cards-about");
    var arr = $divs.get();

    arr.sort(function () {
        return Math.random() - 0.5;
    });

    $container.empty();
    $.each(arr, function () {
        $container.append(this);
    });

    // Animación carrucel about //
    $(".cont-cards").slick({
        arrows: false,
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0.1,
        speed: 5000,
        pauseOnFocus: false,
        pauseOnHover: false,
        variableWidth: true,
        swipe: false,
    });

    // Agregar clase 'scrolled' al encabezado al hacer scroll
    const header = $("header");
    $(window).scroll(function () {
        if ($(window).scrollTop() > 170) {
            header.addClass("scrolled");
        } else {
            header.removeClass("scrolled");
        }
    });

    // Seguir el cursor con el elemento 'follower'
    const follower = $('#follower');
    let mouseX = 0;
    let mouseY = 0;

    $(document).mousemove(function (event) {
        mouseX = event.pageX;
        mouseY = event.pageY;
    });

    function updateFollowerPosition() {
        const delay = 0.5;
        const speed = 50;

        const targetX = mouseX;
        const targetY = mouseY;

        const currentX = parseFloat(follower.css('left')) || 0;
        const currentY = parseFloat(follower.css('top')) || 0;

        const diffX = targetX - currentX;
        const diffY = targetY - currentY;

        // Calcula la distancia entre el cursor y el elemento seguidor
        const distance = Math.sqrt(diffX * diffX + diffY * diffY);

        const minDistanceToLinks = 20; // Define la distancia mínima entre el cursor y los enlaces

        if (distance > minDistanceToLinks) {
            // Si la distancia es mayor que la distancia mínima a los enlaces, actualiza la posición
            follower.css('left', currentX + (diffX / speed) + 'px');
            follower.css('top', currentY + (diffY / speed) + 'px');
        }

        setTimeout(updateFollowerPosition, delay);
    }

    updateFollowerPosition();

    // Cambiar el tema manualmente con un botón
    $(".cont-toggle").on("click", function () {
        $(this).toggleClass("toogledark");
        var currentTheme = $("html").attr("data-theme");
        var newTheme = currentTheme === "light" ? "dark" : "light";
        $("html").attr("data-theme", newTheme);
    });

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        $(".cont-toggle").addClass("toogledark");
    }

    // Carrucel logos

    $(".slider").bxSlider({
        controls: false,
        pager: false,
        auto: true,
        minSlides: 3,
        maxSlides: 8,
        slideWidth: 200,
        slideMargin: 16,
        moveSlides: 1,
        infiniteLoop: true,
        responsive: true,
        adaptiveHeight: true,
    });
});
