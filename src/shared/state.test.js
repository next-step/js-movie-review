import { state } from "./state";

describe("상태 테스트", () => {
  test("상태는 초기값을 가져야 한다.", () => {
    const newState = state("a");

    expect(newState).toHaveProperty("value");
    expect(newState.value).toBe("a");
  });
  test("상태가 변경되었을 때 값을 가져야 한다.", () => {
    const newState = state("a");

    expect(newState.value).toBe("a");

    newState.value = "b";
    expect(newState.value).toBe("b");
  });
  test("상태가 정의된 프로퍼티가 아닌 다른 방법으로 변경되었을 때 에러를 발생해야 한다.", () => {
    const newState = state("a");

    expect(newState.value).toBe("a");

    expect(() => {
      newState.value1 = "b";
    }).toThrow();
  });
});
