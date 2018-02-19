window.onload = init;

function init() {
	var channels = ['OgamingSC2', 'mythiXTrinity', 'HSdogdog', 'Bestmarmotte', 'DrErinMac', 'MoMaNuS', 'armatvhs', 'freecodecamp'];
	var urlStream = 'https://api.twitch.tv/kraken/streams/';
	var urlChannel = 'https://api.twitch.tv/kraken/channels/';
	var urlUser = 'https://api.twitch.tv/kraken/users/';
	
	var results = document.querySelector('.results');
	var byName = document.querySelector('.byName');
	var online = document.querySelector('.onlineOnly');
	var all = document.querySelector('.all');
	var list = document.querySelector('.liste');
	list.style.display ='none';

	//key to add to the header of the request. twitch api rule
	$.ajaxSetup({
	  headers : {
	    "Client-ID": "crddqy6gm2pewxu5nof620x0asw3sx"
	  }
	});

	//get channel datas
	channels.forEach(channel => {
		//create html for each
		var chan = document.createElement('div');
		var status = document.createElement('p');
		var div = document.createElement('div');
		var about = document.createElement('div');
		var chaine = document.createElement('div');
		results.appendChild(chan);
		chan.appendChild(status);
		chan.appendChild(div);
		div.appendChild(about);
		div.appendChild(chaine);

		//+++++++++++++add infos to html++++++++++++++++++++++++
		//from channel API
		$.getJSON(urlChannel + channel, function(data) {
			
			div.classList.add("channel");
			about.classList.add("about");
			chaine.classList.add("chaine");
			chan.setAttribute('id', `${data.display_name}`);

			about.innerHTML += `
				<img src="${data.logo}" class="logo">
				<h3>${data.display_name}</h3>
			`;
			chaine.innerHTML += `	
				<p>-${data.status}-</p>
				<a href="${data.url}"> Go to channel</a>
			`;
			list.innerHTML += `
				<li><a href="#${data.display_name}">${data.display_name}</a></li>
			`;
		});
		
		//from user API
		$.getJSON(urlUser + channel, function(doc) {
			if(doc.bio) {
				const bio = document.createElement('h4');
				// je ref div comme parent de chaine
				const parent = chaine.parentNode;
				//j'insère bio
				parent.insertBefore(bio, chaine);
				bio.innerHTML += `<em>${doc.bio}</em>`;
			}
		});

		//add online / offline status from stream API
		$.getJSON(urlStream + channel, function(response) {
			
			//if offline "stream":null if online get new datas
			if(response.stream === null) {
				chan.classList.add("offline");
				status.classList.add("status");
				status.innerHTML += "offline";
				status.style.color = "#222831";
			}else {
				chan.classList.add("online");
				status.classList.add("status");
				status.innerHTML += "online";
				status.style.color = "#f2f2f2";
				chaine.innerHTML += `
					<p class="overview">Game: ${response.stream.game}<br>
					${response.stream.viewers} viewers.
				`;
				chaine.querySelector('.overview').style.display ='none';
				}
		});
	});

	//online only channels display
	function onlineOnly() {
		const offlines = results.querySelectorAll('.offline');
		const onlines = results.querySelectorAll('.online');
		
		offlines.forEach(offline => {
			offline.style.display = "none";
		});

		onlines.forEach(online => {
			online.style.backgroundColor = "#f2f2f2";
			
			const channel = online.querySelector('.channel');
			channel.style.backgroundColor = 'transparent';

			const link = online.querySelector('a');
			link.style.color = "#f96d00";

			const chaine = online.querySelector('.chaine');
			const lien = chaine.querySelector('a');
			const parent = lien.parentNode;
			const overview = chaine.querySelector('.overview');
			parent.insertBefore(overview, lien);
			overview.style.display ='block';

		});
	}

	//back to all channels display
	function displayAll() {
		const offlines = results.querySelectorAll('.offline');
		const onlines = results.querySelectorAll('.online');
		
		offlines.forEach(offline => {
			if(offline.style.display === "none") {
				offline.style.display = '';
			}
		});

		onlines.forEach(online => {
			online.style = "initial";
			const channel = online.querySelector('.channel');
			channel.style = 'initial';
			const link = online.querySelector('a');
			link.style = "initial";
			const overview = online.querySelector('.overview');
			overview.style.display ='none';
		});
	}

	function displayList() {
		if(list.style.display === 'flex') {
			list.style.display = 'none';
		}else {
		list.style.display = 'flex';
		}
	}

	online.addEventListener('click', onlineOnly);
	all.addEventListener('click', displayAll);
	byName.addEventListener('click', displayList);
}