import Component from '../../core/Component.js';
import Star from '../../../../public/star_filled.png';
import '../../types.js';

class MovieList extends Component {
  template() {
    const skeleton = /*html*/ `
      <li>
        <a href="#">
          <div class="item-card" data-cy="movie-skeleton">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>`.repeat(20);
    /**
     * @param {Movie} movie
     */
    const movieItem = (movie) => /*html*/ `
      <a href="#">
        <div class="item-card" data-cy="movie-item">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/original${movie.poster_path}"
            loading="lazy"
            alt="${movie.title}"
          />
          <p class="item-title">${movie.title}</p>
          <p class="item-score"><img src=${Star} alt="별점" />${movie.vote_average}</p>
        </div>
      </a>
    `;
    const error = /*html*/ `
      <div data-cy="request-error">
        서버 통신중 문제가 발생하였습니다.
        error: ${this.$props.error}
      </div>
    `;

    return /*html*/ `
      <div class="item-view">
        <h2>
          ${this.$props.title}
        </h2>
        <ul class="item-list">
          ${this.$props.movies ? this.$props.movies.map(movieItem).join('') : ''}
          ${this.$props.isLoading ? skeleton : ''}
          ${this.$props.isError ? error : ''}
        </ul>
      </div>
    `;
  }
}

export default MovieList;
