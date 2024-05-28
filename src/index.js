import './css/reset.css';
import './css/common.css';
import StarFilledIcon from './assets/star_filled.png';
import Logo from './assets/logo.png';
import { MovieCard } from './components/MovieCard';

function Layout() {
  return `
    <header>
      <h1><img src="${Logo}" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    </header>
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list"></ul>
      </section>
    </main>
  `;
}

async function initialMovieList() {
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

  $cardList.forEach((v) => {
    $itemList.appendChild(v);
  });

  $itemList.insertAdjacentHTML(
    'afterend',
    `<button class="btn primary full-width">더 보기</button>`
  );
}

const app = document.getElementById('app');
app.insertAdjacentHTML('afterbegin', Layout());
addEventListener('DOMContentLoaded', initialMovieList);
