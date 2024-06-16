import { BASE_URL } from '../../src/constants/api';

describe('API 호출 중 에러 발생시 예외처리 테스트', () => {
    it('영화 더 보기 클릭을 500회 초과 했을 경우, 예외처리(TMDB MAX page가 500)', () => {
        cy.visit('http://localhost:8080');

        const popularMovieUrl =
            `${BASE_URL}/3/movie/popular?` +
            new URLSearchParams({
                api_key: Cypress.env('TMDB_API_KEY'),
                language: 'ko-KR',
                page: 501
            }).toString();

        cy.request({
            method: 'GET',
            url: popularMovieUrl,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.equal(400);
            expect(response.body.status_message).to.equal(
                'Invalid page: Pages start at 1 and max at 500. They are expected to be an integer.'
            );
        });
    });

    it('영화 더 보기 클릭 시 네트워크 오류가 발생하면 올바르게 예외처리 된다.', () => {
        cy.intercept('GET', `${BASE_URL}/3/movie/popular*`, { fixture: 'movieList.json' }).as('getPopularMovies');

        cy.visit('http://localhost:8080');

        cy.wait('@getPopularMovies');

        cy.intercept('GET', `${BASE_URL}/3/movie/popular*`, { forceNetworkError: true }).as('getNetworkError');

        cy.get('#more-movies').click();

        cy.wait('@getNetworkError');

        cy.get('.modal').should('be.visible');

        cy.get('.modal-content').should('be.visible');
    });
});
