const btn = document.querySelector('#generate');

function getUserData() {
	showSpinner();
	let randomCharIndex = Math.floor(Math.random() * 826) + 1;
	fetch(`https://rickandmortyapi.com/api/character/${randomCharIndex}`)
		.then((res) => {
			return res.json();
		})
		.then((data) => {
			displayChar(data);
			hideSpinner();
		});
}

function displayChar(char) {
	console.log(char.id);
	if (char.gender === 'Male') {
		document.body.style.backgroundColor = '#50C878';
	} else if (char.gender === 'Female') {
		document.body.style.backgroundColor = '#9B30FF';
	} else {
		document.body.style.backgroundColor = '#FFC107';
	}
	const charDiv = document.querySelector('#user');

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
								<span class="font-bold">Species: </span>${char.species}
							</p>
							<p class="text-xl">
								<span class="font-bold">Location: </span> ${char.location.name}
							</p>
							<p class="text-xl"><span class="font-bold">Status: </span>${char.status}</p>
							<p class="text-xl"><span class="font-bold">Gender: </span>${char.gender}</p>
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
