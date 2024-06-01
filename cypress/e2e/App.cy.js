import Api from "../../src/js/domain/Api";
import App from "../../src/js/domain/App";

describe("앱 기능 테스트", async () => {
  it("앱 초기화시 영화 목록의 첫번째 페이지를 비동기 통신(TMDB 인기순 api)으로 불러온다.", async () => {
    const app = new App();

    await app.init();

    expect(app.movieList.movies).to.have.length(Api.NUM_MOVIES_PER_PAGE);
  });

  it("다음 페이지의 영화 목록을 불러오고, 현재 페이지 정보를 갱신한다.", async () => {
    const nextPage = 2;
    const app = new App();
    await app.init();

    await app.fetchNextPage();

    expect(app.currentPage).to.equal(nextPage);
    expect(app.movieList.movies).to.have.length(
      Api.NUM_MOVIES_PER_PAGE * nextPage
    );
  });
});
