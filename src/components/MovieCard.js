import getMovieDetail from '../apis/getMovieDetail';
import MovieDetailModal from './modal/MovieDetailModal';
import { Modal } from './modal/container/Modal';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export function MovieCard({ title = '', src = '', voteAvg = '', starSrc = '', id = 0, loading = false }) {
    if (loading) {
        return SkeletonMovieCard();
    }

    const liElement = document.createElement('li');
    const newVoteAvg = loading ? '' : Number(voteAvg).toFixed(2);
    const imageSrc = loading ? '' : src;
    const imageAlt = title;

    liElement.innerHTML = `
        <a href="#">
            <div class="item-card">
                <img class="item-thumbnail" loading="lazy" alt="${imageAlt}" src="${imageSrc}">
                <p class="item-title">${title}</p>
                <p class="item-score">
                    <span>${newVoteAvg}</span>
                    <img src="${starSrc}" alt="별점" loading="lazy">
                </p>
            </div>
        </a>
    `;

    liElement.addEventListener('click', async () => {
        const res = await getMovieDetail(id);

        console.log('res', res);
        new Modal(
            document.querySelector('body'),
            MovieDetailModal({
                title: res.title,
                src: `${IMAGE_BASE_URL}${res.poster_path}`,
                genres: res.genres,
                overview: res.overview,
                vote_average: res.vote_average
            })
        );
    });

    return liElement;
}
