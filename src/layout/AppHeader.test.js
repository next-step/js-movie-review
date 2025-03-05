// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom";

import { AppHeader } from "./AppHeader";

describe("AppHeader 객체를 생성한다", () => {
  test("AppHeader 객체는 화면에 렌더링됩니다.", () => {
    const element = AppHeader();
    expect(element).toHaveTextContent("자세히 보기");
  });
});
