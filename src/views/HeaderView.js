import logo from "../assets/logo.png";

export class HeaderView {
  constructor(movieInstance) {
    this.movieInstance = movieInstance;
    this.setup();
    this.searchButtonElement = document.querySelector(".search-button");
    this.searchInputElement = document.querySelector(".search-box input");

    const onSearch = async () => {
      const query = this.searchInputElement.value.trim();
      this.movieInstance.setSearchQuery(query);
      await this.movieInstance.loadMore();
    };

    this.searchButtonElement.addEventListener("click", onSearch);

    this.searchInputElement.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        onSearch();
      }
    });
  }

  setup() {
    const headerElement = document.createElement("header");
    headerElement.innerHTML = /*html */ `
      <h1><img src="${logo}" alt="MovieList 로고" /></h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    `;
    document.getElementById("app").appendChild(headerElement);
  }
}
