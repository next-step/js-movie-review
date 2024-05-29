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

      cy.request('GET', `${baseUrl}?${param}`).as('popularMovies');

      cy.get('@popularMovies').its('status').should('eq', 200);
      cy.get('@popularMovies').its('body.results').should('have.length', 20);
    });
  });
});
