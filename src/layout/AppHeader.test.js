import { AppHeader } from "./AppHeader";

describe("AppHeader 객체를 생성한다", () => {
  test("Header 객체는 isOpen 상태를 가집니다.", () => {
    const element = AppHeader();
    const data = element.querySelector("header");
    expect(data.innerHTML).toBe("true");
    data.click();
    // UI 리렌더링 로직이 필요
    expect(data.innerHTML).toBe("false");
  });
});
