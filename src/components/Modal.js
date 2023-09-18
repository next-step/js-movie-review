export const addModalCloseEvent = () => {
	document.querySelector('div.modal-close').addEventListener('click', () => {
		document.querySelector('div.modal').classList.remove('open');

		document.querySelector('img.modal-item-poster').remove();
	});
};

export const openModal = movie => {
	const modal = document.querySelector('div.modal');
	const title = document.querySelector('div.modal-title');
	const genre = document.querySelector('div.modal-item-genre');
	const description = document.querySelector('div.modal-item-detail');
	const vote = document.querySelector('div.modal-item-vote');

	const posterImage = document.createElement('img');
	posterImage.classList.add('modal-item-poster');
	posterImage.src = `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.posterPath}`;

	title.innerText = movie.title;
	genre.innerText = movie.genres.join(',');
	description.innerText = movie.description;
	vote.innerText = movie.vote;

	document.querySelector('div.modal-content-box').prepend(posterImage);

	modal.classList.add('open');
};
