import getSearchedMovies from '../apis/getSearchEdMovies';
import ConfirmModal from '../components/modal/ConfirmModal';
import { Modal } from '../components/modal/container/Modal';
import renderMovies from '../view/renderMovies';
import renderSkeletonMovies from '../view/renderSkeletonMovies';

export async function handleSearch(value) {
    try {
        renderSkeletonMovies({ loading: true });
        const titleElement = document.querySelector('.item-view h2');
        titleElement.innerText = `"${value}" 검색 결과`;
        const searchList = await getSearchedMovies(value);
        renderSkeletonMovies({ loading: false });
        renderMovies({ movieList: searchList.results, resetHTML: true });
    } catch (error) {
        renderSkeletonMovies({ loading: false });
        new Modal(document.querySelector('body'), ConfirmModal(error.message));
    }
}
