import StarFilledIcon from '../assets/star_filled.png';
import { getPopularMovie } from '../api/movie';
import CTAButton from '../components/CTAButton';
import MovieCard from '../components/MovieCard';
import PageHandler from '../utils/PageHandler';
import { getNextPopularMovie } from '../utils/MovieHandler';
import { setHiddenElement } from '../utils/dom';

export async function MovieListView() {
  const $movieView = document.querySelector('.item-view');
  const $movieList = document.querySelector('.item-list');
  const $moreButton = CTAButton({ text: '더보기' });

  const { results, total_pages } = await getPopularMovie(
    PageHandler.getCurrentPage()
  );
  PageHandler.setTotalPages(total_pages);

  const $popularMovieCards = results.map(MovieCardView);

  $popularMovieCards.forEach((el) => $movieList.appendChild(el));

  if (PageHandler.hasNextPage()) {
    const onClickMoreButton = async () => {
      const { done, nextMovieList } = await getNextPopularMovie(
        $moreButton,
        $movieList
      );

      if (done) {
        setHiddenElement($moreButton);
      }

      appendMovieListView($movieList, nextMovieList);
    };

    $movieView
      .appendChild($moreButton)
      .addEventListener('click', onClickMoreButton);
  }
}

function appendMovieListView($movieList, newMovieData) {
  const $cardList = newMovieData.map(MovieCardView);
  $cardList.forEach((el) => $movieList.appendChild(el));
}

function MovieCardView({ title, poster_path, vote_average }) {
  return MovieCard({
    title,
    poster: `https://image.tmdb.org/t/p/w200${poster_path}`,
    score: vote_average,
    icon: StarFilledIcon,
  });
}
