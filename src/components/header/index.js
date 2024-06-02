import Logo from "./Logo";
import SearchBar from "./searchBar";

class Header {
  constructor() {
    this.logo = new Logo().element;
    this.SearchBar = new SearchBar().element;
    this.element = this.render();
  }

  render() {
    const header = document.createElement("header");
    header.appendChild(this.logo);
    header.appendChild(this.SearchBar);

    return header;
  }
}

export default Header;
