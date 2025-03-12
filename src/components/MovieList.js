import { renderMovieItems } from './MovieItem';

export const MovieList = (props) => {
  const { movies } = props;

  return /* html */ `
    <h2>지금 인기 있는 영화</h2>
    <ul class="thumbnail-list">
        ${renderMovieItems(movies)}
    </ul>
    `;
};

export const insertMovieItems = (movies) => {
  const movieSection = document.querySelector(".thumbnail-list");
  movieSection.insertAdjacentHTML("beforeend", renderMovieItems(movies));
};
