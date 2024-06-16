import ApiClient from '../domain/ApiClient';

async function getSearchedMovies(query, page) {
    const res = ApiClient.request({
        method: 'GET',
        endpoint: '3/search/movie',
        params: {
            query: query,
            page: page,
            api_key: process.env.TMDB_API_KEY,
            language: 'ko-KR'
        }
    });

    return res;
}

export default getSearchedMovies;
