$(document).ready(function(){

	$('.arrow--right').click(function(){
		$('.h-notice').toggleClass('h-notice--main');
		$('.notices-list').toggleClass('notices-list--main')
		$('.arrow--right>i').toggleClass('arrow--left');
		$('.h-notice__all').toggleClass('h-notice__all--main');
		$('.main-bg').toggleClass('main-bg--blur');
		$('.h-head').toggleClass('h-head--disappear')
	});
	

	/* ACHIEVEMENT AND AWARDS */ 

	$('.achievements__head--awards').click(function() {
		$('.achievements__head--awards').addClass('achievements__head--active');
		$('.achievements__head--recent').removeClass('achievements__head--active');
		$('.all-achievements').addClass('display--none');
		$('.all-awards').removeClass('display--none');
	});

	$('.achievements__head--recent').click(function() {
		$('.achievements__head--recent').addClass('achievements__head--active');
		$('.achievements__head--awards').removeClass('achievements__head--active');
		$('.all-achievements').removeClass('display--none');
		$('.all-awards').addClass('display--none');
	});

});
