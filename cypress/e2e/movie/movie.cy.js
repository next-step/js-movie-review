const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3//movie/popular';

context('영화 정보 호출 관련한 테스팅', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
        const popularMovieUrl =
            POPULAR_MOVIES_URL +
            '?' +
            new URLSearchParams({
                api_key: Cypress.env('API_KEY'),
                language: 'ko-KR',
                page: 1
            });

        cy.request('GET', popularMovieUrl).as('popularMovies');

        cy.get('@popularMovies').its('status').should('eq', 200);
        cy.get('@popularMovies').its('body.results').should('have.length', 20);
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

    it('더보기 버튼 클릭 시, 현재 영화정보를 유지하고 새로운 영화 20개가 추가된다.', () => {
        cy.get('[data-testid="cypress-more-button"]').should('exist').click();
        cy.get('.item-list li').should('have.length', 40);
    });
});

context('UI 상태 관련된 테스팅', () => {
    it('새로운 영화 정보에 대한 페이지가 500을 초과했을 경우, 더보기 버튼을 숨긴다', () => {});

    it('에러가 발생했을 경우, Modal에 대한 상태값을 hidden->block으로 변경한다.', () => {});

    it('모달이 띄워졌을 때, close 버튼을 누를 경우 모달의 상태가 block->hidden으로 변경된다.', () => {});
});

context('에러가 발생했을 경우에 관한 테스팅', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080');
    });

    it('잘못된 url을 입력했을 경우, 유저에게 에러 메세지를 보여준다.', () => {});

    it('새로운 페이지가 500이 초과했을 경우, 유저에게 에러 메세지를 보여준다.', () => {});
});
