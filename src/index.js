import './css/reset.css';
import './css/common.css';
import StarFilledIcon from './assets/star_filled.png';
import PageHandler from './utils/PageHandler';
import MovieCard from './components/MovieCard';
import CTAButton from './components/CTAButton';
import Layout from './components/Layout';

async function initialMovieList() {
  const $itemView = document.querySelector('.item-view');
  const $itemList = document.querySelector('.item-list');

  const param = new URLSearchParams({
    api_key: process.env.API_KEY,
    language: 'ko-KR',
    page: 1,
  });

  const data = await fetch(
    `https://api.themoviedb.org/3/movie/popular?${param}`
  ).then((res) => res.json());

  const $cardList = data.results.map(({ title, poster_path, vote_average }) =>
    MovieCard({
      title,
      poster: `https://image.tmdb.org/t/p/w200${poster_path}`,
      score: vote_average,
      icon: StarFilledIcon,
    })
  );

  $itemView
    .appendChild(CTAButton({ text: '더보기' }))
    .addEventListener('click', () => {
      PageHandler.next();
    });

  $cardList.forEach((v) => {
    $itemList.appendChild(v);
  });

  $itemList.addEventListener('click', ({ target }) => {
    if (target.matches('.item-list .item-thumbnail')) {
      PageHandler.reset();
    }
  });
}

const app = document.getElementById('app');
app.appendChild(Layout());
addEventListener('DOMContentLoaded', initialMovieList);
