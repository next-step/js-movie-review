import { makeDom } from "./util";
import cssClass from "../const/css-class";

const movieContainer = () => {
  const string = `
  <main>
    <section class="${cssClass["item-view"]}">
      <h2>지금 인기 있는 영화</h2>
    </section>
  </main>
  `;

  return makeDom(string);
};

export default movieContainer;
