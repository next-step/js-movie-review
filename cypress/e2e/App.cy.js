import App from "../../src/js/domain/App";

describe("앱 기능 테스트", async () => {
  it("앱 초기화시 영화 목록의 첫번째 페이지를 비동기 통신(TMDB 인기순 api)으로 불러온다.", async () => {
    // given
    const app = new App();

    // when
    await app.init();

    // then
    expect(app.movies).to.have.length(20);
  });
});
