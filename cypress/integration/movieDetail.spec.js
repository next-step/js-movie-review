const ELEMENT = Object.freeze({
	CARD_THUMBNAIL: () => cy.get('img.item-thumbnail'),
	MODAL_TITLE: () => cy.get('div.modal-title'),
	MODAL_GENRE: () => cy.get('div.modal-item-genre'),
	MODAL_VOTE: () => cy.get('div.modal-item-vote'),
	MODAL_DESCRIPTION: () => cy.get('div.modal-item-detail'),
	MODAL_CLOSE: () => cy.get('div.modal-close'),
	MODAL_IMG: () => cy.get('img.modal-item-poster'),
	MODAL: () => cy.get('div.modal'),
});

describe('영화 카드 클릭 동작 테스트', () => {
	beforeEach(() => {
		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?(?=.*page=1)(?=.*language=ko-KR).*$/i,
			},
			{ fixture: 'movie-popular-page1.json' },
		).as('getPopularMoviesPage1');

		cy.intercept(
			{
				method: 'GET',
				url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/385687\?(?=.*language=ko-KR).*$/i,
			},
			{ fixture: 'movie-detail.json' },
		).as('getMovieDetail');

		cy.visit('http://localhost:8080');

		ELEMENT.CARD_THUMBNAIL().first().click();
	});

	it('영화 카드의 이미지 클릭시 모달이 화면에 보인다.', () => {
		ELEMENT.MODAL().should('be.visible');
	});

	it('모달의 x 버튼을 클릭하면 모달이 닫힌다.', () => {
		ELEMENT.MODAL_CLOSE().click();

		ELEMENT.MODAL().should('not.be.visible');
	});

	it('esc 키를 누르면 모달이 닫힌다.', () => {
		cy.get('body').type('{esc}');

		ELEMENT.MODAL().should('not.be.visible');
	});

	it('모달 안의 내용은 detail api의 응답과 일치한다.', () => {
		cy.wait('@getMovieDetail').then(interception => {
			const title = interception.response.body.title;
			const genre = interception.response.body.genres.map(genre => genre.name).join(', ');
			const vote = interception.response.body['vote_average'].toFixed(1);
			const description = interception.response.body.overview;
			const posterPath = interception.response.body['poster_path'];

			ELEMENT.MODAL_TITLE().should('have.text', title);
			ELEMENT.MODAL_GENRE().should('have.text', genre);
			ELEMENT.MODAL_VOTE().should('have.text', vote);
			ELEMENT.MODAL_DESCRIPTION().should('have.text', description);
			ELEMENT.MODAL_IMG().then($img => {
				expect($img.attr('src')).to.contain(posterPath);
			});
		});
	});
});
