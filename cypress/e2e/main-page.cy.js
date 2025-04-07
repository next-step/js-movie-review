/* eslint-disable no-undef */

import {
  interceptMoviePage1,
  interceptMoviePage2,
  interceptMoviePage3,
} from "../intercept/movie";

import { interceptMovieDetailPage } from "../intercept/movie-detail";
import { interceptMovieSearchPage } from "../intercept/movie-search";
import { interceptMovieTopRatedPage } from "../intercept/movie-top-rated";

describe("App Main 컴포넌트를 테스트한다.", () => {
  beforeEach("main", () => {
    interceptMoviePage1();
    interceptMoviePage2();
    interceptMoviePage3();

    interceptMovieDetailPage();
    interceptMovieSearchPage();
    interceptMovieTopRatedPage();

    cy.visit("http://localhost:5173");
  });

  it("App Header - 컴포넌트 초반 렌더링", () => {
    cy.get("header").should("contains.text", "자세히 보기");
    cy.get("header .logo").should("exist");
  });

  it("App Main - Thumbnail list가 처음에 20개 나와야 한다.", () => {
    cy.get(".thumbnail-list").find("li").should("have.length", 20);
  });
});
