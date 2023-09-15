import { MAX_MOVIE_RATING } from '../constants';

export class MovieComponent {
  #element;

  /**
   *
   * @param {Movie} movie Movie 모델을 주입받아 컴포넌트를 생성합니다.
   */
  constructor(movie) {
    this.props = movie;
    this.#createComponent(this.props);
  }

  #createComponent(movie) {
    const { title, thumbnail, rating, description } = movie.getData();

    this.#element = `
      <div class="movie-container">
        <h1>${title}</h1>
        <img src="${thumbnail}">${movie}</img>
        <div>✦${rating}/${MAX_MOVIE_RATING}</div>
      </div>
    `;
  }

  getComponent() {
    return this.#element;
  }

  render() {
    const parentComponent = document.querySelector('#app');

    parentComponent.innerHTML = this.#element;
  }
}
