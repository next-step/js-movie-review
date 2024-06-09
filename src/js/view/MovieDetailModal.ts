import { $ } from "../../utils/dom";
import MovieListModel from "../domain/MovieListModel";
import MovieModel from "../domain/MovieModel";
import MovieDetailModalSkeleton from "./MovieDetailModalSkeleton";

const MovieDetailModal = {
  elements: {
    modal: $(".modal"),
    closeBtn: $(".modal-close"),
    modalInner: $(".modal-inner"),
    movieTitle: $(".movie-title"),
    modalBody: $(".modal-body"),
  },

  open(movieList: MovieListModel, movieId: number) {
    MovieDetailModal.elements.modal.classList.add("open");
    this.renderModalContent(movieList, movieId);
  },

  close() {
    this.resetModalContent();
    MovieDetailModal.elements.modal.classList.remove("open");
  },

  resetModalContent() {
    MovieDetailModal.elements.movieTitle.textContent = "";
    MovieDetailModal.elements.modalBody.innerHTML = "";
  },

  addSkeleton() {
    MovieDetailModal.elements.modalBody.innerHTML =
      MovieDetailModalSkeleton.generateTemplate();
  },

  async generateModalBodyContent(movie: MovieModel) {
    await movie.fetchMovieDetail();

    const genres = movie.genres.join(", ");

    return /* html */ `
      <div class="movie-thumbnail">
        <img
          src=${movie.thumbnail}
          alt=${movie.title}
        />
      </div>

      <div class="movie-info">
        <p class="movie-header">
          <span class="modal-genres">${genres}</span>
          <img src="./images/star_filled.png" alt="별점" /> ${movie.rating}
        </p>
        <p class="movie-overview">${movie.overview}</p>

        <div class="user-rating">
          <span class="user-rating-title">내 별점</span>
          <div class="rating-stars">
            ${[1, 2, 3, 4, 5]
              .map((star) => {
                const isFilled = star <= movie.userRating / 2;
                return /* html */ `
                <img
                  src="./images/star_${isFilled ? "filled" : "empty"}.png"
                  alt="star"
                  data-star=${star}
                />
              `;
              })
              .join("")}
          </div>
          ${movie.userRating ? `<span>${movie.userRating}</span>` : ""}
        </div>
      </div>
    `;
  },

  async renderModalContent(movieList: MovieListModel, movieId: number) {
    const movie = movieList.getMovieById(movieId);

    if (!movie) {
      return;
    }

    MovieDetailModal.elements.movieTitle.textContent = movie.title;

    MovieDetailModal.addSkeleton();
    MovieDetailModal.elements.modalBody.innerHTML =
      await this.generateModalBodyContent(movie);
  },
};

export default MovieDetailModal;
