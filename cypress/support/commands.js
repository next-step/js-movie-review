Cypress.Commands.add(
  "callMoviePopularList",
  ({ statusCode = 200, body, delay = 0 }) => {
    return cy
      .intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        {
          statusCode,
          delay,
          ...(body ? body : { fixture: "movie-popular.json" }),
        }
      )
      .as("getPopularMovies");
  }
);
