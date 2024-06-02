import { mainItemView } from "./main-item-view";

export const Main = {
  async render() {
    const element = document.createElement("main");

    const itemView = await mainItemView.render();

    element.appendChild(itemView);

    return element;
  },
};
