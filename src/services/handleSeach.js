import getSearchedMovies from '../apis/getSearchEdMovies';
import { Modal } from '../components/modal';
import renderMovies from '../view/renderMovies';

export async function handleSearch(value) {
    try {
        renderSkeletonMovies({ loading: true });
        const titleElement = document.querySelector('.item-view h2');
        titleElement.innerText = `"${value}" 검색 결과`;
        const searchList = await getSearchedMovies(value);
        renderSkeletonMovies({ loading: false });
        renderMovies({ movieList: searchList.results, resetHTML: true });
    } catch (error) {
        const modal = new Modal();
        modal.content = error.message;
        document.querySelector('body').appendChild(modal.rendered);
    }
}
