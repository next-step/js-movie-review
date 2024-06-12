import { MovieCard } from '../components/MovieCard';
import starFilled from '../assets/star_filled.png';
import appendFragments from '../utils/appendFragments';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function renderMovies({ movieList, resetHTML }) {
    const movieListElement = document.querySelector('.item-list');
    if (resetHTML) {
        movieListElement.innerHTML = '';
    }

    const elements = movieList.map((movie) =>
        MovieCard({
            title: movie.title,
            src: `${IMAGE_BASE_URL}${movie.poster_path}`,
            voteAvg: movie.vote_average,
            starSrc: starFilled
        })
    );
    appendFragments(movieListElement, elements);
}

export default renderMovies;
