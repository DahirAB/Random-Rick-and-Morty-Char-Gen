const btn = document.querySelector('#generate');

function getUserData() {
	showSpinner();
	let randomCharIndex = Math.floor(Math.random() * 826) + 1;
	fetch(`https://rickandmortyapi.com/api/character/${randomCharIndex}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			return fetch(`${data.episode[0]}`)
				.then((res) => res.json())
				.then((epData) => {
					epUsedData = {
						id: epData.id,
						name: epData.name,
					};
					return epUsedData;
				})
				.then((epData) => {
					displayChar(data, epData);

					hideSpinner();
				});
		});
}

function displayChar(char, epData) {
	console.log(char.id);
	if (char.gender === 'Male') {
		document.body.style.backgroundColor = '#50C878';
	} else if (char.gender === 'Female') {
		document.body.style.backgroundColor = '#9B30FF';
	} else {
		document.body.style.backgroundColor = '#FFC107';
	}
	const charDiv = document.querySelector('#user');
	const status = char.status === 'unknown' ? 'Unknown' : char.status;
	const gender = char.gender === 'unknown' ? 'Unknown' : char.gender;
	charDiv.innerHTML = `<div class="flex justify-between">
					<div class="flex">
						<img
							class="w-48 h-48 rounded-full mr-8"
							src="${char.image}"
						/>
						<div class="space-y-3">
							<p class="text-xl">
								<span class="font-bold">Name: </span>${char.name}
							</p>
							<p class="text-xl">
								<span class="font-bold">Appearances: </span>${char.episode.length}
							</p>
							<p class="text-xl">
								<span class="font-bold">First Appearance: </span>Episode: ${epData.id} ,${epData.name} 
								
							</p>
							<p class="text-xl">
								<span class="font-bold">Species: </span>${char.species}
							</p>
							<p class="text-xl">
								<span class="font-bold">Location: </span> ${char.location.name}
							</p>
							<p class="text-xl"><span class="font-bold">Status: </span>${status}</p>
							<p class="text-xl"><span class="font-bold">Gender: </span>${gender}</p>
						</div>
					</div>
				</div>`;
}

function showSpinner() {
	document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
	document.querySelector('.spinner').style.display = 'none';
}

btn.addEventListener('click', getUserData);
