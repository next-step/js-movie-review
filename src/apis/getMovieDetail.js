import ApiClient from '../domain/ApiClient';

const getMovieDetail = async (movie_id) => {
    const res = ApiClient.request({
        method: 'GET',
        endpoint: `3/movie/${movie_id}`,
        params: {
            api_key: process.env.TMDB_API_KEY,
            language: 'ko-KR'
        }
    });

    return res;
};

export default getMovieDetail;
