import { mainTitle, mainMoreButton, movieCardsList } from "./index";

export const mainSection = {
  render() {
    const element = document.createElement("section");
    element.classList.add("item-view");

    const title = mainTitle.render();
    const itemList = movieCardsList.render();
    const moreButton = mainMoreButton.render();

    element.append(title, itemList, moreButton);

    return element;
  },
};
