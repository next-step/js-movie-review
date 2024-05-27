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

    it('검색란에 원하는 단어를 입력하고 검색 버튼을 누르면 해당 결과가 나온다.', () => {
        cy.get('#search-input').type('고질라');
        cy.get('.search-button').click();
        cy.get('.item-list li').should('exist');
    });

    it('검색란에 원하는 단어를 입력하고 엔터키를 누르면 검색 결과가 나온다.', () => {
        cy.get('#search-input').type('고질라').type('{enter}');
        cy.get('.item-list li').should('exist');
    });

    it('검색란에 원하는 단어를 누르고 엔터키를 눌렀을떄, 결과가 없을 경우도 있다.', () => {
        cy.get('#search-input').type('@@@@').type('{enter}');
        cy.get('.item-list li').should('have.length', 0);
    });
});
