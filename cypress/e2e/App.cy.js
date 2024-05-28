import App from "../../src/js/domain/App";
import MovieList from "../../src/js/domain/MovieList";

describe("앱 기능 테스트", async () => {
  it("앱 초기화시 영화 목록의 첫번째 페이지를 비동기 통신(TMDB 인기순 api)으로 불러온다.", async () => {
    // given
    const app = new App();

    // when
    await app.init();

    // then
    expect(app.movies).to.have.length(MovieList.MOVIES_PER_PAGE);
  });

  it("다음 페이지의 영화 목록을 불러오고, 현재 페이지 정보를 갱신한다.", async () => {
    // given
    const nextPage = 2;
    const app = new App();
    await app.init();

    // when
    await app.fetchNextPage();

    // then
    expect(app.currentPage).to.equal(nextPage);
    expect(app.movies).to.have.length(MovieList.MOVIES_PER_PAGE * nextPage);
  });
});
