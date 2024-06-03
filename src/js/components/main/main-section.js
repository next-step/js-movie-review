import { MovieList } from "../../domain/MovieList";
import { mainTitle, mainMoreButton, movieCardsList, skeleton } from "./index";

export const mainSection = {
  async render() {
    const element = document.createElement("section");
    element.classList.add("item-view");

    const title = mainTitle.render();
    const itemList = movieCardsList.render();
    const moreButton = mainMoreButton.render();
    
    element.appendChild(title);
    element.appendChild(itemList);
    element.appendChild(moreButton);

    return element;
  },


};
