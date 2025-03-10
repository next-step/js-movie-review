describe("영화 목록 조회 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("지금 인기 있는 영화 목록을 조회할 수 있다.", () => {
    cy.get("main > section > h2").should("have.text", "지금 인기 있는 영화");
  });

  it("영화 목록은 20개의 영화를 포함한다.", () => {
    cy.get(".thumbnail-list > li").should("have.length", 20);
  });

  it("영화 목록의 각 아이템은 썸네일이 있어야 한다.", () => {
    cy.get(".thumbnail-list > li > img.thumbnail").should("exist");
  });

  it("영화 목록의 각 아이템은 평점이 있어야 한다.", () => {
    cy.get(".thumbnail-list > li .rate").should("exist");
  });

  it("영화 목록의 각 아이템은 제목이 있어야 한다.", () => {
    cy.get(".thumbnail-list > li .item-title").should("exist");
  });
});

describe("영화 목록 더보기 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.callMoviePopularList({ statusCode: 200 });
  });

  it("더보기 버튼을 누르면 영화 목록 20개가 추가로 로드된다.", () => {
    cy.wait("@getPopularMovies");
    cy.get(".thumbnail-list > li").should("have.length", 20);

    cy.get(".load-button").click();

    cy.get(".thumbnail-list > li").should("have.length", 40);
  });

  it("영화 목록 추가 로드 시 스켈레톤 UI가 표시된다.", () => {
    cy.get(".thumbnail-list > li.skeleton").should("not.exist");
    cy.callMoviePopularList({ statusCode: 200, delay: 500 });

    cy.get(".load-button").click();

    cy.get("li.skeleton").should("have.length", 20);
  });

  it("목록 로딩이 완료되면 스켈레톤 UI가 사라진다.", () => {
    cy.get(".thumbnail-list > li.skeleton").should("not.exist");

    cy.get(".load-button").click();

    cy.wait("@getPopularMovies");
    cy.get(".thumbnail-list > li.skeleton").should("not.exist");
  });
});

describe("영화 목록 더보기 데이터 로드 실패 상황 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");

    cy.callMoviePopularList({ statusCode: 200 });
    cy.wait("@getPopularMovies");

    cy.get(".thumbnail-list > li").should("have.length", 20);

    cy.callMoviePopularList({ statusCode: 400, body: { success: false } });
    cy.get(".load-button").click();
    cy.wait("@getPopularMovies");
  });

  it("영화 목록 추가 로드 실패 시 폴백 UI를 표시한다.", () => {
    cy.get(".thumbnail-list > li").should("have.length", 20);
    cy.get(".fallback-message").should(
      "have.text",
      "데이터를 불러오는데 실패했습니다."
    );
  });

  it("폴백 버튼 클릭 시 영화 목록을 다시 로드한다.", () => {
    cy.callMoviePopularList({ statusCode: 200 });
    cy.get(".fallback-button").click();
    cy.wait("@getPopularMovies");

    cy.get(".thumbnail-list > li").should("have.length", 40);
  });
});
