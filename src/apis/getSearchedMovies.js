import { BASE_URL } from '../constants/api';
import { createUrlSeacrhParams } from './utils/createUrlSeachParams';

async function getSearchedMovies(query) {
    const url = createUrlSeacrhParams({
        baseUrl: BASE_URL,
        params: { query: query, api_key: process.env.TMDB_API_KEY, language: 'ko-KR' }
    });

    const res = await fetch(url, {
        method: 'GET'
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success !== undefined && !data.success) throw new APIError(data.status_code, data.status_message);
            return data;
        });
    return res;
}

export default getSearchedMovies;
