import getMovieList from '../apis/getMovieList';
import ConfirmModal from '../components/modal/ConfirmModal';
import { Modal } from '../components/modal/container/Modal';
import { NOT_MORE_MOVIES_MESSAGE } from '../constants/message';
import renderMovies from '../view/renderMovies';
import renderSkeletonMovies from '../view/renderSkeletonMovies';

export default async function handleMovie(page) {
    try {
        renderSkeletonMovies({ loading: true });
        const movieList = await getMovieList(page);
        renderSkeletonMovies({ loading: false });

        if (movieList.results.length === 0) {
            document.getElementById('more-movies').remove();
            new Modal(document.querySelector('body'), ConfirmModal(NOT_MORE_MOVIES_MESSAGE));
        }

        renderMovies({ movieList: movieList.results, resetHTML: false });
    } catch (error) {
        renderSkeletonMovies({ loading: false });
        new Modal(document.querySelector('body'), ConfirmModal(error.message));
    }
}
