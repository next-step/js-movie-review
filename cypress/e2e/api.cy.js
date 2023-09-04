describe('API Request', () => {
  it('passes', () => {
    cy.request(
      'GET',
      `${Cypress.env('API_TMDB_BASE_URL')}/movie/popular?api_key=${Cypress.env(
        'API_KEY_TMDB'
      )}`
    ).as('moviePopular');
    cy.get('@moviePopular').its('status').should('eq', 200);
    cy.get('@moviePopular').its('body.results').should('have.length', 20);
  });
});

describe('API Mocking', () => {
  it.only('passes', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      {
        fixture: 'movie-popular.json',
      }
    ).as('getPopularMovies');
    cy.visit('http://localhost:8080');

    cy.wait('@getPopularMovies').then((interception) => {
      const movieItems = interception.response.body.results;
      expect(movieItems.length).to.equal(20);
    });
  });
});
