import getMovieList from '../apis/getMovieList';
import { Modal } from '../components/modal';
import renderMovies from '../view/renderMovies';
import renderSkeletonMovies from '../view/renderSkeletonMovies';

export default async function handleMovie(page) {
    try {
        renderSkeletonMovies({ loading: true });
        const movieList = await getMovieList(page);
        renderSkeletonMovies({ loading: false });
        renderMovies({ movieList: movieList.results, resetHTML: false });
    } catch (error) {
        const modal = new Modal();
        modal.content = error.message;
        document.querySelector('body').appendChild(modal.rendered);
    }
}
