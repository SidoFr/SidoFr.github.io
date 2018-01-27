window.onload = init;

function init() {
	//json file: array of objects with city, population, state, and other as ppties
	const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
	
	
	const cities = []; //si ma var est une let je peux ensuite écrire data =>cities = data, 
	//si je vx q ça soit une const il faudra assigner data à cities autrement

	//fetch the data so we can use it
	//we use fetch() instead of getJSON. fetch returns a promise.console.log to see more
	//const promise  = fetch(endpoint);
	//console.log(promise);
	//then method returns a blob: raw data which has to be converted into json
	//we do it with json method
	fetch(endpoint)
		.then(blob => blob.json())
		//push with spread to push each elt one after the other instead of the whole array
		.then(data => cities.push(...data))

		//filter the array to match with the word the user types
	function findMatches(wordToMatch, cities) {
		return cities.filter(place => {
			//figure out if city or state matches what was searched
			//it has to match wordToMatch which is a variable
			//create regExp corresponding to it
			const regex = new RegExp(wordToMatch, 'gi');
			return place.city.match(regex) || place.state.match(regex);

		});
	}
	//add a function to write numbers with commas
	function nbsWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}

	function displayMatches() {
		//console.log(this.value);
		const matchArray = findMatches(this.value, cities); //now have an array with objects with all ppties
		//now we can create html with datas we want
		//here we want to give city, state and pop 
		const html = matchArray.map(place=> {
			//highlight letters searched in the result
			//create a regExp = letters searched
			const regex = new RegExp(this.value, 'gi');
			//then replace: cityName = city name with the matching letter replaced by a span
			//changes with css
			const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
			const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
			return `
				<li>
				<span class="name">${cityName}, ${stateName}</span>
				<span class="population">${nbsWithCommas(place.population)}</span>
				</li>
			`;//pop is passed by function nbsWithCommas
		}).join('');//return a string and not an array
		suggestions.innerHTML = html;
	}	

	const searchInput = document.querySelector(".search");
	const suggestions = document.querySelector(".suggestions");
	searchInput.addEventListener('change', displayMatches);
	//pr chq lettre tapée
	searchInput.addEventListener('keyup', displayMatches);
}


