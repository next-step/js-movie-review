import * as events from 'events';

export default class SearchBar {
	constructor(onSearch) {
		const header = document.querySelector('header');

		const searchBox = document.createElement('form');
		searchBox.classList.add('search-box');

		const textInput = document.createElement('input');
		textInput.setAttribute('type', 'text');
		textInput.setAttribute('placeholder', '검색');

		const searchButton = document.createElement('button');
		searchButton.classList.add('search-button');
		searchButton.innerText = '검색';

		searchBox.appendChild(textInput);
		searchBox.appendChild(searchButton);
		header.appendChild(searchBox);

		let timeout;

		textInput.addEventListener('input', event => {
			clearTimeout(timeout);

			timeout = setTimeout(async () => {
				searchButton.style.display = 'none';

				await onSearch(event.target.value);

				searchButton.style.display = 'inline-block';
			}, 300);
		});

		searchBox.addEventListener('submit', async event => {
			event.preventDefault();

			searchButton.style.display = 'none';

			await onSearch(textInput.value);

			searchButton.style.display = 'inline-block';
		});
	}
}
