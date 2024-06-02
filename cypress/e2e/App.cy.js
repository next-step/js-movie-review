import Api from "../../src/js/domain/Api";
import App from "../../src/js/domain/App";
import MovieList from "../../src/js/domain/MovieList";

describe("앱 기능 테스트", async () => {
  it("앱 초기화시 영화 목록의 첫번째 페이지를 비동기 통신(TMDB 인기순 api)으로 불러온다.", async () => {
    const app = new App();
    const movieList = new MovieList();

    await app.init(movieList);

    expect(movieList.movies).to.have.length(Api.NUM_MOVIES_PER_PAGE);
  });

  it("첫번째 페이지의 영화 목록을 모두 불러온 상태일때 두번째 페이지의 영화 목록을 불러오면, currentPage와 movies 가 갱신된다.", async () => {
    const nextPage = 2;
    const app = new App();
    const movieList = new MovieList();

    // 첫번째 페이지의 영화 목록을 불러온다.
    await app.init(movieList);

    // 두번째 페이지의 영화 목록을 불러온다.
    await app.fetchNextPage(movieList);

    expect(app.currentPage).to.equal(nextPage);
    expect(movieList.movies).to.have.length(Api.NUM_MOVIES_PER_PAGE * nextPage);
  });
});
