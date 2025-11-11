// Toggle expand/collapse on the .nice-block span
$(".nice-block span").click(function () {
    $(this).parent().toggleClass("more");

    if ($(this).html() == "more") {
        $(this).html("less");
    } else {
        $(this).html("more");
    }
});

// Optional: keyboard accessibility - toggle when Enter pressed on the span
$(".nice-block span").attr("tabindex", "0").on('keydown', function(e){
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).click();
    }
});