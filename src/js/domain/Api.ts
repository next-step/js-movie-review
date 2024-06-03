import ErrorMessage from "../ErrorMessage";

const Api = {
  BASE_URL: "https://api.themoviedb.org/3",
  THUMBNAIL_URL: "https://image.tmdb.org/t/p/w500",
  LANGUAGE: "ko-KR",

  API_KEY: window.Cypress
    ? Cypress.env("TMDB_API_KEY")
    : process.env.TMDB_API_KEY,

  NUM_MOVIES_PER_PAGE: 20,

  generatePopularMoviesUrl(page: number): string {
    const param = new URLSearchParams({
      api_key: this.API_KEY,
      language: this.LANGUAGE,
      page: page.toString(),
    });

    return `${this.BASE_URL}/movie/popular?${param}`;
  },

  generateSearchMoviesUrl(query: string, page: number): string {
    const param = new URLSearchParams({
      api_key: this.API_KEY,
      language: this.LANGUAGE,
      query,
      page: page.toString(),
    });

    return `${this.BASE_URL}/search/movie?${param}`;
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

  async get<T>(url: string): Promise<{
    results: T;
  }> {
    const response = await fetch(url);

    if (!response.ok) {
      this.throwError(response.status);
    }

    return await response.json();
  },
};

export default Api;
