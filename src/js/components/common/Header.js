import { Component } from '../../core/index.js';
import logo from '../../../../public/logo.png';

export class Header extends Component {
  template() {
    return /* html */ `
      <h1>
        <img src=${logo} alt="MovieList 로고" class="logo"/>
      </h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    `;
  }
}
