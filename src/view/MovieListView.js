import { Modal } from '../components/modal';
import getMovieList from '../apis/getMovieList';
import getSearchedMovies from '../apis/getSearchEdMovies';
import { Cinema } from './Cinema';

export function MovieListView() {
    const cinema = new Cinema();
    const moreButton = document.getElementById('more-movies');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.querySelector('.search-button');

    async function renderMovieItems(pages) {
        try {
            cinema.showSekeleton(20, true);
            const itemList = await getMovieList(pages);
            cinema.createMovies(itemList.results);
        } catch (error) {
            const modal = new Modal();
            modal.content = error.message;
            document.querySelector('body').appendChild(modal.rendered);
        }
    }
    renderMovieItems(cinema.page);

    moreButton.addEventListener('click', () => {
        cinema.page += 1;
        renderMovieItems(cinema.page);
    });

    searchInput.addEventListener('keydown', async (event) => {
        if (event.code === 'Enter') {
            try {
                const { value } = searchInput;
                const titleElement = document.querySelector('.item-view h2');
                cinema.movieListElement.innerHTML = '';
                titleElement.innerText = `"${value}" 검색 결과`;
                cinema.showSekeleton(20, true);

                const itemList = await getSearchedMovies(value);
                cinema.createMovies(itemList.results);
            } catch (error) {
                const modal = new Modal();
                modal.content = error.message;
                document.querySelector('body').appendChild(modal.rendered);
            }
        }
    });

    searchButton.addEventListener('click', async () => {
        try {
            const { value } = searchInput;
            const titleElement = document.querySelector('.item-view h2');
            cinema.movieListElement.innerHTML = '';
            titleElement.innerText = `"${value}" 검색 결과`;
            cinema.showSekeleton(20, true);

            const itemList = await getSearchedMovies(value);
            cinema.createMovies(itemList.results);
        } catch (error) {
            const modal = new Modal();
            modal.content = error.message;
            document.querySelector('body').appendChild(modal.rendered);
        }
    });
}
