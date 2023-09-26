import { HTMLFormat } from '../lib/HTMLFormat';

export default class MovieCard {
	info;
	#element;

	constructor(movie) {
		this.info = movie;
		this.#element = document.createElement('li');

		this.#element.innerHTML = HTMLFormat.MOVIE_CARD(
			this.info.title,
			this.info.vote,
			this.info.posterPath,
			this.info.id,
		);
	}

	get element() {
		return this.#element;
	}
}
