import { BASE_URL } from '../constants/api';
import ApiClient from './\bapiClient';

async function getSearchedMovies(query) {
    const res = ApiClient.request('GET', BASE_URL, {
        query: query,
        api_key: process.env.TMDB_API_KEY,
        language: 'ko-KR'
    });

    return res;
}

export default getSearchedMovies;
