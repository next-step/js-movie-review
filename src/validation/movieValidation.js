import { MIN_MOVIE_RATING, MAX_MOVIE_RATING } from '../constants';

export const isValidString = (value) => {
  if (typeof value === 'string' && value.trim() !== '') return true;

  return false;
};

export const isValidRating = (value) => {
  if (
    typeof value === 'number' &&
    MIN_MOVIE_RATING <= value &&
    value <= MAX_MOVIE_RATING
  )
    return true;

  return false;
};
