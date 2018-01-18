var imgArray = [];
//create birds album
for (var i = 0; i < 9; i++) {
	var object = {};
	object.albumId = "birds";
	object.id = i;
	object.thumbnailUrl = "thumbs/birds/"+ i +".jpg";
	object.url = "img/birds/"+ i +".jpg";
	object.title = "birds picture";

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
	//on click open a bigger img in another window
	//used a for loop, don't know is forEach better or even??
	var img = document.querySelectorAll("img");
	for (var i = 0; i < img.length; i++) {
		img[i].addEventListener("click", bigImg);
		function bigImg(event) {
			window.open(event.target.url);
		}
	}
}
