var imgArray = [];

//create insects album
for (var i = 0; i < 9; i++) {
	var object = {};
	object.albumId = "insects";
	object.id = i;
	object.thumbnailUrl = "thumbs/insects/"+ i +".jpg";
	object.url = "img/insects/"+ i +".jpg";
	object.title = "insects pictures";

	imgArray.push(object);
}

function init() {
	var album = document.querySelector(".album");
	//create images in .album
	imgArray.forEach(function(i) {
		var img = document.createElement("img");
		img.src = i.thumbnailUrl;
		img.url = i.url;
		img.alt = i.title;

		album.append(img);
	});
	//on click open bigger img in another window
	//used a forEach, don't if better than for loop or even???
	var Img = document.querySelectorAll("img");
	Img.forEach(function bigImg (image) {
		image.addEventListener("click", function pop(event) {
			window.open(event.target.url);
		});
	});
}