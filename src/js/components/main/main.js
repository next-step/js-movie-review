import { mainSection } from "./main-section";

export const Main = {
  async render() {
    const element = document.createElement("main");

    const itemView = await mainSection.render();

    element.appendChild(itemView);

    return element;
  },
};
