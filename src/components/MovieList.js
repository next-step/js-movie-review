import { MovieItem } from "./MovieItem";

export const MovieList = async (props) => {
  const { movies } = props;

  return /* html */ `
    <h2>지금 인기 있는 영화</h2>
    <ul class="thumbnail-list">
    ${renderMovieItems(movies)}
    </ul>
    `;
};

export const renderMovieItems = (movies) => {
  return movies.map((movie) => MovieItem(movie)).join("");
};
