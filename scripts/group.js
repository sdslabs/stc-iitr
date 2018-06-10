$(document).ready(function() {

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

	/* GROUP CYCLE HANDLING */

	var url = document.location.pathname; 
	var path = url.split('/')[2];

	// array of all group tags
	var groups = [
		'sdslabs', 
		'designstudio',
		'aries',
		'mars'
	];

	function matchGroup(path){
		var found = 0;
		for(index in groups){
			if (groups[index] == path){
				found =	1; 
				tempURL = '/groups/'+ groups[index]; 
				if( tempURL != document.location.pathname){ 
					window.history.pushState(null,null,groups[index]);
				}
				updateGroup(path);
				break;
			}
		}

		if(found == 0){
			var randomIndex = Math.floor(Math.random()	* groups.length);
			matchGroup(groups[randomIndex]);
		}
	}

	function updateGroup(path){
		groups.forEach(function(group,index){
			if(group != path){
				var groupContainer = document.getElementById(group);
				groupContainer.classList.add('invisible')
			}		
		});
		var currentGroup = document.getElementById(path);
		currentGroup.classList.remove('invisible');
		currentGroup.classList.add('visible');
	}

	// next and previous handling

	$('.previous').click(function(e){
		e.preventDefault();

		var currentPath = document.location.pathname.split('/')[2];
		for(index in groups){
			if(groups[index] == currentPath){
				var nextIndex = (parseInt(index)+1)%groups.length;
				// console.log(index);
				matchGroup(groups[nextIndex]);
				break;
			}
		}
	});

	$('.next').click(function(e){
		e.preventDefault();

		var currentPath = document.location.pathname.split('/')[2];
		for(index in groups){
			if(groups[index] == currentPath){
				var tempIndex = parseInt(index)-1;
				var nextIndex = (tempIndex!=-1)?tempIndex:groups.length-1;
				// console.log(index);
				matchGroup(groups[nextIndex]);
				break;
			}
		}
	});

	// handling changes in states 

	window.onpopstate = function(){
		matchGroup(document.location.pathname.split('/')[2]);
	}

	matchGroup(path);

});
