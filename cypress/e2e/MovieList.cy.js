describe('영화 관련 테스팅', () => {
    it('영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
        cy.intercept(
            {
                method: 'GET',
                url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/
            },
            { fixture: 'movieList.json' }
        ).as('getPopularMovies');

        cy.visit('http://localhost:8080');
        cy.wait('@getPopularMovies').then((interception) => {
            const popularMovies = interception.response.body.results;
            expect(popularMovies.length).to.equal(20);

            // 제대로 렌더링이 되었는지 테스트하는 코드 샘플
            const popularMovieItems = cy.get('.item-list > li');
            expect(popularMovieItems.should('have.length', 20));
        });
    });

    it('영화 목록 API 호출 시, 네트워크 지연시간동안 스켈레톤을 보이도록 한다.', () => {
        cy.intercept(
            {
                method: 'GET',
                url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/
            },
            (req) => {
                req.on('response', (res) => {
                    res.setDelay(2000);
                });
            }
        ).as('getPopularMoviesWithDelay');

        cy.visit('http://localhost:8080');

        cy.get('.skeleton').should('be.visible');
        cy.wait('@getPopularMoviesWithDelay');
        cy.get('.skeleton').should('not.exist');
        cy.get('.item-list > li').should('have.length', 20);
    });

    it('홈 화면에서 더보기 버튼을 클릭 시, 영화 리스트 20개가 추가된다.', () => {
        cy.intercept(
            {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/popular*',
                query: {
                    api_key: Cypress.env('TMDB_API_KEY'),
                    page: '1',
                    language: 'ko-KR'
                }
            },
            { fixture: 'movieList.json' }
        ).as('getPopularMoviesPage1');

        cy.visit('http://localhost:8080');
        cy.wait('@getPopularMoviesPage1');
        cy.get('.item-list > li').should('have.length', 20);

        cy.intercept(
            {
                method: 'GET',
                url: 'https://api.themoviedb.org/3/movie/popular*',
                query: {
                    api_key: Cypress.env('TMDB_API_KEY'),
                    page: '2',
                    language: 'ko-KR'
                }
            },
            { fixture: 'movieList2.json' }
        ).as('getPopularMoviesPage2');

        cy.get('#more-movies').click();

        cy.wait('@getPopularMoviesPage2');

        cy.get('.item-list > li').should('have.length', 40);
    });
});
