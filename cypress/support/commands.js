Cypress.Commands.add('interceptMovieRequest', () => {
  cy.fixture('movies.json').then((movies) => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      (req) => {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get('page') || '1');

        req.reply({
          statusCode: 200,
          delay: 1000,
          body: movies[page - 1] || {},
        });
      }
    ).as('getPopularMovies');
  });
});

Cypress.Commands.add('goToNextPage', (count = 1) => {
  for (let i = 0; i < count; i += 1) {
    cy.contains('더 보기').click();
  }
});
