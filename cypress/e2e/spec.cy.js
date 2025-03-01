describe('영화 리뷰 시나리오 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/discover\/movie*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('getPopularMovies');

    cy.visit('http://localhost:5173');
  });

  it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      cy.get('.thumbnail-list > li').should('have.length', 20);
    });
  });

  it('더 보기 버튼을 누르면 다음 페이지(2)로 이동한다', () => {
    cy.get('#movie_more_load').click();

    cy.url().should('include', 'page=2');
  });

  it('마지막 페이지(500)로 이동했을 때, "더 보기" 버튼은 보여지면 안된다.', () => {
    cy.visit('http://localhost:5173/?page=500');
    cy.get('#movie_more_load').should('not.exist');
  });
});
