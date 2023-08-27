import request from './core/request.js';

export const getMovies = async (page) => {
  const data = await request(`/movie/popular?language=ko-KR&page=${page}`);
  return data.results;
};
