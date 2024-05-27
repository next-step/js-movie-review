import { makeDom } from "./util";
import cssClass from "../const/css-class";

export default () => {
  const string = `
    <section class="${cssClass["item-view"]}">
      <h2>지금 인기 있는 영화</h2>
    </section>
  `;

  const dom = makeDom("main", string);

  return dom;
};
