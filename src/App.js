import MovieList from './components/MovieList';
import SearchBar from './components/SearchBar';
import MoreButton from './components/MoreButton';

import { HTMLFormat } from './lib/HTMLFormat';
import { getMoviePopular, getSearchMovie } from './api/TMDB_API';
import { getErrorMessageByStatusCode } from './lib/errorMessage';
import { addModalCloseEvent } from './components/Modal';

let state = {
	query: '',
	page: 1,
	totalPages: 1,
};

let rootView;
let searchBar;
let itemViewSection;
let movieList;
let moreButton;

async function runApp() {
	renderApp();
	await renderFirstPage();
	addModalCloseEvent();
}

function renderApp() {
	rootView = document.querySelector('#app');

	const layoutFragment = document.createDocumentFragment();

	const header = document.createElement('header');
	header.innerHTML = HTMLFormat.HEADER_LOGO;

	const main = document.createElement('main');
	main.innerHTML = HTMLFormat.MAIN_SECTION;

	layoutFragment.appendChild(header);
	layoutFragment.appendChild(main);

	rootView.appendChild(layoutFragment);

	itemViewSection = document.querySelector('section.item-view');

	searchBar = new SearchBar(header, handleSearch);

	movieList = new MovieList(itemViewSection);
	moreButton = new MoreButton(itemViewSection, handleMoreButtonClick);
}

async function renderFirstPage() {
	try {
		const movies = await fetchMovies();
		movieList.updateMovies(movies);
		updateMoreButtonDisplay();
	} catch (e) {
		const statusCode = e?.response?.status || e?.statusCode || 0;
		alert(getErrorMessageByStatusCode(statusCode));
	}
}

function updateMoreButtonDisplay() {
	if (state.page >= state.totalPages) {
		moreButton.hideButton();
	} else {
		moreButton.showButton();
	}
}

async function fetchMovies() {
	const { query, page } = state;

	const response = query ? await getSearchMovie(page, query) : await getMoviePopular(page);

	state.totalPages = response.totalPages;

	return response.movies;
}

async function handleSearch(query) {
	state.query = query;
	state.page = 1;
	state.totalPages = 1;

	try {
		const movies = await fetchMovies();

		movieList.updateMovies(movies);
		updateMoreButtonDisplay();
	} catch (e) {
		const statusCode = e?.response?.status || e?.statusCode || 0;
		alert(getErrorMessageByStatusCode(statusCode));
	}
}

async function handleMoreButtonClick() {
	state.page += 1;

	try {
		const movies = await fetchMovies();

		movieList.appendMovies(movies);
		updateMoreButtonDisplay();
	} catch (e) {
		const statusCode = e?.response?.status || e?.statusCode || 0;
		alert(getErrorMessageByStatusCode(statusCode));
	}
}

export { runApp };
