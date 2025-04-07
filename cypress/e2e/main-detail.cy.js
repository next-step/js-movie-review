/* eslint-disable no-undef */

import {
  interceptMoviePage1,
  interceptMoviePage2,
  interceptMoviePage3,
} from "../intercept/movie";

import { interceptMovieDetailPage } from "../intercept/movie-detail";
import { interceptMovieSearchPage } from "../intercept/movie-search";
import { interceptMovieTopRatedPage } from "../intercept/movie-top-rated";

describe("App Detail 컴포넌트 - 상세 정보를 본다.", () => {
  beforeEach("사전 준비", () => {
    interceptMoviePage1();
    interceptMoviePage2();
    interceptMoviePage3();

    interceptMovieDetailPage();
    interceptMovieSearchPage();
    interceptMovieTopRatedPage();

    cy.visit("http://localhost:5173");
  });

  it("상세 보기를 위한 카드 하나를 클릭한다", () => {
    cy.get(".item").should("be.visible");
    cy.get(".item").first().click();
  });

  it("상세 보기에서 별점을 매긴다.", () => {
    cy.get(".item").should("be.visible");
    cy.get(".item").first().click();
    cy.get(".star[data-score=8]").first().click();
  });

  it("상세 보기에서 닫고 다시 들어와도 별점이 유지된다다.", () => {
    cy.get(".item").should("be.visible");
    cy.get(".item").first().click();
    cy.get(".star[data-score=8]").first().click();
    cy.get(".close-modal").first().click();
    cy.get(".item").first().click();
    cy.get(".score").should("have.text", "8");
  });
});
