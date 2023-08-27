import Component from '../../core/component.js';
import Star from '../../../public/star_filled.png';
import { getMovies } from '../../api/getMovies.js';

class MovieList extends Component {
  setup() {
    this.setState({
      page: 0,
      movies: [],
    });
    this.addEvent('click', '.btn', () => {
      this.addMovies();
    });
    this.addMovies();
  }

  async addMovies() {
    this.setState({
      page: this.$state.page + 1,
    });
    const { data } = await getMovies(this.$state.page);
    this.setState({
      movies: [...this.$state.movies, ...data.results],
    });
  }

  template() {
    return /*html*/ `
      <div class="item-view">
        <h2>
          ${this.$props.title}
        </h2>
        <ul class="item-list">
          ${this.$state.movies
            .map((movie) => {
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
            })
            .join('')}
        </ul>
        <button class="btn primary full-width">더 보기</button>
      </div>
    `;
  }
}

export default MovieList;
