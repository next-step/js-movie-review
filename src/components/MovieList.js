import MovieCard from './MovieCard';
import { openModal } from './Modal';

export default class MovieList {
	#movies = [];
	#container;

	constructor(rootElement) {
		this.#container = document.createElement('ul');
		this.#container.classList.add('item-list');

		rootElement.appendChild(this.#container);

		this.#container.addEventListener('click', event => {
			const clickedMovie = this.#movies.find(movie => movie.id.toString() === event.target.dataset.index);

			if (clickedMovie) {
				openModal(clickedMovie);
			}
		});
	}

	renderMovies() {
		this.#container.innerHTML = '';

		const fragment = document.createDocumentFragment();

		this.#movies.forEach(movie => {
			const movieCard = new MovieCard(movie);

			fragment.appendChild(movieCard.element);
		});

		this.#container.appendChild(fragment);
	}

	updateMovies(newMovies = []) {
		this.#movies = newMovies;

		this.renderMovies();
	}

	appendMovies(newMovies = []) {
		this.#movies = [...this.#movies, ...newMovies];

		this.renderMovies();
	}
}
