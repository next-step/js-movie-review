import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MoreButton from './components/MoreButton';

import { HTMLFormat } from './lib/HTMLFormat';

export default class App {
	#rootElement;
	searchBar;
	itemViewSection;
	movieList;
	moreButton;
	state;

	constructor() {
		this.state = {
			query: '',
			page: 1,
			totalPages: 1,
		};

		this.#rootElement = document.querySelector('#app');

		const layoutFragment = document.createDocumentFragment();

		const header = document.createElement('header');
		header.innerHTML = HTMLFormat.HEADER_LOGO;

		const main = document.createElement('main');
		main.innerHTML = HTMLFormat.MAIN_SECTION;

		layoutFragment.appendChild(header);
		layoutFragment.appendChild(main);

		this.#rootElement.appendChild(layoutFragment);

		this.itemViewSection = document.querySelector('section.item-view');

		this.searchBar = new SearchBar();

		this.movieList = new MovieList(this.itemViewSection);
		this.moreButton = new MoreButton(this.itemViewSection);
	}
}
