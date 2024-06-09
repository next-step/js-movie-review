import { makeDom } from "./util";
import cssClass from "../const/css-class";

const list = () => {
  const ul = document.querySelector("ul");
  const dom = ul ? ul : makeDom(`<ul class="${cssClass["item-list"]}"/>`);

  return dom;
};
export default list;
