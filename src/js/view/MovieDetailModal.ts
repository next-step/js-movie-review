import { $ } from "../../utils/dom";
import UserMovieRatingForm from "./UserMovieRatingForm";
import MovieModel from "../domain/MovieModel";

const MovieDetailModal = {
  elements: {
    modal: $(".modal"),
    closeBtn: $(".modal-close"),
    modalInner: $(".modal-inner"),
    movieTitle: $(".movie-title"),
    modalBody: $(".modal-body"),
    movieHeader: $(".movie-header"),
    movieOverview: $(".movie-overview"),
    movieThumbnail: $(".movie-thumbnail"),
  },

  open(movie: MovieModel) {
    MovieDetailModal.elements.modal.classList.add("open");
    MovieDetailModal.render(movie);
  },

  close() {
    this.reset();
    MovieDetailModal.elements.modal.classList.remove("open");
  },

  reset() {
    MovieDetailModal.elements.movieTitle.textContent = "";
    MovieDetailModal.elements.movieThumbnail.innerHTML = "";
    MovieDetailModal.elements.movieHeader.innerHTML = "";
    MovieDetailModal.elements.movieOverview.textContent = "";
    UserMovieRatingForm.reset();
  },

  addSkeleton() {
    MovieDetailModal.elements.movieThumbnail.classList.add("skeleton");
    MovieDetailModal.elements.movieHeader.classList.add("skeleton");
    MovieDetailModal.elements.movieOverview.classList.add("skeleton");
    UserMovieRatingForm.addSkeleton();
  },

  removeSkeleton() {
    MovieDetailModal.elements.movieThumbnail.classList.remove("skeleton");
    MovieDetailModal.elements.movieHeader.classList.remove("skeleton");
    MovieDetailModal.elements.movieOverview.classList.remove("skeleton");
    UserMovieRatingForm.removeSkeleton();
  },

  renderMovieTitle(title: string) {
    MovieDetailModal.elements.movieTitle.textContent = title;
  },

  renderMovieThumbnail(thumbnail: string, title: string) {
    MovieDetailModal.elements.movieThumbnail.innerHTML = /* html */ `
      <img
        src=${thumbnail}
        alt=${title}
      />
    `;
  },

  renderMovieHeader(genres: string[], rating: number) {
    MovieDetailModal.elements.movieHeader.innerHTML = /* html */ `
      <span class="modal-genres">${genres.join(", ")}</span>
      <img src="./images/star_filled.png" alt="별점" /> ${rating}
    `;
  },

  renderMovieOverview(overview: string) {
    MovieDetailModal.elements.movieOverview.textContent = overview;
  },

  async render(movie: MovieModel) {
    MovieDetailModal.renderMovieTitle(movie.title);

    MovieDetailModal.addSkeleton();
    await Promise.all([movie.fetchMovieDetail(), movie.fetchMovieUserRating()]);
    MovieDetailModal.removeSkeleton();

    MovieDetailModal.renderMovieThumbnail(movie.thumbnail, movie.title);
    MovieDetailModal.renderMovieHeader(movie.genres, movie.rating);
    MovieDetailModal.renderMovieOverview(movie.overview);
    UserMovieRatingForm.render(movie);
  },
};

export default MovieDetailModal;
