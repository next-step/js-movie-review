import ApiClient from './apiClient';

async function getSearchedMovies(query) {
    const res = ApiClient.request({
        method: 'GET',
        endpoint: '3/search/movie',
        params: {
            query: query,
            api_key: process.env.TMDB_API_KEY,
            language: 'ko-KR'
        }
    });

    return res;
}

export default getSearchedMovies;
