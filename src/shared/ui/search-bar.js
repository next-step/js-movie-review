import { searchIcon } from "src/shared/icons/searchIcon";

export const createSearchBar = ({
  placeholder = "검색어를 입력하세요",
  onSubmit = () => {},
  onChange = () => {},
} = {}) => {
  const searchBar = document.createElement("div");
  searchBar.classList.add("search");

  searchBar.innerHTML = /*html*/ `
    <form>
      <input type="text" placeholder="${placeholder}" />
      <button type="submit" class="search-button"></button>
    </form>
  `;

  searchBar.querySelector("input").addEventListener("input", onChange);
  searchBar.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    onSubmit(event);
  });

  searchBar.querySelector(".search-button").appendChild(searchIcon(16, 16));

  return searchBar;
};
