import { ApiClient } from './ApiClient';

export class TMDBClient extends ApiClient {
  constructor(baseUrl) {
    super(baseUrl);
  }

  async getPopularMovies(page = 1) {
    const endpoint = `/popular?language=en-US&page=${page}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.ACCESS_TOKEN,
      },
    };

    const { results } = await this.get(endpoint, options);
    return this.#formatMovieData(results);
  }

  #formatMovieData(movieData) {
    return movieData.map((data) => {
      const { poster_path, title, vote_average: score } = data;
      const imgSrc = `${process.env.IMG_URL}${poster_path}`;
      return { imgSrc, title, score };
    });
  }
}
