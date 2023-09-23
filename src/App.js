import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MoreButton from './components/MoreButton';

import { HTMLFormat } from './lib/HTMLFormat';
import { getMoviePopular, getSearchMovie } from './api/TMDB_API';
import { getErrorMessageByStatusCode } from './lib/errorMessage';
import { addModalCloseEvent } from './components/Modal';

export default class App {
	#rootElement;
	searchBar;
	itemViewSection;
	movieList;
	moreButton;
	state = {
		query: '',
		page: 1,
		totalPages: 1,
	};

	constructor() {
		this.renderApp();

		this.renderFirstPage();
	}

	renderApp() {
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

		addModalCloseEvent();

		this.fetchMovies(true);
	}

	async renderFirstPage() {
		const movies = await this.fetchMovies();

		this.movieList.updateMovies(movies);

		this.updateMoreButtonDisplay();
	}

	updateMoreButtonDisplay() {
		if (this.state.page >= this.state.totalPages) {
			this.moreButton.hideButton();
		} else {
			this.moreButton.showButton();
		}
	}

	async fetchMovies() {
		const { query, page } = this.state;

		const response = query ? await getSearchMovie(page, query) : await getMoviePopular(page);

		this.state.totalPages = response.totalPages;

		return response.movies;
	}

	async handleSearch(query) {
		this.state.query = query;
		this.state.page = 1;
		this.state.totalPages = 1;

		try {
			const movies = await this.fetchMovies();

			this.movieList.updateMovies(movies);

			this.updateMoreButtonDisplay();
		} catch (e) {
			const statusCode = e?.response?.status || e?.statusCode || 0;

			alert(getErrorMessageByStatusCode(statusCode));
		}
	}

	async handleMoreButtonClick() {
		this.state.page += 1;

		try {
			const movies = await this.fetchMovies();

			this.movieList.appendMovies(movies);

			this.updateMoreButtonDisplay();
		} catch (e) {
			const statusCode = e?.response?.status || e?.statusCode || 0;

			alert(getErrorMessageByStatusCode(statusCode));
		}
	}
}
