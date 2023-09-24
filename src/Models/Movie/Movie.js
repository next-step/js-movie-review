import { isValidString, isValidRating } from '../../validation';
import { MIN_MOVIE_RATING, MAX_MOVIE_RATING, ERROR } from '../../constants';

/**
 * API 도메인별로 받아온 data를 정해진 Interface로 정형화합니다.
 */
export class Movie {
  title;
  thumbnail;
  rating;
  description;

  constructor({ title, thumbnail, rating, description }) {
    this.#validateMovie({ title, thumbnail, rating, description });

    this.title = title;
    this.thumbnail = thumbnail;
    this.rating = rating;
    this.description = description;
  }

  #validateMovie(movieData) {
    const { title, rating, description } = movieData;

    if (!isValidString(title)) throw new Error(ERROR.MOVIE.INVALID_STRING);
    if (!isValidRating(rating))
      throw new Error(
        ERROR.MOVIE.INVALID_RATING(MIN_MOVIE_RATING, MAX_MOVIE_RATING)
      );
    if (!isValidString(description))
      throw new Error(ERROR.MOVIE.INVALID_STRING);
  }
}
