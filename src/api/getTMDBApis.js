import { tmdbApiWrapper } from './apiClient';
import { convertTMDBResponse } from './responseConverter';

export async function getMoviePopular(page) {
	const response = await tmdbApiWrapper.get('/3/movie/popular', { page, language: 'ko-KR' });

	return convertTMDBResponse(response);
}

export async function getSearchMovie(page, query) {
	const response = await tmdbApiWrapper.get('/3/search/movie', { page, language: 'ko-KR', query });

	return convertTMDBResponse(response);
}
