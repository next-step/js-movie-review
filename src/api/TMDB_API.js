import { ApiWrapper } from './apiClient';
import { convertTMDBMovieDetailResponse, convertTMDBMovieListResponse } from './responseConverter';

export const TMDB_BASE_URL = 'https://api.themoviedb.org';

export const TMDB_DEFAULT_HEADERS = {
	accept: 'application/json',
	Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
};

export const tmdbApiWrapper = new ApiWrapper(TMDB_BASE_URL, {
	headers: TMDB_DEFAULT_HEADERS,
});

export async function getMoviePopular(page) {
	const response = await tmdbApiWrapper.get('/3/movie/popular', { params: { page, language: 'ko-KR' } });

	return convertTMDBMovieListResponse(response);
}

export async function getSearchMovie(page, query) {
	const response = await tmdbApiWrapper.get('/3/search/movie', { params: { page, query, language: 'ko-KR' } });

	return convertTMDBMovieListResponse(response);
}

export async function getMovieDetails(id) {
	const response = await tmdbApiWrapper.get(`/3/movie/${id}`, {
		params: {
			language: 'ko-KR',
		},
	});

	return convertTMDBMovieDetailResponse(response);
}
