import { $ } from "../../utils/querySelector";
import { Logo } from "./Logo";
import SearchBar from "./searchBar";

class Header {
  constructor() {
    this.logo = new Logo().render();
    this.SearchBar = new SearchBar().render();
  }

  render(selecter) {
    const header = document.createElement("header");
    header.appendChild(this.logo);
    header.appendChild(this.SearchBar);
    $(selecter).appendChild(header);
  }
}

export default Header;
