import Component from '../../core/component.js';
import Star from '../../../../public/star_filled.png';
import '../../types.js';

class MovieList extends Component {
  template() {
    return /*html*/ `
      <div class="item-view">
        <h2>
          ${this.$props.title}
        </h2>
        <ul class="item-list">
          ${this.$props.movies
            .map(
              /**
               * @param {Movie} movie
               */
              (movie) => {
                return /*html*/ `
                <a href="#">
                  <div class="item-card">
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
              }
            )
            .join('')}
            ${
              this.$props.isLoading
                ? /*html*/ `
                <li>
                  <a href="#">
                    <div class="item-card">
                      <div class="item-thumbnail skeleton"></div>
                      <div class="item-title skeleton"></div>
                      <div class="item-score skeleton"></div>
                    </div>
                  </a>
                </li>`.repeat(20)
                : ''
            }
            ${
              this.$props.isError
                ? /*html*/ `
                <div>
                  서버 통신중 문제가 발생하였습니다.
                </div>
              `
                : ''
            }
        </ul>
      </div>
    `;
  }
}

export default MovieList;
