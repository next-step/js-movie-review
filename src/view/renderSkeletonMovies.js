import { SkeletonMovieCard } from '../components/SkeletonMovieCard';
import appendFragments from '../utils/appendFragments';

const renderSkeletonMovies = ({ loading }) => {
    const movieListElement = document.querySelector('.item-list');
    if (loading) {
        appendFragments(
            movieListElement,
            Array(20)
                .fill()
                .map(() => SkeletonMovieCard())
        );
    } else {
        const skeletonItems = movieListElement.querySelectorAll('.skeleton-item');
        skeletonItems.forEach((item) => item.remove());
    }
};

export default renderSkeletonMovies;
