window.onload = init;

function init() {
	const form = document.querySelector('.form form');
	const randBtn = document.querySelector('.random');
	const results = document.querySelector('.results');
	const baseUrl = 'https://en.wikipedia.org/w/api.php';
	//get result
	function fetchResults(random, search) {
		//url parameters
		//if user search
		const objet = {
			action: 'opensearch',
			search: search,
			format: 'json',
			namespace: 0,
			origin: '*',
			limit: 12
		};
		//if random request
		const objetRandom = {
			action: 'query',
			generator: 'random',
			format: 'json',
			origin: '*',
			titles: 'Main+Page',
			prop: 'extracts',
			exlimit: 'max',
			grnnamespace: 0,
			exchars: 500 // > 0
		};
		if(random === true) {
			parameters = objetRandom;
		}else {
				type: 'GET',
			parameters = objet;
		}
		//request using jquery
			$.ajax({
				url: baseUrl,
				dataType: 'json',
				data: parameters,
				success: function(json) {
					if(random === true) {
						displayRandom(json);
					} else {
						displayWiki(json);
					}
				},
				error: function error() {
					alert("error");
				}
			});
	}
	//display results
	//if user search
	function displayWiki(json) {
		//console.log(json)
		const titles = json[1];
		const briefs = json[2];
		const links = json[3];
		//write title
		const h1 = document.createElement('h1');
		h1.innerHTML += json[0];
		h1.classList.add('titre');
		results.appendChild(h1);
		//build a div per result
		for( let i = 0, l = titles.length; i < l; i++) {
			const result = document.createElement('div');
			result.innerHTML += `<h3>${titles[i]}</h3>
								<p>${briefs[i]}</p><br>
								<a href="${links[i]}" target="blank">Read More</a>`;
			result.classList.add('append');
			results.appendChild(result);	
		}
		//clear input
		const form = document.querySelector('form');
		form.reset();
	}
	//if random
	function displayRandom(json) {
		//console.log(json);
		const pages = json.query.pages;
		//create a div
		const result = document.createElement('div');
		//use a for in to get to pages.?.ppty because pages.? = an id
		for(var page in pages) {
			//build the div
			const link = `https://en.wikipedia.org/wiki/${pages[page].title}`;
			result.innerHTML += `<h3>${pages[page].title}</h3>
								<p>${pages[page].extract}</p><br>
								<a href="${link}" target="blank">Read More</a>`;
			result.classList.add('append');
			results.appendChild(result);	
		}
	}
	//event listeners
	form.addEventListener('submit', (evt)=> {
		if(results.children.length > 0) {
			//clear results
			results.innerHTML = '';
			//
			evt.preventDefault();
			//get user input and call fn
			const userSearch = evt.target.querySelector('[name=keyword').value;
			fetchResults(false, userSearch); //false: random = false
		}else{
			evt.preventDefault();
			const userSearch = evt.target.querySelector('[name=keyword').value;
			fetchResults(false, userSearch);
		}
	});

	randBtn.addEventListener('click', ()=> {
		if(results.children.length > 0) {
			results.innerHTML = '';
			fetchResults(true);
		}else {
			fetchResults(true);
		}	
	});
}