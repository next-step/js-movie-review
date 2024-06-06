class SearchBar {
  constructor() {
    this.element = this.element();
  }

  element() {
    const div = document.createElement("div");
    div.classList.add("search-box");

    const input = document.createElement("input");
    const button = document.createElement("button");
    input.type = "text";
    input.placeholder = "검색";

    button.textContent = "검색";
    button.classList.add("search-button");

    div.appendChild(input);
    div.appendChild(button);

    return div;
  }
}

export default SearchBar;
