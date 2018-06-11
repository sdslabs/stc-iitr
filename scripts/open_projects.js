$(document).ready(function() {
	var url = document.location.pathname; 
	var path = url.split('/')[2];

	// array of all open_project tags
	var open_projects = JSON.parse($('#open-project-script').attr('open-project-data'));

	function matchProject(path){
		var found = 0;
		for(index in open_projects){
			if (open_projects[index] == path){
				found =	1; 
				tempURL = '/open_projects/'+ open_projects[index]; 
				if( tempURL != document.location.pathname){ 
					window.history.pushState(null,null,open_projects[index]);
				}
				updateProject(path);
				break;
			}
		}

		if(found == 0){
			var randomIndex = Math.floor(Math.random()	* open_projects.length);
			matchProject(open_projects[randomIndex]);
		}
	}

	function updateProject(path){
		open_projects.forEach(function(open_project,index){
			if(open_project != path){
				var openProjectContainer = document.getElementById(open_project);
				openProjectContainer.classList.add('invisible')
			}		
		});
		var currentProject = document.getElementById(path);
		currentProject.classList.remove('invisible');
		currentProject.classList.add('visible');
	}

	// next and previous handling

	$('.next').click(function(e){
		e.preventDefault();

		var currentPath = document.location.pathname.split('/')[2];
		for(index in open_projects){
			if(open_projects[index] == currentPath){
				var nextIndex = (parseInt(index)+1)%open_projects.length;
				// console.log(index);
				matchProject(open_projects[nextIndex]);
				break;
			}
		}
	});

	$('.previous').click(function(e){
		e.preventDefault();

		var currentPath = document.location.pathname.split('/')[2];
		for(index in open_projects){
			if(open_projects[index] == currentPath){
				var tempIndex = parseInt(index)-1;
				var nextIndex = (tempIndex!=-1)?tempIndex:open_projects.length-1;
				// console.log(index);
				matchProject(open_projects[nextIndex]);
				break;
			}
		}
	});

	// handling changes in states 

	window.onpopstate = function(){
		matchProject(document.location.pathname.split('/')[2]);
	}

	matchProject(path);
});