import SearchButton from "../../../images/search_button.png";
import { html } from "../../utils/template.js";

class SearchBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <style>
        .search-box {
          background: #fff;
          padding: 8px;
          border-radius: 4px;
        }

        .search-box > input {
          border: 0;
        }

        .search-box > .search-button {
          width: 14px;
          border: 0;
          text-indent: -1000rem;
          background: url("${SearchButton}") transparent no-repeat 0 1px;
          background-size: contain;
        }
      </style>
      <div class="search-box">
        <input type="text" placeholder="검색어를 입력하세요." />
        <button class="search-button">검색</button>
      </div>
    `;
  }
}

customElements.define("search-box", SearchBox);
