import '../styles/reset.css';
import '../styles/common.css';
import { getMovieList } from '../apis';
import { Modal } from './view/modal';
import { covertError } from './domain/error';
import { Movie } from './domain/movie';
import { Cinema } from './view/cinema';
import { renderHeader } from './view/header';
import { renderLogo } from './view/logo';
import { renderSearchBox } from './view/seachBox';

const moreMovies = document.getElementById('more-movies');
const seacrhInput = document.getElementById('search-input');

const cinema = new Cinema();
const searchCinema = new Cinema();

async function renderMovieItems(pages) {
    try {
        cinema.showSkeleton(true);
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
    renderHeader(renderLogo(), renderSearchBox());
    renderMovieItems(cinema.page);

    const searchButton = document.querySelector('.search-button');

    searchButton.addEventListener('click', () => {
        console.log('test');
        async function test() {
            const res = await fetch(
                'https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=cd45ff31f728c6222a2830fc1fb7f44e',
                {
                    method: 'GET'
                }
            );
            console.log('res', res);
        }
        test();
    });
});

moreMovies.addEventListener('click', () => {
    cinema.page += 1;
    renderMovieItems(cinema.page);
});
