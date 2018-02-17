window.onload = init;

function init() {
	var channels = ['OgamingSC2', 'mythiXTrinity', 'HSdogdog', 'Bestmarmotte', 'DrErinMac', 'MoMaNuS', 'armatvhs'];
	var baseUrl = 'https://api.twitch.tv/helix/users';
	//key to add to the header of the request. twitch api rule
	var key = '4pl7r1p6f9prvvfxs7tpmeu99n80to';
	var datas = [];
	//get datas for each channel
	channels.forEach(channel => {
		//create url
		var url = `${baseUrl}?id=${channel}`;
		console.log(url);
		fetch(url, {
		method: 'GET',
		header: new Headers({ //header constructor
			'Client-ID': key
		})
	})
	.then((response)=> {
		response.json();
	})
	.then((json)=> {
		displayResults(json);
	});
	function displayResults(json) {
		console.log(json);
		datas.push(json);
		console.log(datas);
	}
	});
	
}