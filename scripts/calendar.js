$(document).ready(function() {
	const leftNavList = $('.c-left-nav__month');
	const arrowUp = $('.calendar--up');
	const arrowDown = $('.calendar--down');
	const months = $('.month');
	let translate = 0;
	let topInView = 0;
	let downInView = 2;
	let upActive = false; 
	let downActive = true; 
	let active = 0;
	let offsets = [];
	let offsetMargin = $(window).height()/3.5;
	let firstmonthOffset = months[0].offsetTop;

	let marginTop = $('.date__row').css('margin-top');
	marginTop= parseInt(marginTop.replace('px',''));

	const calcOffsets = function () {
		offsets = [0];
		$.each(months, (index, month) => {
			offsets.push(month.offsetTop + month.offsetHeight + marginTop - firstmonthOffset);
		});
	};

	const scrollTo = function(active) {
		$("html, body").animate({ scrollTop: offsets[active]},1000,'swing');	
	};

	const setScrollPermission = function (active) {
		if (active == 0)	{
			upActive = false;
			downActive = true;
		} else if (active == leftNavList.length - 1) {
			upActive = true;
			downActive = false;
		} else {
			upActive = downActive = true;
		}

		if(!upActive) {
			arrowUp.addClass('arrow--inactive');
		} else {
			arrowUp.removeClass('arrow--inactive');
		}

		if(!downActive) {
			arrowDown.addClass('arrow--inactive');
		} else {
			arrowDown.removeClass('arrow--inactive');
		}
	};

	const scrollAction = function(currentActive, nextActive, permission) {
		if (permission) {
			calcOffsets();
			
			leftNavList[currentActive].classList.remove('c-left-nav__month--active');
			leftNavList[nextActive].classList.add('c-left-nav__month--active');
			active = nextActive;
			
			if(active <topInView || active > downInView) {
				translate = (nextActive > currentActive) ? translate - 7.7: translate + 7.7;
				$('.c-left-nav__month').css('transform', 'translateY(' + translate + 'rem)');
				topInView = (nextActive > currentActive) ? topInView + 1: topInView - 1;
				downInView = (nextActive > currentActive) ? downInView + 1: downInView - 1;
			}

			setScrollPermission(active);
		}
	};

	calcOffsets();
	scrollTo(0);

	var tempactive = 0;
	$(window).on('scroll', function() {
		let pageOffset = window.pageYOffset + window.innerHeight;
		$.each(offsets, function(index, offset) {
			if(offsets[index] + firstmonthOffset + offsetMargin < pageOffset && pageOffset < offsets[index + 1] + firstmonthOffset + offsetMargin) {
				let nextActive = index;
				if(nextActive != tempactive) {
					// console.log(tempactive, nextActive);
					scrollAction(tempactive, nextActive, true);
					tempactive = nextActive;
				}
			}
		});

	});

	$('.calendar--down').on('click', () => {
		let nextActive = active + 1;
		scrollAction(active, active + 1, downActive);
		scrollTo(nextActive);
	});

	$('.calendar--up').on('click', () => {
		let nextActive = active - 1;
		scrollAction(active, active - 1, upActive);
		scrollTo(nextActive);
	});

	$('.c-left-nav__month').on('click', function () {
		let nextActive = $(this).data('active');
		scrollAction(active, nextActive, true);
		scrollTo(nextActive);
	});

	const event_links = $('.c-read__more');

	const readMoreEvents = function(e) {
		let event_id = $(this).data('event');
		$('#' + event_id).toggleClass('height--auto');
		$(this).children('i').toggleClass('fa-chevron-down');
		$(this).children('i').toggleClass('fa-chevron-up');
		calcOffsets();
	}

	for(let i = 0; i < event_links.length; i++)
		event_links.eq(i).on('click', i, readMoreEvents);

});