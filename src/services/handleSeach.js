import getSearchedMovies from '../apis/getSearchedMovies';
import ConfirmModal from '../components/modal/ConfirmModal';
import { Modal } from '../components/modal/container/Modal';
import { NOT_MORE_MOVIES_MESSAGE } from '../constants/message';
import renderMovies from '../view/renderMovies';
import renderSkeletonMovies from '../view/renderSkeletonMovies';

export async function handleSearch(value, page = 1) {
    try {
        renderSkeletonMovies({ loading: true });
        const titleElement = document.querySelector('.item-view h2');
        titleElement.innerText = `"${value}" 검색 결과`;
        const searchList = await getSearchedMovies(value, page);
        renderSkeletonMovies({ loading: false });

        if (searchList.results.length === 0) {
            document.getElementById('more-movies').remove();
            new Modal(document.querySelector('body'), ConfirmModal(NOT_MORE_MOVIES_MESSAGE));
        }
        renderMovies({ movieList: searchList.results, resetHTML: page === 1 ? true : false });
    } catch (error) {
        renderSkeletonMovies({ loading: false });
        new Modal(document.querySelector('body'), ConfirmModal(error.message));
    }
}
