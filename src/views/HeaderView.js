import logo from "../assets/logo.png";

export class HeaderView {
  constructor() {
    this.setup();
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
