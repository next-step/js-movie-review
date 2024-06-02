import { headerLogo, headerSearch } from "./index";

export const Header = {
  render() {
    const element = document.createElement("header");

    const logo = headerLogo.render();
    const search = headerSearch.render();

    element.appendChild(logo);
    element.appendChild(search);

    return element;
  },
};
