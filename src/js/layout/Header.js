import { $createElement } from "../utils/dom.js";
import logo from "../../images/logo.png";

export const Header = () => {
  return $createElement(
    "header",
    `
        <h1>
          <img src=${logo} alt="MovieList 로고" />
        </h1>
        <div class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </div>
    `
  );
};
