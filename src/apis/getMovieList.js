import ApiClient from './apiClient';

async function getMovieList(page) {
    const res = ApiClient.request({
        method: 'GET',
        endpoint: '3/movie/popular',
        params: {
            api_key: process.env.TMDB_API_KEY,
            page: page,
            language: 'ko-KR'
        }
    });

    return res;
}

export default getMovieList;
