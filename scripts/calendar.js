$(document).ready(function() {
	const leftNavList = $('.c-left-nav__month');
	const arrowUp = $('.calendar--up');
	const arrowDown = $('.calendar--down');
	let translate = 0;
	let topInView = 0;
	let downInView = 2;
	let upActive = false; 
	let downActive = true; 
	let active = 0;

	let setScrollPermission = function (active) {
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

	}


	$('.calendar--down').on('click', function() {
		if (downActive) {
			leftNavList[active].classList.remove('c-left-nav__month--active');
			leftNavList[active + 1].classList.add('c-left-nav__month--active');
			active++;
			
			if(active <topInView || active > downInView) {
				translate = translate - 7.7;
				$('.c-left-nav__month').css('transform', 'translateY(' + translate + 'rem)');
				topInView++;
				downInView++;
			}
			
			setScrollPermission(active);
		}
	});

	$('.calendar--up').on('click', function() {
		if (upActive) {
			leftNavList[active].classList.remove('c-left-nav__month--active');
			leftNavList[active - 1].classList.add('c-left-nav__month--active');
			active--;

			if (active < topInView || active >downInView) {
				translate = translate + 7.7;
				$('.c-left-nav__month').css('transform', 'translateY(' + translate + 'rem)');
				topInView--;
				downInView--;
			}
			console.log(active);
			setScrollPermission(active);
		}
	});
});