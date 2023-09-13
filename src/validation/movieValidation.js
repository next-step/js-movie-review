const MIN_RATING = 0;
const MAX_RATING = 10;

const ERROR = Object.freeze({
  INVALID_STRING: '잘못된 영화제목입니다.',
  INVALID_URL: '유효한 URL이 아닙니다.',
  INVALID_RATING: (minRating, maxRating) =>
    `점수는 ${minRating}점과 ${maxRating}점 사이여야 합니다.`,
});

const isValidString = (value) => {
  if (!(typeof value === 'string' && value.trim() !== ''))
    throw new Error(ERROR.INVALID_STRING);
};

const isValidURL = (value) => {
  try {
    new URL(value);
  } catch {
    throw new Error(ERROR.INVALID_URL);
  }
};

const isValidRating = (value) => {
  if (
    !(typeof value === 'number' && MIN_RATING <= value && value <= MAX_RATING)
  )
    throw new Error(ERROR.INVALID_RATING(MIN_RATING, MAX_RATING));
};

export const movieValidation = (movieData) => {
  const { title, thumbnail, rating, description } = movieData;

  isValidString(title);
  isValidURL(thumbnail);
  isValidRating(rating);
  isValidString(description);
};
