$(".collapse.show").each(function () {
    $(this).prev(".widget_title").find(".fa").addClass("fa-minus").removeClass("fa-plus");
});

// Toggle plus minus icon on show hide of collapse element
$(".collapse").on('show.bs.collapse', function () {
    $(this).prev(".widget_title").find(".fa").removeClass("fa-plus").addClass("fa-minus");
}).on('hide.bs.collapse', function () {
    $(this).prev(".widget_title").find(".fa").removeClass("fa-minus").addClass("fa-plus");
});