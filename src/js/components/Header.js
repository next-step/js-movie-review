import Logo from "../../images/logo.png";

export function Header() {
  return {
    element: /* html */ `
        <header>
            <h1><img src="${Logo}" alt="MovieList 로고" /></h1>
            <div class="search-box">
            <input type="text" placeholder="검색" />
            <button class="search-button">검색</button>
            </div>
        </header>
  `,
  };
}
