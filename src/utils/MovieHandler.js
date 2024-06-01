import PageHandler from './PageHandler';
import { getPopularMovie } from '../api/movie';

export async function getNextPopularMovie() {
  const { page, done } = PageHandler.next();
  const { results } = await getPopularMovie(page);
  return {
    page,
    done,
    nextMovieList: results,
  };
}
