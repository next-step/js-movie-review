import { tmdbApiWrapper } from './apiClient';

export async function getMoviePopular(page) {
	return await tmdbApiWrapper.get('/3/movie/popular', { page, language: 'ko-KR' });
}

export async function getMoviePopular(page, query) {
	return await tmdbApiWrapper.get('/3/search/popular', { page, language: 'ko-KR', query });
}
