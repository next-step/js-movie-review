const ITEM_NUMBER_PER_PAGE = 20;
const ELEMENT = Object.freeze({
	MORE_BUTTON: () => cy.get('button.more-button'),
	SEARCH_INPUT: () => cy.get('input.search-input'),
	SEARCH_BUTTON: () => cy.get('button.search-button'),
	CARD: () => cy.get('div.movie-card'),
});
const TEST_QUERY = 'next';

beforeEach(() => {
	cy.intercept(
		{
			method: 'GET',
			url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?(?=.*page=1)(?=.*language=ko-KR).*$/i,
		},
		{ fixture: 'movie-popular-page1.json' },
	).as('getPopularMoviesPage1');
});

describe('영화 목록 불러오기 테스트', () => {
	beforeEach(() => {
		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?(?=.*page=2)(?=.*language=ko-KR).*$/i,
			},
			{ fixture: 'movie-popular-page2.json' },
		).as('getPopularMoviesPage2');

		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?(?=.*page=3)(?=.*language=ko-KR).*$/i,
			},
			{ fixture: 'movie-popular-last-page.json' },
		).as('getPopularMoviesLastPage');

		cy.visit('http://localhost:8080');
	});

	it('첫 화면 진입시 검색 입력 Input, 더보기 버튼이 렌더링 된다.', () => {
		cy.get('form.search-box').should('be.visible');
		ELEMENT.SEARCH_INPUT().should('be.visible');

		ELEMENT.MORE_BUTTON().should('be.visible');
	});

	it('첫 화면 진입시 인기영화 1페이지 조회 개수만큼 카드가 렌더링 된다.', () => {
		cy.wait('@getPopularMoviesPage1').then(interception => {
			const movieItemsLength = interception.response.body.results.length;

			ELEMENT.CARD().should('have.length', movieItemsLength);
		});
	});

	it('더보기 버튼을 한번 클릭하면 다음 페이지 조회 개수만큼 카드가 추가된다.', () => {
		ELEMENT.MORE_BUTTON().click();

		cy.wait('@getPopularMoviesPage2').then(interception => {
			const nextPageMovieItemsLength = interception.response.body.results.length;

			ELEMENT.CARD().should('have.length', nextPageMovieItemsLength + ITEM_NUMBER_PER_PAGE);
		});
	});

	it('최대 페이지에 도달하면 더보기 버튼이 보이지 않는다.(3페이지)', () => {
		ELEMENT.MORE_BUTTON().click();
		ELEMENT.MORE_BUTTON().click();

		ELEMENT.MORE_BUTTON().should('not.be.visible');
	});
});

describe('영화 검색 테스트', () => {
	beforeEach(() => {
		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?(?=.*page=1)(?=.*language=ko-KR)(?=.*query=next).*$/i,
			},
			{ fixture: 'search-movie-page1.json' },
		).as('getSearchMoviePage1');

		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?(?=.*page=2)(?=.*language=ko-KR)(?=.*query=next).*$/i,
			},
			{ fixture: 'search-movie-page2.json' },
		).as('getSearchMoviePage2');

		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?(?=.*page=3)(?=.*language=ko-KR)(?=.*query=next).*$/i,
			},
			{ fixture: 'search-movie-last-page.json' },
		).as('getSearchMovieLastPage');

		cy.visit('http://localhost:8080');
	});

	it(`검색창에 "${TEST_QUERY}"를 입력 후 검색 버튼 클릭시 검색 개수만큼 카드가 렌더링 된다.`, () => {
		ELEMENT.SEARCH_INPUT().type(TEST_QUERY);
		ELEMENT.SEARCH_BUTTON().click();

		cy.wait('@getSearchMoviePage1').then(interception => {
			const searchMovieItemsLength = interception.response.body.results.length;

			ELEMENT.CARD().should('have.length', searchMovieItemsLength);
		});
	});

	it(`"${TEST_QUERY}"검색 후 더보기 버튼을 클릭하면 다음 페이지 조회 수 만큼 카드가 추가된다.`, () => {
		ELEMENT.SEARCH_INPUT().type(TEST_QUERY);
		ELEMENT.SEARCH_BUTTON().click();
		ELEMENT.MORE_BUTTON().click();

		cy.wait('@getSearchMoviePage2').then(interception => {
			const searchMovieNextPageItemsLength = interception.response.body.results.length;

			ELEMENT.CARD().should('have.length', ITEM_NUMBER_PER_PAGE + searchMovieNextPageItemsLength);
		});
	});

	it(`"${TEST_QUERY}"검색 후 최대 페이지에 도달하면 더보기 버튼이 보이지 않는다.(3페이지)`, () => {
		ELEMENT.SEARCH_INPUT().type(TEST_QUERY);
		ELEMENT.SEARCH_BUTTON().click();
		ELEMENT.MORE_BUTTON().click();
		ELEMENT.MORE_BUTTON().click();

		ELEMENT.MORE_BUTTON().should('not.be.visible');
	});
});
