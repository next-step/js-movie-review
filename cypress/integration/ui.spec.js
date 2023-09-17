const getMoreButton = () => cy.get('button.more-button');
const ITEM_NUMBER_PER_PAGE = 20;

describe('영화 목록 불러오기 테스트', () => {
	beforeEach(() => {
		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular.*[?&]page=1(&|$)/,
			},
			{ fixture: 'movie-popular-page1.json' },
		).as('getPopularMoviesPage1');

		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular.*[?&]page=2(&|$)/,
			},
			{ fixture: 'movie-popular-page2.json' },
		).as('getPopularMoviesPage2');

		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular.*[?&]page=3(&|$)/,
			},
			{ fixture: 'movie-popular-last-page.json' },
		).as('getPopularMoviesLastPage');

		cy.visit('http://localhost:8080');
	});

	it('첫 화면 진입시 검색 입력 Input, 더보기 버튼이 렌더링 된다.', () => {
		cy.get('form.search-box').should('be.visible');
		cy.get('input.search-input').should('be.visible');

		getMoreButton().should('be.visible');
	});

	it('첫 화면 진입시 인기영화 1페이지 조회 개수만큼 카드가 렌더링 된다.', () => {
		cy.wait('@getPopularMoviesPage1').then(interception => {
			const movieItemsLength = interception.response.body.results.length;

			cy.get('div.item-card').should('have.length', movieItemsLength);
		});
	});

	it('더보기 버튼을 한번 클릭하면 다음 페이지 조회 개수만큼 카드가 추가된다.', () => {
		getMoreButton().click();

		cy.wait('@getPopularMoviesPage2').then(interception => {
			const nextPageMovieItemsLength = interception.response.body.results.length;

			cy.get('div.item-card').should('have.length', nextPageMovieItemsLength + ITEM_NUMBER_PER_PAGE);
		});
	});

	it('최대 페이지에 도달하면 더보기 버튼이 보이지 않는다.(3페이지)', () => {
		getMoreButton().click();
		getMoreButton().click();

		getMoreButton().should('not.be.visible');
	});
});
