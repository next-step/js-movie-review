describe.only("영화 리뷰 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" },
    ).as("getPopularMovies");

    cy.visit("http://localhost:5173/");
  });

  describe("정적 컴포넌트 렌더 테스트", () => {
    it("footer는 렌더되어야 한다.", () => {
      cy.get("footer")
        .should("be.visible")
        .contains("© NEXTSTEP All Rights Reserved.");
    });
  });

  describe("헤더 컴포넌트 테스트", () => {
    it("영화 목록 첫번째 요소가 헤더가 되어야 한다.", () => {
      cy.wait("@getPopularMovies").then((interception) => {
        const firstMovie = interception.response.body.results[0];
        const title = firstMovie.title;
        const rate = firstMovie.vote_average.toFixed(1);
        const backDrop = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${firstMovie.backdrop_path}`;

        cy.get("header")
          .should("exist")
          .within(() => {
            cy.get(".title").should("have.text", title);
            cy.get(".rate-value").should("have.text", rate);
            cy.get(".overlay")
              .should("have.css", "background-image")
              .and("include", backDrop);
          });
      });
    });
  });

  describe("영화 목록 API 렌더 테스트", () => {
    it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다. ", () => {
      cy.wait("@getPopularMovies").then((interception) => {
        const popularMovies = interception.response.body.results;
        expect(popularMovies.length).to.equal(20);

        const popularMovieItems = cy.get(".thumbnail-list > li");
        expect(popularMovieItems.should("have.length", 20));
      });
    });
  });

  describe("더보기 버튼 테스트", () => {
    it("더보기 버튼을 누르면 영화 목록이 20개씩 추가로 렌더 되어야 한다.", () => {
      const loadMoreButton = cy.get("#load-more-button");
      loadMoreButton.click();

      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20 + 20));
    });

    it("더이상 렌더할 영화가 없으면 더보기 버튼은 사라져야 한다.", () => {
      cy.intercept(
        {
          method: "GET",
          url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
        },
        { fixture: "movie.json" },
      ).as("getOneMovie");

      cy.get("#load-more-button").click();

      cy.get("#load-more-button").should("not.be.visible");
    });
  });
});
