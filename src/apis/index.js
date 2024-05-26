const baseURL = 'https://api.themoviedb.org/3//movie/popular';

export async function getMovieList(page) {
  try {
    const url = new URL(baseURL);
    const params = { api_key: process.env.TMDB_API_KEY, page: page };
    url.search = new URLSearchParams(params).toString();

    const res = await fetch(url).then((res) => res.json());

    return res.results;
  } catch (error) {
    console.log(error);
  }
}
