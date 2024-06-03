import StarFilled from "../../../images/star_filled.png";
import { html } from "../../utils/template.js";

const BASE_URL = "https://image.tmdb.org/t/p/w220_and_h330_face";

class MovieCard extends HTMLElement {
  static get observedAttributes() {
    return ["posterPath", "title", "voteAverage", "isLoading"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  get posterPath() {
    return this.getAttribute("posterPath");
  }

  get title() {
    return this.getAttribute("title");
  }

  get voteAverage() {
    return this.getAttribute("voteAverage");
  }

  get isLoading() {
    return this.getAttribute("isLoading") === "true";
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const state = {
      posterPath: this.posterPath,
      title: this.title,
      voteAverage: this.voteAverage,
      isLoading: this.isLoading,
    };
    this.shadowRoot.innerHTML = this.template(state);
  }

  template({ posterPath, title, voteAverage, isLoading }) {
    return html`
      <style>
        .movie-card {
          display: flex;
          flex-direction: column;
        }

        .movie-thumbnail {
          border-radius: 8px;
          width: 180px;
          height: 270px;
          background-size: contain;
        }

        .movie-title {
          margin-top: 16px;
          font-size: 1.2rem;
          font-weight: bold;
        }

        .movie-score {
          margin-top: 16px;
          font-size: 1.2rem;
        }

        .movie-score::after {
          margin-left: 8px;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .movie-title.skeleton::after,
        .movie-score.skeleton::after {
          font-size: 0;
          content: "loading";
        }

        .movie-card .skeleton {
          background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);
          background-size: 400%;
          animation: skeleton-animation 5s infinite ease-out;
          border-radius: 8px;
        }

        @keyframes skeleton-animation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      </style>
      <li>
        ${isLoading
          ? html`
              <div class="movie-card">
                <div class="movie-thumbnail skeleton"></div>
                <p class="movie-title skeleton"></p>
                <p class="movie-score skeleton"></p>
              </div>
            `
          : html`
              <a href="#">
                <div class="movie-card">
                  <img
                    class="movie-thumbnail"
                    src="${BASE_URL}/${posterPath}"
                    loading="lazy"
                    alt="${title}"
                  />
                  <p class="movie-title">${title}</p>
                  <p class="movie-score">
                    <img src="${StarFilled}" alt="별점" />
                    ${Number(voteAverage).toFixed(1)}
                  </p>
                </div>
              </a>
            `}
      </li>
    `;
  }
}

customElements.define("movie-card", MovieCard);
