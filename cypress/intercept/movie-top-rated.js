export const interceptMovieTopRatedPage = () => {
    
    cy.intercept(
        {
          method: "GET",
          url: "3/movie/top_rated*",
          hostname: "api.themoviedb.org",
        },
        {
          fixture: "movie-top-rated.json",
        },
      ).as("MovieTopRatedPage");
}
