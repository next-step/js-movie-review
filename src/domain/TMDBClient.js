import { ApiClient } from './ApiClient';

export class TMDBClient {
  #baseUrl;
  #apiClient;

  constructor() {
    this.#baseUrl = `https://api.themoviedb.org/3/movie`;
    this.#apiClient = new ApiClient(this.#baseUrl);
  }

  getPopularMovies(page = 1) {
    const endpoint = `/popular?language=en-US&page=${page}}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjA3MDc2OWNmYWRhOTg0NWEwNTlkN2U2MDQ2YzBhYSIsInN1YiI6IjYzMWYyYzhkYjg3YWVjMDA4MjgzY2RkNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bjYX05NWfHAMCEuGoI7V4MkBL_4oc_nKO6ChMP86_xQ',
      },
    };
    try {
      const movieData = this.#apiClient.get(endpoint, options);
      return movieData;
    } catch (error) {
      throw new Error(error);
    }
  }
}
