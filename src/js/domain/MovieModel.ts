import { MovieGenre } from "../../types/Movie";
import {
  MovieDetailResponseDTO,
  MovieUserRatingResponseDTO,
} from "../../types/MovieApiDTO";
import Api from "./Api";

class MovieModel {
  #id: number;
  #title: string;
  #rating: number;
  #thumbnail: string;
  #overview: string;
  userRating: null | number = null; // 사용자가 평가한 평점
  genres: MovieGenre[] = [];

  constructor({
    id,
    title,
    rating,
    thumbnail,
    overview,
  }: {
    id: number;
    title: string;
    rating: number;
    thumbnail: string;
    overview: string;
  }) {
    this.#id = id;
    this.#title = title;
    this.#rating = rating;
    this.#thumbnail = thumbnail;
    this.#overview = overview;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get rating() {
    return this.#rating;
  }

  get thumbnail() {
    return this.#thumbnail;
  }

  get overview() {
    return this.#overview;
  }

  async fetchMovieDetail() {
    const url = Api.generateMovieDetailUrl(this.#id);

    try {
      const { results: movieDetail } = await Api.get<MovieDetailResponseDTO>(
        url
      );

      const { genres } = movieDetail;

      this.genres = genres;
    } catch (e) {
      alert(e.message);
    }
  }

  async fetchMovieUserRating() {
    const url = Api.generateMovieUserRatingUrl(this.#id);

    try {
      const { results: userRatingInfo } =
        await Api.get<MovieUserRatingResponseDTO>(url);

      const { rated } = userRatingInfo;

      if (!rated) {
        return;
      }

      this.userRating = rated.value;
    } catch (e) {
      alert(e.message);
    }
  }
}

export default MovieModel;
