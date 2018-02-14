var lastScrollTop = $(window).scrollTop();

var padding = $('.g-project-head').css('padding-top');
var padding = parseInt(padding.replace('px',''));
var group_full_ofset = $(".group-full").offset().top - padding;


$(".scroll-down").click(() => scroll_to_head(true));

if( $(window).scrollTop()==0){
	$('.scroll-down').removeClass("hidden-arrow");
}

$(window).scroll(() => scroll_to_head(false));
$(window).scroll(() => {
	if ($(window).scrollTop() == 0){
		$('.scroll-down').removeClass('hidden-arrow');
	}
});

var scroll_to_head = function(clicked){
	st = $(window).scrollTop();
	if(lastScrollTop == 0)
	{
		if(st > lastScrollTop || clicked == true)
		{
			$('.scroll-down').addClass('hidden-arrow');
			$("html, body").animate({ scrollTop: group_full_ofset},1000,'swing');
		}
	}
	lastScrollTop = st;
}
