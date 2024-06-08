import { makeDom } from "./util";

const footer = ({ onClick }) => {
  const dom = makeDom(
    `<button class="btn primary full-width">더 보기</button>`
  );

  dom.dom.addEventListener("click", onClick);

  return dom;
};
export default footer;
