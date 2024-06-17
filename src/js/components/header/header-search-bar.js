export const headerSearchBar = {
  render() {
    const element = document.createElement("div");
    element.classList.add("search-box");

    element.insertAdjacentHTML(
      "afterbegin",
      /*html */ `
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    `
    );
    return element;
  },
};
