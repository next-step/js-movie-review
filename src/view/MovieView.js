import StarFilledIcon from '../assets/star_filled.png';
import { getPopularMovie } from '../api/movie';
import CTAButton from '../components/CTAButton';
import MovieCard from '../components/MovieCard';
import PageHandler from '../utils/PageHandler';
import { onClickMoreButton } from '../utils/MovieHandler';

export async function MovieListView() {
  const $movieView = document.querySelector('.item-view');
  const $movieList = document.querySelector('.item-list');
  const $moreButton = CTAButton({ text: '더보기' });

  const { results, total_pages } = await getPopularMovie(
    PageHandler.getCurrentPage()
  );
  const $popularMovieCards = results.map(MovieCardView);

  $popularMovieCards.forEach((el) => $movieList.appendChild(el));

  if (PageHandler.getCurrentPage() !== total_pages) {
    $movieView
      .appendChild($moreButton)
      .addEventListener('click', onClickMoreButton($moreButton, $movieList));
  }
}

export function MovieCardView({ title, poster_path, vote_average }) {
  return MovieCard({
    title,
    poster: `https://image.tmdb.org/t/p/w200${poster_path}`,
    score: vote_average,
    icon: StarFilledIcon,
  });
}
