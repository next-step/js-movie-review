/* eslint-disable no-undef */

import {
  interceptMoviePage1,
  interceptMoviePage2,
  interceptMoviePage3,
} from '../intercept/movie'

import {
  interceptMovieDetailPage
} from '../intercept/movie-detail'
import {
  interceptMovieSearchPage
} from '../intercept/movie-search'
import {
  interceptMovieTopRatedPage
} from '../intercept/movie-top-rated'

describe("UI 컴포넌트를 테스트한다.", () => {
  beforeEach("main", () => {

    interceptMoviePage1();
    interceptMoviePage2();
    interceptMoviePage3();

    interceptMovieDetailPage();
    interceptMovieSearchPage();
    interceptMovieTopRatedPage();

    cy.visit("http://localhost:5173");
  });

  it("Main - 무한 스크롤 초기 렌더링", () => {
    
    cy.get('.item').should('have.length.greaterThan', 0);

  });

  it("Main - 무한 스크롤 2번 렌더링", () => {
    
    let previousContentCount;
    
    cy.get('.item').then(($items) => {

      previousContentCount = $items.length;

    });

    cy.scrollTo('bottom'); 
    cy.wait(1000); 

    cy.get('.item').should(($items) => {

      expect($items.length).to.be.greaterThan(previousContentCount); // 로드된 콘텐츠 항목 수가 증가했는지 확인
    
    });

  });
});
