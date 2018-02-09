window.onload = init;

function init() {

	//**************************************************************************
	//MAP
	var labels = '123';
	var labelIndex = 0;
	function initMap() {
		//"draw" map
		const map = new google.maps.Map(document.querySelector('.map'), {
			center: {lat: 48.58, lng: 7.75},
			zoom: 12
		});

		//create markers for food trucks locations
		const truckLoc = function(lat, lng){
			this.lat = lat;
			this.lng = lng;
		}
		const truck1 = new truckLoc(48.583889, 7.734422);
		const truck2 = new truckLoc(48.573895, 7.755214);
		const truck3 = new truckLoc(48.583478, 7.761694);
		//call fn to put them on map
		addMarkers(truck1, map);
		addMarkers(truck2, map);
		addMarkers(truck3, map);

		//*************************
		//geolocation
		const geoButton = document.querySelector('.geoloc');
		
		function locateUser() {

			function showPos(pos) {
				const position = {
					lat: pos.coords.latitude,
					lng: pos.coords.longitude
				}
				addUser(position, map);
			}
			//check if geolocation supported
			if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPos);
			}else {
				document.querySelector('.err-msg').textContent = "Erreur: votre navigateur ne supporte pas la géolocalisation.";
			}
		}

		geoButton.addEventListener('click', locateUser);
		//************************

	}	
	//call fn to draw map
	initMap();

	//add trucks markers on map
	function addMarkers(location, map) {
		const marker = new google.maps.Marker({
			position: location,
			label: labels[labelIndex++ % labels.length],
			map: map
		});
	}
	//add user marker
	function addUser(location, map) {
		const marqueur = new google.maps.Marker({
			position: location,
			label: "VOUS",
			map: map
		});
	}
	
	
	//**************************************************************************
	//commande en ligne
	const list = document.querySelector('.list');
	const foodForm = document.querySelector('.input');
	const tacosInput = foodForm.querySelector('input[name=plates]');
	const addButton = foodForm.querySelector('.add');
	const checkButton = document.querySelector('.check-all');
	const clearButton = document.querySelector('.clear');
	// array to store user's food input
	const storedItems = JSON.parse(localStorage.getItem('storedItems')) || [];
	
	//add items to items list & local storage
	function addItems(evt) {
		//prevent refresh after submit
		evt.preventDefault();

		const item = {
			name : tacosInput.value,
			checked : false
		};

		storedItems.push(item);

		//declare fn to write on list
		fillList(storedItems, list);

		localStorage.setItem('storedItems', JSON.stringify(storedItems));

		//erase used input. applied on form elt
		foodForm.reset();
		
	}

	//fill the list on html
	function fillList(ingredients, liste) {
		if(storedItems.length === 0){
			liste.innerHTML = '<li>en attente...</li>';
		}else {
			liste.innerHTML = ingredients.map((ingredient, i)=> {
				return `
				<li><input type="checkbox" data-index=${i} ${ingredient.checked ? 'checked' : ''}> ${ingredient.name}</li>
				`;
			}).join('');
		}
	}

	//track check evt and store them
	function actualise(evt) {
		if(!evt.target.matches('input')) return;
		const checkbox = evt.target;
		const index = checkbox.dataset.index;
		//reverse of current
		storedItems[index].checked = !storedItems[index].checked;
		
		localStorage.setItem('storedItems', JSON.stringify(storedItems));
		fillList(storedItems, list);
		//note, I must add the checked style to the checkbox if not remains empty even if checked.
		//I do it with the boolean variable if true 'checked' if not 'empty'
	}

	function checkAll() {
		storedItems.forEach(item => item.checked = true);

		localStorage.setItem('storedItems', JSON.stringify(storedItems));
		fillList(storedItems, list);

	} 
	
	function clear() {
		storedItems.length = 0;
		localStorage.clear();
		fillList(storedItems, list);
	}


	//submit better than click, prevents from sending empty input
	addButton.addEventListener('submit', addItems);
	//listener sr form pr submit ac la touche entrée
	foodForm.addEventListener('submit', addItems);
	//event delegation
	list.addEventListener('click', actualise);
	checkButton.addEventListener('click', checkAll);
	clearButton.addEventListener('click', clear);

	//when refresh
	fillList(storedItems, list);

	
}