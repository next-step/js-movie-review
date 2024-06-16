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

    it('더보기 버튼 클릭 시, 결과값이 없으면 더보기 버튼을 삭제한다.', () => {
        cy.visit('http://localhost:8080');

        cy.get('#search-input').type('혹성');

        cy.get('.search-button').click();
        cy.get('#more-movies').click();

        cy.get('#more-movies').should('not.exist');
    });

    it('더보기 버튼 클릭 시, 결과값이 없으면 모달창을 띄워 사용자에게 알려준다.', () => {
        cy.visit('http://localhost:8080');

        cy.get('#search-input').type('혹성');

        cy.get('.search-button').click();
        cy.get('#more-movies').click();

        cy.get('.modal').should('be.visible');

        cy.contains('.modal-content', '더이상 영화가 존재하지 않습니다.');
    });

});
