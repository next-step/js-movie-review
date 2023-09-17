const MOVIE = Object.freeze({
  INVALID_MOVIE_STRING: '잘못된 영화제목입니다.',
  INVALID_MOVIE_THUMBNAIL_URL: '유효한 URL이 아닙니다.',
  INVALID_MOVIE_RATING: (minRating, maxRating) =>
    `점수는 ${minRating}점과 ${maxRating}점 사이여야 합니다.`,
});

export const ERROR = Object.freeze({
  HTTP: (status) => `HTTP Error | Status ${status}`,
  MOVIE,
});
