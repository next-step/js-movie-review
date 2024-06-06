import Movie from "../../src/js/domain/Movie";

describe("영화 기능 테스트", () => {
  it("영화는 썸네일, 제목, 평점으로 이루어져있다.", function () {
    const movie = new Movie({
      title: "테스트",
      rating: 5,
      thumbnail: "test.jpg",
    });

    expect(movie.title).to.equal("테스트");
    expect(movie.rating).to.equal(5);
    expect(movie.thumbnail).to.equal("test.jpg");
  });
});
