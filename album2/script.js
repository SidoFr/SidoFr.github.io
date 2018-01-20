//create the 3 albums
var butterfly = [];
for (var i = 0; i < 9; i++) {
	object ={};
	object.albumId = "butterflies";
	object.id = i;
	object.url = "butterflies_mid/"+ i +".jpg";
	object.thumb = "butterflies_sq/"+ i +".jpg";
	
	butterfly.push(object);
}
var insect = []
for (var i = 0; i < 9; i++) {
	object ={};
	object.albumId = "insects";
	object.id = i;
	object.url = "insects_mid/"+ i +".jpg";
	object.thumb = "insects_sq/"+ i +".jpg";
	
	insect.push(object);
}
var bird = [];
for (var i = 0; i < 9; i++) {
	object ={};
	object.albumId = "birds";
	object.id = i;
	object.url = "birds_mid/"+ i +".jpg";
	object.thumb = "birds_sq"+ i +".jpg";

	bird.push(object);
}

window.onload = init;

function init () {
	//butterflies album
	var imgOne = document.querySelectorAll("#one img");
	for (var i = 0; i < imgOne.length; i++) {
		imgOne[i].url = butterfly[i].url;
	}
	imgOne.forEach(enlarge);

	//insects album
	var imgTwo = document.querySelectorAll("#two img");
	for (var j = 0; j < imgTwo.length; j++) {
		imgTwo[j].url = insect[j].url;
	}
	imgTwo.forEach(enlarge);

	//birds album
	var imgThree =document.querySelectorAll("#three img");
	for (var k = 0; k < imgThree.length; k++) {
		imgThree[k].url = bird[k].url;
	}
	imgThree.forEach(enlarge);

	//enlarge clicked photo in another window
	function enlarge(i) {
		i.addEventListener("click", pop);
		function pop(event) {
			window.open(event.target.url);
		}
	}
}