import Logo from "../../../images/logo.png";
import { html } from "../../utils/template.js";

import "./search-box.js";

class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = html`
      <style>
        header {
          height: 72px;
          background-color: #222;
          min-width: 1200px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          border-bottom: 1px solid white;
          margin-bottom: 48px;
        }
        header h1 {
          cursor: pointer;
          user-select: none;
          font-size: 2rem;
          font-weight: bold;
          letter-spacing: -0.1rem;
          color: #f33f3f;
        }
      </style>
      <header>
        <h1>
          <img id="logo" src="${Logo}" alt="로고" />
        </h1>
        <search-box></search-box>
      </header>
    `;
  }
}

customElements.define("app-header", AppHeader);
