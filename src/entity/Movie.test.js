import Movie from "./Movie";

describe("movie 객체를 생성한다", () => {
  test("movie 객체는 name 프로퍼티를 가진다.", () => {
    const { name } = Movie({
      name: "",
    });
    expect(name).toBe("");
  });
});
