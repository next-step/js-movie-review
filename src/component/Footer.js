import { makeDom } from "./util";

const Footer = ({ onClick }) => {
  const dom = makeDom(
    `<button class="btn primary full-width">더 보기</button>`
  );

  dom.addEventListener("click", onClick);

  return dom;
};
export default Footer;
