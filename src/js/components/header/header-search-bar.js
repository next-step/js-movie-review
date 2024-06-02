export const headerSearchBar = {
  render() {
    const element = document.createElement("div");
    element.classList.add("search-box");

    element.innerHTML = /*html */ `
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    `;
    return element;
  },
};
