import request from './core/request.js';
import '../types.js';

/**
 * 인기순으로 정렬된 영화 목록을 불러옵니다.
 * @param {number} page
 * @returns {Movie[]}
 */
export const getPopularMovies = async (page) => {
  const data = await request(`/movie/popular?language=ko-KR&page=${page}`);
  return data.results;
};
