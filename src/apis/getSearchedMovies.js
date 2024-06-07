import ApiClient from './\bapiClient';

async function getSearchedMovies(query) {
    const res = ApiClient.request('GET', '3/search/movie', {
        query: query,
        api_key: process.env.TMDB_API_KEY,
        language: 'ko-KR'
    });

    return res;
}

export default getSearchedMovies;
