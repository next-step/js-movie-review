import "./components/layout/app-header.js";
import "./components/movie/movie-card.js";
import "./components/movie/movie-list.js";
import "./components/movie/movie-container.js";

import { html } from "./utils/template.js";

class App extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.template();
  }

  template() {
    return html`
      <style>
        * {
          padding-bottom: 48px;
        }
      </style>
      <app-header></app-header>
      <main>
        <movie-container></movie-container>
      </main>
    `;
  }
}

customElements.define("movie-app", App);
