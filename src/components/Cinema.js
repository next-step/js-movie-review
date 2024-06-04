import starFilled from '../assets//../assets/star_filled.png';
import { IMAGE_BASE_URL } from '../constants/api';
import { MovieCard } from './MovieCard';

export class Cinema {
    constructor() {
        this.page = 1;
        this.movieListElement = document.querySelector('.item-list');
    }

    createMovies(movies) {
        const fragment = document.createDocumentFragment();

        movies.forEach((movie) => {
            const movieCard = MovieCard({
                title: movie.title,
                src: `${IMAGE_BASE_URL}${movie.poster_path}`,
                voteAvg: movie.vote_average,
                starSrc: starFilled
            });

            fragment.appendChild(movieCard);
        });
        this.movieListElement.innerHTML = '';
        this.movieListElement.appendChild(fragment);
    }

    showSekeleton(count) {
        const fragment = document.createDocumentFragment();
        [...Array(count)].forEach(() => {
            const movieCard = MovieCard({
                title: '',
                src: '',
                voteAvg: '',
                starSrc: '',
                loading: true
            });
            fragment.appendChild(movieCard);
        });

        this.movieListElement.appendChild(fragment);
    }
}
