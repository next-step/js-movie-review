import PageHandler from './PageHandler';
import Movie from '../api/movie';
import { MovieCardView } from '../view/MovieView';

export function onClickMoreButton($moreButton, $movieView) {
  return async () => {
    const { page, done } = PageHandler.next();
    if (done) {
      $moreButton.classList.add('hidden');
    }
    const { results } = await Movie.getPopular(page);
    const $cardList = results.map(MovieCardView);

    $cardList.forEach((el) => $movieView.appendChild(el));
  };
}

export function onClickThumbnail({ target }) {
  if (target.matches('.item-list .item-thumbnail')) {
    /**
     * @TODO 썸네일 이미지 클릭
     */
  }
}
