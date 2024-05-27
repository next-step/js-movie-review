import '../styles/reset.css';
import '../styles/common.css';
import { getMovieList } from '../apis';
import { Modal } from './view/modal';
import { covertError } from './domain/error';
import { Movie } from './domain/movie';
import { Cinema } from './view/cinema';

const moreMovies = document.getElementById('more-movies');

const cinema = new Cinema();

async function renderMovieItems(pages) {
    try {
        cinema.showSkeleton(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const itemList = await getMovieList(pages);
        if (itemList.success !== false) {
            const newMoveList = itemList.results.map((item) => new Movie(item));
            cinema.setMovies(newMoveList);
            cinema.showMovies();
        } else {
            moreMovies.style.display = 'none';
        }
    } catch (error) {
        const modal = new Modal();
        modal.content = `${covertError(error.name)}`;
        document.querySelector('body').appendChild(modal.rendered);
        moreMovies.style.display = 'none';
    } finally {
        cinema.showSkeleton(false);
    }
}

addEventListener('DOMContentLoaded', () => {
    renderMovieItems(cinema.page);
});

moreMovies.addEventListener('click', () => {
    cinema.page += 1;
    renderMovieItems(cinema.page);
});
