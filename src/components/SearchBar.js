export const renderSearchBar = (rootElement, onSearch) => {
	const searchBox = document.createElement('form');
	searchBox.classList.add('search-box');

	const textInput = document.createElement('input');
	textInput.classList.add('search-input');
	textInput.setAttribute('type', 'text');
	textInput.setAttribute('placeholder', '검색');

	const searchButton = document.createElement('button');
	searchButton.classList.add('search-button');
	searchButton.innerText = '검색';

	searchBox.appendChild(textInput);
	searchBox.appendChild(searchButton);
	rootElement.appendChild(searchBox);

	searchBox.addEventListener('submit', async event => {
		event.preventDefault();

		searchButton.style.display = 'none';

		await onSearch(textInput.value);

		searchButton.style.display = 'inline-block';
	});
};
