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
	var council_groups = JSON.parse($('#group-script').attr('council-group-data'))
	var departmental_groups = JSON.parse($('#group-script').attr('departmental-group-data'))

	// setting the groups lengths in individual places

	$('.group-count--council').html(council_groups.length)
	$('.group-count--departmental').html(departmental_groups.length)

	function matchGroup(path, groups){
		var found = 0;
		for(index in groups){
			if (groups[index] == path){
				found =	1; 
				tempURL = '/groups/'+ groups[index]; 
				if( tempURL != document.location.pathname){ 
					window.history.pushState(null,null,groups[index]);
				}
				updateGroup(path, groups);
				break;
			}
		}

		if(found == 0){
			var randomIndex = Math.floor(Math.random()	* groups.length);
			matchGroup(groups[randomIndex], groups);
		}
	}

	function updateGroup(path, groups){
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

	$('.next').click(function(e){
		e.preventDefault();

		var currentPath = document.location.pathname.split('/')[2];
		var groups = council_groups.includes(currentPath) ? council_groups : departmental_groups;

		for(index in groups){
			if(groups[index] == currentPath){
				var nextIndex = (parseInt(index)+1)%groups.length;
				matchGroup(groups[nextIndex], groups);
				break;
			}
		}
	});

	$('.previous').click(function(e){
		e.preventDefault();

		var currentPath = document.location.pathname.split('/')[2];
		var groups = council_groups.includes(currentPath) ? council_groups : departmental_groups;

		for(index in groups){
			if(groups[index] == currentPath){
				var tempIndex = parseInt(index)-1;
				var nextIndex = (tempIndex!=-1)?tempIndex:groups.length-1;
				matchGroup(groups[nextIndex], groups);
				break;
			}
		}
	});

	var params = (new URL(document.location)).searchParams;
	var type = params.get('type');

	// handling changes in states 
	window.onpopstate = function(){
		// reload on pop state
		window.location.href = document.location.href;
	}

	if (council_groups.includes(path))
		matchGroup(path, council_groups)
	else
		matchGroup(path, departmental_groups)
});
