import MovieList from "../../src/js/domain/MovieList";

describe("영화 목록 기능 테스트", () => {
  it("영화 목록 API를 호출하면 20개씩 목록에 나타나야 한다.", () => {
    const baseUrl = "https://api.themoviedb.org/3/movie/popular";
    const param = new URLSearchParams({
      api_key: Cypress.env("TMDB_API_KEY"),
      language: "ko-KR",
      page: 1,
    });
    cy.request(`${baseUrl}?${param}`).as("movies");
    cy.get("@movies").its("status").should("eq", 200);
    cy.get("@movies").its("body.results").should("have.length", 20);
  });

  it("영화 목록 API를 호출하고 응답값을 저장한다.", async () => {
    // given
    const currentPage = 1;
    const apiKey = Cypress.env("TMDB_API_KEY");
    const movieList = new MovieList();

    // when
    await movieList.fetchMovies(currentPage, apiKey);

    // then
    expect(movieList.movies).to.have.length(20);
  });
});
