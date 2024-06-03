import { html } from "../../utils/template.js";

class MovieList extends HTMLElement {
  #movies = [];
  #isLoading = true;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set movies(movies) {
    this.#movies = movies;
    this.render();
  }

  set isLoading(isLoading) {
    this.#isLoading = isLoading;
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.template();
  }

  template() {
    return html`
      <style>
        .movie-list {
          display: grid;
          margin: 48px 0;
          grid-template-columns: repeat(4, 180px);
          grid-column-gap: 160px;
          grid-row-gap: 48px;
        }

        ul {
          list-style: none;
          padding: 0;
        }
      </style>
      <ul class="movie-list">
        ${this.#isLoading
          ? Array.from({ length: 20 })
              .map(() => html` <movie-card isLoading="true"></movie-card> `)
              .join("")
          : this.#movies
              .map(
                (movie) => html`
                  <movie-card
                    posterPath="${movie.poster_path}"
                    title="${movie.title}"
                    voteAverage="${movie.vote_average}"
                    isLoading="false"
                  ></movie-card>
                `,
              )
              .join("")}
      </ul>
    `;
  }
}

customElements.define("movie-list", MovieList);
