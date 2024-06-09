import starFilled from '../assets//../assets/star_filled.png';
import { IMAGE_BASE_URL } from '../constants/api';
import { MovieCard } from '../components/MovieCard';

export class Cinema {
    isConnect;
    page;
    movieListElement;

    constructor() {
        this.isConnect = false;
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
        this.isConnect = true;

        this.removeSkeletons();

        this.movieListElement.appendChild(fragment);
    }

    showSekeleton(count) {
        this.isConnect = false;
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

        setTimeout(() => {
            if (this.isConnect === false) {
                this.removeSkeletons();
            }
        }, 5000);
    }

    removeSkeletons() {
        const skeletons = this.movieListElement.querySelectorAll('.skeleton');
        skeletons.forEach((skeleton) => skeleton.remove());
    }

    resetMovies() {
        this.movieListElement.innerHTML = '';
    }
}
