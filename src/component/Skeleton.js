import { makeDom } from "./util";

const skeleton = () => {
  const dom = makeDom(
    `<li class="skeleton-li">
      <a href="#">
        <div class="item-card">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>`
  );

  return dom;
};
export default skeleton;
