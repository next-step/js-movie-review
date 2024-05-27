import { makeDom } from "./util";

export default ({ onClick }) => {
  const { dom } = makeDom("button");
  dom.classList.add("btn");
  dom.classList.add("primary");
  dom.classList.add("full-width");
  dom.textContent = "더 보기";

  dom.addEventListener("click", onClick);

  return { dom };
};
