describe('검색 관련된 내용 추가', () => {
    it('검색을 했을때 입력한 내용의 결과값이 나온다', () => {
        cy.visit('http://localhost:8080');

        cy.intercept('GET', '**/3/search/movie**', (req) => {
            if (req.url.includes('query=혹성')) {
                req.reply({ fixture: 'Search.json' });
            }
        }).as('getSearchMovies');

        cy.get('#search-input').type('혹성');

        cy.get('.search-button').click();

        cy.wait('@getSearchMovies');

        cy.get('.item-list > li').should('be.visible');
    });

    it('검색을 했을 때, 검색 키워드가 title에 적힌다.', () => {
        cy.visit('http://localhost:8080');

        cy.intercept('GET', '**/3/search/movie**', (req) => {
            if (req.url.includes('query=혹성')) {
                req.reply({ fixture: 'Search.json' });
            }
        }).as('getSearchMovies');

        cy.get('#search-input').type('혹성');

        cy.get('.search-button').click();

        cy.wait('@getSearchMovies');

        cy.get('.item-view h2').should('contain.text', '"혹성" 검색 결과');
    });
});
