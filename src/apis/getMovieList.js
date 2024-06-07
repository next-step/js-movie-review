import ApiClient from './\bapiClient';

async function getMovieList(page) {
    const res = ApiClient.request('GET', '3/movie/popular', {
        api_key: process.env.TMDB_API_KEY,
        page: page,
        language: 'ko-KR'
    });

    return res;
}

export default getMovieList;
