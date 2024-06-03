import { fetchPopularMovies } from "../../apis/movie.js";
import { html } from "../../utils/template";
import "./movie-list.js";

class MovieContainer extends HTMLElement {
  #page = 1;
  #movies = [];
  #isLoading = true;
  #isEnded = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.fetchMovies();
  }

  async fetchMovies() {
    this.#isLoading = true;
    this.updateMovieList();

    fetchPopularMovies(this.#page)
      .then((data) => {
        this.#movies = [...this.#movies, ...data.results];
        this.#isEnded = this.#page === data.total_pages;
      })
      .catch((error) => {
        alert(error);
      })
      .finally(() => {
        this.#isLoading = false;
        this.updateMovieList();
        this.buttonCheckHandler();
      });
  }

  clickHandler() {
    if (this.#isLoading || this.#isEnded) {
      return;
    }
    this.#page += 1;
    this.fetchMovies();
  }

  buttonCheckHandler() {
    const showMoreButton = this.shadowRoot.querySelector(".show-more");

    if (!showMoreButton) {
      return;
    }

    if (this.#isEnded) {
      showMoreButton.style.display = "none";
    }
    if (!this.#isEnded) {
      showMoreButton.style.display = "block";
    }
  }

  updateMovieList() {
    const movieList = this.shadowRoot.querySelector("movie-list");
    movieList.movies = this.#movies;
    movieList.isLoading = this.#isLoading;
  }

  render() {
    this.shadowRoot.innerHTML = this.template();
    this.shadowRoot
      .querySelector("button")
      .addEventListener("click", () => this.clickHandler());
  }

  template() {
    return html`
      <style>
        .movie-container {
          width: 100%;
        }

        .movie-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 1200px;
          margin: 0 auto;
        }

        .movie-container h2 {
          font-size: 2rem;
          font-weight: bold;
          user-select: none;
        }
        .full-width {
          width: 100%;
        }

        button.btn {
          border: 0;
          border-radius: 8px;
          height: 30px;
          color: #fff;
          cursor: pointer;
        }
        button.primary {
          background: #f33f3f;
        }
      </style>
      <section class="movie-container">
        <h2>지금 인기 있는 영화</h2>
        <movie-list></movie-list>
        <button class="btn primary full-width show-more">더보기</button>
      </section>
    `;
  }
}

customElements.define("movie-container", MovieContainer);
