import { mainSection } from "./main-section";

export const Main = {
  render() {
    const element = document.createElement("main");

    const itemView = mainSection.render();

    element.appendChild(itemView);

    return element;
  },
};
