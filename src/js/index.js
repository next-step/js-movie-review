import '../styles/reset.css';
import '../styles/common.css';
import { getMovieList } from '../apis';
import starFilled from '../assets/star_filled.png';

const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

let pages = 1;

const moreMovies = document.getElementById('more-movies');
const skeletonMovies = document.querySelector('.skeleton-list');
const movieList = document.querySelector('.item-list');

function renderSkeletonMovies(flag) {
  if (flag === true) {
    const skeletonHTML = Array(20)
      .fill(
        `            
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>`
      )
      .join(''); // 배열을 문자열로 변환

    skeletonMovies.innerHTML = skeletonHTML;
  } else {
    skeletonMovies.innerHTML = '';
  }
}

async function renderMovieItems(pages) {
  try {
    renderSkeletonMovies(true);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const itemList = await getMovieList(pages);
    if (itemList.success !== false) {
      const newItemsHTML = itemList.results
        .map((movieInfo) => {
          return `
        <li>
          <a href="#">
            <div class="item-card">
              <img
                class="item-thumbnail"
                src="${imageBaseURL}${movieInfo.poster_path}"
                loading="lazy"
                alt="${movieInfo.title}"
              />
              <p class="item-title">${movieInfo.title}</p>
              <p class="item-score">
              <img src="${starFilled}" alt="별점" /> ${movieInfo.vote_average}
              </p>
            </div>
          </a>
        </li>
      `;
        })
        .join('');
      movieList.innerHTML += newItemsHTML;
    } else {
      moreMovies.style.display = 'none';
    }
  } catch (error) {
  } finally {
    renderSkeletonMovies(false);
  }
}

addEventListener('DOMContentLoaded', () => {
  renderMovieItems(pages);
});

moreMovies.addEventListener('click', () => {
  pages += 1;
  renderMovieItems(pages);
});
