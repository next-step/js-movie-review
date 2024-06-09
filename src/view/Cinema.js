import starFilled from '../assets//../assets/star_filled.png';
import { MovieCard } from '../components/MovieCard';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

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
        this.isConnect = true;
        const elements = movies.map((movie) =>
            MovieCard({
                title: movie.title,
                src: `${IMAGE_BASE_URL}${movie.poster_path}`,
                voteAvg: movie.vote_average,
                starSrc: starFilled
            })
        );
        appendFragments(this.movieListElement, elements);
        this.removeSkeletons();
    }

    isLoading() {
        this.isConnect = false;
        appendFragments(this.movieListElement, Array(20).map(MovieCard));
    }

    removeSkeletons() {
        const skeletons = this.movieListElement.querySelectorAll('.skeleton');
        skeletons.forEach((skeleton) => skeleton.remove());
    }

    resetMovies() {
        this.movieListElement.innerHTML = '';
    }
}
