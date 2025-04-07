export const interceptMoviePage1 = () => {
  // eslint-disable-next-line no-undef
  cy.intercept(
    {
      method: "GET",
      url: "3/movie/popular?language=ko-KR&page=1",
      hostname: "api.themoviedb.org",
    },
    {
      fixture: "movie-popular-1-page.json",
    },
  ).as("MoviePage1");
};

export const interceptMoviePage2 = () => {
  // eslint-disable-next-line no-undef
  cy.intercept(
    {
      method: "GET",
      url: "3/movie/popular?language=ko-KR&page=2",
      hostname: "api.themoviedb.org",
    },
    {
      fixture: "movie-popular-2-page.json",
    },
  ).as("MoviePage2");
};

export const interceptMoviePage3 = () => {
  // eslint-disable-next-line no-undef
  cy.intercept(
    {
      method: "GET",
      url: "3/movie/popular?language=ko-KR&page=3",
      hostname: "api.themoviedb.org",
    },
    {
      fixture: "movie-popular-3-page.json",
    },
  ).as("MoviePage3");
};
