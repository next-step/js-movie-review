import MovieCard from './MovieCard';

export default class MovieList {
	movies;
	container;

	constructor(rootElement) {
		this.movies = [];
		this.container = document.createElement('ul');
		this.container.classList.add('item-list');

		rootElement.appendChild(this.container);
	}

	renderMovies() {
		const fragment = document.createDocumentFragment();

		this.movies.forEach(movie => {
			const movieCard = new MovieCard(movie);

			fragment.appendChild(movieCard.element);
		});

		this.container.appendChild(fragment);
	}

	updateMovies(newMovies) {
		this.movies = newMovies;
		this.container.innerHTML = '';

		this.renderMovies();
	}

	appendMovies(newMovies) {
		this.movies = [...this.movies, ...newMovies];

		this.renderMovies();
	}
}
