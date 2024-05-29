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

  getMovies: async function (page) {
    const url = this.generateUrl(page);

    const response = await fetch(url);
    return await response.json();
  },
};

export default Api;
