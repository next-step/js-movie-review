import '../styles/reset.css';
import '../styles/common.css';
import getMovieList from '../apis/getMovieList';
import { Modal } from './view/modal';
import { covertError } from './domain/error';
import { Movie } from './domain/movie';
import { Cinema } from './view/cinema';
import { renderHeader } from './view/header';
import { renderLogo } from './view/logo';
import { renderSearchBox } from './view/seachBox';
import getSearchedMovies from '../apis/getSearchEdMovies';
import renderTitle from './view/title';

const moreMovies = document.getElementById('more-movies');

const cinema = new Cinema();

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
    renderTitle('지금 인기 있는 영화');

    const searchButton = document.querySelector('.search-button');
    const searchInput = document.getElementById('search-input');

    searchButton.addEventListener('click', async () => {
        try {
            if (searchInput.value) {
                const res = await getSearchedMovies(searchInput.value);
                const newMoveList = res.results.map((item) => new Movie(item));
                cinema.resetMovies();
                renderTitle(`"${searchInput.value}" 검색 결과`);
                cinema.setMovies(newMoveList);
                cinema.showMovies();
            }
        } catch (error) {}
    });

    searchInput.addEventListener('keydown', async ({ key }) => {
        if (key === 'Enter') {
            if (searchInput.value) {
                const res = await getSearchedMovies(searchInput.value);
                const newMoveList = res.results.map((item) => new Movie(item));
                cinema.resetMovies();
                renderTitle(`"${searchInput.value}" 검색 결과`);
                cinema.setMovies(newMoveList);
                cinema.showMovies();
            }
        }
    });
});

moreMovies.addEventListener('click', () => {
    cinema.page += 1;
    renderMovieItems(cinema.page);
});
