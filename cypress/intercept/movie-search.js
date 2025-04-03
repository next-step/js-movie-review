export const interceptMovieSearchPage = () => {

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

}