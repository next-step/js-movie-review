export const interceptMovieSearchPage = () => {
  // eslint-disable-next-line no-undef
  cy.intercept(
    {
      method: "GET",
      url: "3/search/movie*",
      hostname: "api.themoviedb.org",
    },
    {
      fixture: "movie-search-1-page.json",
    },
  ).as("MovieSearchPage");
};
