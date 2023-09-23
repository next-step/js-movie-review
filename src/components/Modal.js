import { getErrorMessageByStatusCode } from '../lib/errorMessage';
import { getMovieDetails } from '../api/TMDB_API';

export const closeModal = () => {
	const modal = document.querySelector('div.modal');

	modal.classList.remove('open');

	const posterImage = document.querySelector('img.modal-item-poster');
	const title = document.querySelector('div.modal-title');
	const genre = document.querySelector('div.modal-item-genre');
	const description = document.querySelector('div.modal-item-detail');
	const vote = document.querySelector('div.modal-item-vote');

	posterImage.remove();
	title.innerText = '';
	genre.innerText = '';
	description.innerText = '';
	vote.innerText = '';
};

export const addModalCloseEvent = () => {
	document.querySelector('div.modal-close').addEventListener('click', closeModal);

	document.body.addEventListener('keydown', event => {
		const modal = document.querySelector('div.modal');

		if (modal.classList.contains('open') && event.key === 'Escape') {
			closeModal();
		}
	});
};

export const openModal = async id => {
	try {
		const movie = await getMovieDetails(id);

		const modal = document.querySelector('div.modal');
		modal.classList.add('open');

		const title = document.querySelector('div.modal-title');
		const genre = document.querySelector('div.modal-item-genre');
		const description = document.querySelector('div.modal-item-detail');
		const vote = document.querySelector('div.modal-item-vote');

		const posterImage = document.createElement('img');
		posterImage.classList.add('modal-item-poster');
		posterImage.src = `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.posterPath}`;

		title.innerText = movie.title;
		genre.innerText = movie.genres.join(', ');
		description.innerText = movie.description;
		vote.innerText = movie.vote.toFixed(1);

		document.querySelector('div.modal-content-box').prepend(posterImage);
	} catch (e) {
		const statusCode = e?.response?.status || e?.statusCode || 0;

		alert(getErrorMessageByStatusCode(statusCode));
	}
};
