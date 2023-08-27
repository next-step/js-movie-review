import request from './core/request.js';

export const getMovies = async (page) => {
  const { data } = await request(`/movie/popular?language=en-US&page=${page}`);
  return data;
};
