import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MoreButton from './components/MoreButton';

import { HTMLFormat } from './lib/HTMLFormat';
import { getMoviePopular, getSearchMovie } from './api/getTMDBApis';

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

		this.searchBar = new SearchBar(header, this.handleSearch.bind(this));

		this.movieList = new MovieList(this.itemViewSection);
		this.moreButton = new MoreButton(this.itemViewSection, this.handleMoreButtonClick.bind(this));

		this.fetchMovies(true);
	}

	async fetchMovies(isUpdate) {
		const { query, page } = this.state;

		const response = query ? await getSearchMovie(page, query) : await getMoviePopular(page);

		const newMovies = response.results.map(result => ({
			title: result.title,
			vote: result['vote_average'],
			posterPath: result['poster_path'],
		}));

		this.state.totalPages = response['total_pages'];

		if (this.state.page >= this.state.totalPages) {
			this.moreButton.hideButton();
		} else {
			this.moreButton.showButton();
		}

		if (isUpdate) {
			this.movieList.updateMovies(newMovies);
		} else {
			this.movieList.appendMovies(newMovies);
		}
	}

	async handleSearch(query) {
		this.state.query = query;
		this.state.page = 1;
		this.state.totalPages = 1;

		await this.fetchMovies(true);
	}

	async handleMoreButtonClick() {
		this.state.page += 1;
		await this.fetchMovies(false);
	}
}
