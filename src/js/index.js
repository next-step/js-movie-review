import '../styles/reset.css';
import '../styles/common.css';
import { getMovieList } from '../apis';
import starFilled from '../assets/star_filled.png';
import starEmpty from '../assets/star_empty.png';

const imageBaseURL = 'https://image.tmdb.org/t/p/w500';

let pages = 1;

const moreMovies = document.getElementById('more-movies');
const movieList = document.querySelector('.item-list');

async function renderMovieItems(pages) {
  try {
    const itemList = await getMovieList(pages);
    console.log('itemList', itemList);
    const newItemsHTML = itemList
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
  } catch (error) {}
}

addEventListener('DOMContentLoaded', () => {
  renderMovieItems(pages);
});

moreMovies.addEventListener('click', () => {
  pages += 1;
  renderMovieItems(pages);
});
