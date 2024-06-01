import ErrorMessage from "../ErrorMessage.js";

const Api = {
  BASE_URL: "https://api.themoviedb.org/3/movie/popular",

  API_KEY: window.Cypress
    ? Cypress.env("TMDB_API_KEY")
    : process.env.TMDB_API_KEY,

  NUM_MOVIES_PER_PAGE: 20,

  generateUrl: function (page) {
    const param = new URLSearchParams({
      api_key: this.API_KEY,
      language: "ko-KR",
      page,
    });

    return `${this.BASE_URL}?${param}`;
  },

  throwError: function (status) {
    switch (status) {
      case 401:
        throw new Error(ErrorMessage.NOT_VALID_API_KEY);
      case 404:
        throw new Error(ErrorMessage.NOT_VALID_URL);
      default:
        throw new Error(ErrorMessage.DEFAULT);
    }
  },

  get: async function (url) {
    const response = await fetch(url);

    if (!response.ok) {
      this.throwError(response.status);
    }

    return await response.json();
  },
};

export default Api;
