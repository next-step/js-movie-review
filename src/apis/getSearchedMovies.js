const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

async function getSearchedMovies(query) {
    try {
        const url = new URL(BASE_URL);
        const params = { query: query, api_key: process.env.TMDB_API_KEY };
        url.search = new URLSearchParams(params).toString();

        const res = await fetch(url, {
            method: 'GET'
        }).then((res) => res.json());

        if (res.success === false) {
            const error = new Error();
            error.name = res.status_code;
            error.message = res.status_message;
            throw error;
        }

        return res;
    } catch (error) {
        console.log();
    }
}

export default getSearchedMovies;
