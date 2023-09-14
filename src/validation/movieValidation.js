import { ERROR } from '../constants';

const isValidString = (value) => {
  if (!(typeof value === 'string' && value.trim() !== ''))
    throw new Error(ERROR.MOVIE.INVALID_STRING);
};

const isValidURL = (value) => {
  try {
    new URL(value);
  } catch {
    throw new Error(ERROR.MOVIE.INVALID_URL);
  }
};

const isValidRating = (value) => {
  if (
    !(typeof value === 'number' && MIN_RATING <= value && value <= MAX_RATING)
  )
    throw new Error(ERROR.MOVIE.INVALID_RATING(MIN_RATING, MAX_RATING));
};

export const movieValidation = (movieData) => {
  const { title, thumbnail, rating, description } = movieData;

  isValidString(title);
  isValidURL(thumbnail);
  isValidRating(rating);
  isValidString(description);
};
