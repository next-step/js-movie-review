/**
 * rate는 1~10 사이의 값이 들어옵니다.
 * 소수점 1자리까지 보여줍니다.
 * @example
 * const movieRate = formatMovieRate(7.654);
 * console.log(movieRate); // 7.6
 */
export function formatMovieRate(rate) {
  return rate.toFixed(1);
}
