export const interceptMovieDetailPage = () => {
  // eslint-disable-next-line no-undef
  cy.intercept(
    {
      method: "GET",
      url: /3\/movie\/\d+/,
      hostname: "api.themoviedb.org",
    },
    {
      fixture: "movie-detail.json",
    },
  ).as("MovieDetailPage");
};
