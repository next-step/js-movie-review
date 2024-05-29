import './css/reset.css';
import './css/common.css';
import StarFilledIcon from './assets/star_filled.png';
import PageHandler from './utils/PageHandler';
import MovieCard from './components/MovieCard';
import CTAButton from './components/CTAButton';
import Layout from './components/Layout';
import Movie from './api/movie';

async function initialMovieList() {
  const $itemView = document.querySelector('.item-view');
  const $itemList = document.querySelector('.item-list');
  const $moreButton = CTAButton({ text: '더보기' });

  const popularMovieList = await Movie.getPopular(PageHandler.getCurrentPage());
  const $cardList = popularMovieList.results.map(createMovieCard);

  $itemView.appendChild($moreButton).addEventListener('click', async () => {
    const { page, done } = PageHandler.next();
    if (done) {
      $moreButton.classList.add('hidden');
    }
    const nextPopularMovieList = await Movie.getPopular(page);
    const $cardList = nextPopularMovieList.results.map(createMovieCard);

    $cardList.forEach((el) => $itemList.appendChild(el));
  });

  $cardList.forEach((el) => $itemList.appendChild(el));

  $itemList.addEventListener('click', ({ target }) => {
    if (target.matches('.item-list .item-thumbnail')) {
      PageHandler.reset();
    }
  });
}

function createMovieCard({ title, poster_path, vote_average }) {
  return MovieCard({
    title,
    poster: `https://image.tmdb.org/t/p/w200${poster_path}`,
    score: vote_average,
    icon: StarFilledIcon,
  });
}

const app = document.getElementById('app');
app.appendChild(Layout());
addEventListener('DOMContentLoaded', initialMovieList);
