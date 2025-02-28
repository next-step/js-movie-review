import { AppHeader } from "./AppHeader";

describe("AppHeader 객체를 생성한다", () => {
  test("Header 객체는 isOpen 상태를 가집니다.", () => {
    const element = AppHeader();
    const data = element.querySelector("header");
    console.log(element, data.innerHTML);
    data.click();
    console.log(element, data.innerHTML);
    expect(element).toBe("");
  });
});
