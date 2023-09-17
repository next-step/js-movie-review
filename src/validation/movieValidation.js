import { ERROR } from '../constants';
import { MIN_MOVIE_RATING, MAX_MOVIE_RATING } from '../constants';

const isValidString = (value) => {
  if (!(typeof value === 'string' && value.trim() !== ''))
    throw new Error(ERROR.MOVIE.INVALID_STRING);
};

const isValidRating = (value) => {
  if (
    !(
      typeof value === 'number' &&
      MIN_MOVIE_RATING <= value &&
      value <= MAX_MOVIE_RATING
    )
  )
    throw new Error(
      ERROR.MOVIE.INVALID_RATING(MIN_MOVIE_RATING, MAX_MOVIE_RATING)
    );
};

export const movieValidation = (movieData) => {
  const { title, rating, description } = movieData;

  isValidString(title);
  isValidRating(rating);
  isValidString(description);
};
