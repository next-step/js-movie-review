describe('영화 목록 불러오기', () => {
  beforeEach(() => {
    cy.interceptMovieRequest();
    cy.visit('http://localhost:8080/');
  });

  it('페이지 진입시 스켈레톤 UI가 나타난다.', () => {
    cy.get('[data-cy="movie-skeleton"]').should('exist');
    cy.get('[data-cy="movie-skeleton"]').should('have.length', 20);
  });

  it('로딩이 종료될시 스켈레톤 UI가 사라진다.', () => {
    cy.wait('@getPopularMovies');

    cy.get('[data-cy="movie-skeleton"]').should('not.exist');
  });

  it('로딩이 종료될시 영화 목록과 "더 보기" 버튼이 나타난다.', () => {
    cy.wait('@getPopularMovies');

    cy.contains('더 보기').should('exist');
    cy.get('[data-cy="movie-item"]').should('exist');
    cy.get('[data-cy="movie-item"]').should('have.length', 20);
  });

  it('더 보기를 누를시 다음 페이지가 나타난다.', () => {
    cy.wait('@getPopularMovies');

    cy.goToNextPage();

    cy.contains('더 보기').should('not.exist');
    cy.get('[data-cy="movie-skeleton"]').should('exist');
    cy.get('[data-cy="movie-skeleton"]').should('have.length', 20);

    cy.wait('@getPopularMovies');

    cy.contains('더 보기').should('exist');
    cy.get('[data-cy="movie-skeleton"]').should('not.exist');
    cy.get('[data-cy="movie-item"]').should('exist');
    cy.get('[data-cy="movie-item"]').should('have.length', 40);
  });

  it('통신 과정에서 에러가 발생할 시 에러 문구가 나타난다.', () => {
    cy.goToNextPage(5);

    cy.get('[data-cy="request-error"]').should('exist');
  });
});
