var lastScrollTop = $(window).scrollTop();

var padding = $('.g-project-head').css('padding-top');
var padding = parseInt(padding.replace('px',''));
var group_full_ofset = $(".group-full").offset().top - padding;

$(window).scroll(function() {
	st = $(this).scrollTop();
	if(lastScrollTop == 0 )
	{
		if(st > lastScrollTop)
		{
			 $("html, body").animate({ scrollTop: group_full_ofset},1000,'swing');
		}
	}
	lastScrollTop = st;
});