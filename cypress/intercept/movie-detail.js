
export const interceptMovieDetailPage = () => {

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
}