import { headerLogo, headerSearchBar } from "./index";

export const Header = {
  render() {
    const element = document.createElement("header");

    const logo = headerLogo.render();
    const searchBar = headerSearchBar.render();

    element.appendChild(logo);
    element.appendChild(searchBar);

    return element;
  },
};
