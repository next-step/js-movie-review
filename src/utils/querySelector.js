const $ = (target) => {
  try {
    if (typeof target !== "string") {
      throw new Error("문자열이 아닙니다.");
    }
    const element = document.querySelector(target);
    if (!element) {
      throw new Error("해당 요소를 찾을 수 없습니다.");
    }
    return element;
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const $$ = (target) => {
  try {
    if (typeof target !== "string") {
      console.error("문자열이 아닙니다.");
    }
    const elements = document.querySelectorAll(target);
    if (elements.length === 0) {
      console.error("해당 요소를 찾을 수 없습니다.");
    }
    return [...elements];
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

export { $, $$ };
