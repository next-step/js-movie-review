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

describe("App Main 컴포넌트 - Search 결과를 테스트한다.", () => {
  beforeEach("main", () => {

    interceptMoviePage1();
    interceptMoviePage2();
    interceptMoviePage3();

    interceptMovieDetailPage();
    interceptMovieSearchPage();
    interceptMovieTopRatedPage();

    cy.visit("http://localhost:5173");
  });

  it("Search - 검색 결과를 출력한다", () => {

    cy.get(".search").type("더{enter}");
    cy.get(".thumbnail-list").find("li").should("have.length", 2);
  
  });

});
