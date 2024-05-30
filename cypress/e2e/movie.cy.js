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

describe('영화목록 e2e 테스트', () => {
  beforeEach(() => {
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
  });

  context('영화 목록 조회 시', () => {
    it('800ms 동안 Skeleton UI가 노출되었다가 사라진다.', () => {
      cy.wait('@popularMovies');
      cy.get('.skeleton').should('have.length', 60);
      cy.wait(800);
      cy.get('.skeleton').should('have.length', 0);
    });
  });

  context('페이지 진입 시 인기영화 목록 1페이지를 조회하면', () => {
    it('20개의 .item-card가 노출된다.', () => {
      cy.get('.item-card').should('have.length', 20);
    });
  });

  context('더보기 버튼을 클릭하면', () => {
    it('40개의 item-card 노출된다.', () => {
      cy.get('.btn').click();
      cy.get('.item-card').should('have.length', 40);
    });
  });
});
