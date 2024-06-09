import { HttpRequestInterceptor } from "cypress/types/net-stubbing";
import ErrorMessage from "../ErrorMessage";

const Api = {
  API_KEY: window.Cypress
    ? Cypress.env("TMDB_API_KEY")
    : process.env.TMDB_API_KEY,
  API_ACCESS_TOKEN: window.Cypress
    ? Cypress.env("TMDB_API_ACCESS_TOKEN")
    : process.env.TMDB_API_ACCESS_TOKEN,
  BASE_URL: "https://api.themoviedb.org/3",
  THUMBNAIL_URL: "https://image.tmdb.org/t/p/w500",
  LANGUAGE: "ko-KR",
  NUM_MOVIES_PER_PAGE: 20,

  generatePopularMoviesUrl(page: number): string {
    const param = new URLSearchParams({
      language: this.LANGUAGE,
      page: page.toString(),
    });

    return `${this.BASE_URL}/movie/popular?${param}`;
  },

  generateSearchMoviesUrl(query: string, page: number): string {
    const param = new URLSearchParams({
      language: this.LANGUAGE,
      query,
      page: page.toString(),
    });

    return `${this.BASE_URL}/search/movie?${param}`;
  },

  generateMovieDetailUrl(movieId: number): string {
    const param = new URLSearchParams({
      language: this.LANGUAGE,
    });

    return `${this.BASE_URL}/movie/${movieId}?${param}`;
  },

  generateMovieUserRatingUrl(movieId: number): string {
    return `${this.BASE_URL}/movie/${movieId}/account_states`;
  },

  generatePostMovieUserRatingUrl(movieId: number): string {
    return `${this.BASE_URL}/movie/${movieId}/rating`;
  },

  throwError(status: number) {
    switch (status) {
      case 401:
        throw new Error(ErrorMessage.NOT_VALID_API_KEY);
      case 404:
        throw new Error(ErrorMessage.NOT_VALID_URL);
      default:
        throw new Error(ErrorMessage.DEFAULT);
    }
  },

  async get<T>(url: string): Promise<T> {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.API_ACCESS_TOKEN}`,
      },
    };
    const response = await fetch(url, options);

    if (!response.ok) {
      this.throwError(response.status);
    }

    return await response.json();
  },

  async post<T, U>(url: string, body?: T): Promise<U> {
    const options: RequestInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json;charset=utf-8",
        Authorization: `Bearer ${this.API_ACCESS_TOKEN}`,
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      this.throwError(response.status);
    }

    return await response.json();
  },
};

export default Api;
