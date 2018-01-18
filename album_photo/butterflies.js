var imgArray = [];
//create butterflies album
for (var i = 0; i < 9; i++) {
	var object = {};
	object.albumId = "butterflies";
	object.id = i;
	object.thumbnailUrl = "thumbs/butterflies/"+ i +".jpg";
	object.url = "img/butterflies/"+ i +".jpg";
	object.title = "butterfly picture";

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
	var img = document.querySelectorAll("img");
	for (var i = 0; i < img.length; i++) {
		img[i].addEventListener("click", bigImg);
		function bigImg(event) {
			window.open(event.target.url);
		}
	}

}