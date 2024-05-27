const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3//movie/popular';

context('영화 관련 테스팅', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
        cy.get('.item-list li').should('have.length', 20);
    });

    it('더보기 버튼 클릭 시, 현재 영화정보를 유지하고 새로운 영화 20개가 추가된다.', () => {
        cy.get('[data-testid="cypress-more-button"]').should('exist').click();
        cy.get('.item-list li').should('have.length', 40);
    });

    it('500개번 초과로 호출할 경우, return 값으로 success === false가 호출된다.', () => {
        const popularMovieUrl =
            POPULAR_MOVIES_URL +
            '?' +
            new URLSearchParams({
                api_key: Cypress.env('API_KEY'),
                language: 'ko-KR',
                page: 2000000
            });

        cy.request({
            method: 'GET',
            url: popularMovieUrl,
            failOnStatusCode: false
        }).as('popularMovies');

        cy.get('@popularMovies').its('body.success').should('eq', false);
    });
});
