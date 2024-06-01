import PageHandler from './PageHandler';
import { getPopularMovie } from '../api/movie';
import { MovieCardView } from '../view/MovieView';

export function onClickMoreButton($moreButton, $movieView) {
  return async () => {
    const { page, done } = PageHandler.next();
    if (done) {
      $moreButton.classList.add('hidden');
    }
    const { results } = await getPopularMovie(page);
    const $cardList = results.map(MovieCardView);

    $cardList.forEach((el) => $movieView.appendChild(el));
  };
}
