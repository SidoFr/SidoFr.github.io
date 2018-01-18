
var imgArray = [];

//create menu album
for(var i= 0; i < 3; i++) {
	var object = {};
	object.albumId = "home";
	object.id = i;
	object.url = "img/home/"+ i +".jpg";
	object.alt = "wildlife picture ";
	
	imgArray.push(object);
}

function init() {
	var menu = document.querySelector(".menu");
	//add images to .menu
	imgArray.forEach(function(i) {
		var img = document.createElement("img");
		img.id = i.id;
		img.src = i.url;
		img.alt = i.alt;
		menu.append(img);
	});
	//on click go to the dedicated album
	var img = document.querySelectorAll(".menu img");
	
	img.forEach(onclick = function goToAlbum(event) {
		if(event.target == img[0]) {
			window.location.href = "butterflies.html";
		}
		if(event.target == img[1]) {
			window.location.href = "insects.html";
		}
		if(event.target == img[2]) {
			window.location.href = "birds.html";
		}

	});
}



