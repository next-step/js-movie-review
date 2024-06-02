import { BASE_URL } from '../constants/api';
import { APIError } from './error';
import { createUrlSeacrhParams } from './utils/createUrlSeachParams';

async function getMovieList(page) {
    const url = createUrlSeacrhParams({
        baseUrl: BASE_URL,
        params: { api_key: process.env.TMDB_API_KEY, page: page, language: 'ko-KR' }
    });

    const res = await fetch(url, {
        method: 'GET'
    })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if (data.success !== undefined && !data.success) throw new APIError(data.status_code, data.status_message);
            return data;
        });

    return res.results;
}

export default getMovieList;
