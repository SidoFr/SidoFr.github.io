window.onload = init;

function init() {
	var searchForm = document.querySelector('.form form');
	var section = document.querySelector('.results');
	const baseUrl = 'http://api.nytimes.com/svc/movies/v2/reviews/search.json';
	const key = 'c4c3fd5ca9af4c87bafd925520f34dee';
	var submitBtn = searchForm.querySelector('.submit');
	var openDate = searchForm.querySelector('.opening-date');
	var search = searchForm.querySelector('.search');
	
	//request fn
	function request(evt) {
		evt.preventDefault();

		//create url of user search
		//?api-key= ?query= ?opening-date=YYYY-MM-DD or YYYY-MM-DD;YYYY-MM-DD
		url = `${baseUrl}?api-key=${key}&query=${search.value}`;
		if(openDate.value !== '') {
			url += `&opening-date=${openDate.value}`;
		}

		//fetch
		fetch(url).then(function(response) {
			response.json().then(function(json) {
				displayResults(json);
			});
		});
	}

	searchForm.addEventListener('submit', request);
	submitBtn.addEventListener('submit', request);

	//how to display result
	function displayResults(json) {
		var data = json.results;
		let index = 0;
		console.table(data);
		//make sure section is empty. while loop convention
		while(section.firstChild) {
			section.removeChild(section.firstChild);
		} 

		//if zero article
		if(data.length === 0) {
			section.innerHTML = `<p>No article found</p>`;
			
		}
		else {
			data.forEach(obj => {
				var datas = json.results[index];
				var title = `${datas.display_title}<br> "${datas.headline}"`;
				var author = datas.byline;
				var dates = `Opening date: ${datas.opening_date}<br> Review publication date: ${datas.publication_date}`;
				var summary = datas.summary_short;
				var link = datas.link;
				var lien = link.url;
				var line = link.suggested_link_text;

				section.innerHTML += `
				<article>
					<h2>${title}</h2>
					<h4>by ${author}</h4>
					<p>${dates}</p>
					<p>${summary}</p>
					<p>${line} <a href="${lien}">here</a>
				</article>	
				`;

				index++;
			});
		}	
	}
}

