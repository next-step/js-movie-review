const context = describe;

describe('영화목록 API 테스트', () => {
  context('인기 영화목록 1페이지를 조회하면', () => {
    it('20개의 목록을 반환한다.', () => {
      const baseUrl = 'https://api.themoviedb.org/3/movie/popular';
      const param = new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: 1,
      });

      cy.intercept(
        {
          method: 'GET',
          url: `${baseUrl}?${param}`,
        },
        { fixture: 'movie-popular.json' }
      ).as('popularMovies');

      cy.visit('http://localhost:8080');

      cy.wait('@popularMovies').then((interception) => {
        const popularMovies = interception.response.body.results;
        expect(popularMovies).to.length(20);

        const popularMoviesItems = cy.get('.item-list > li');
        console.log(popularMoviesItems);
        expect(popularMoviesItems.should('have.length', 20));
      });
    });
  });
});
