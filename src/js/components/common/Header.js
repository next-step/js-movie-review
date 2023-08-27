import Component from '../../core/component.js';
import logo from '../../../public/logo.png';

class Header extends Component {
  mounted() {
    this.$target.querySelector('.logo').src = logo;
  }

  template() {
    return /*html*/ `
      <h1>
        <img src="/public/logo.png" alt="MovieList 로고" class="logo"/>
      </h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
    `;
  }
}

export default Header;
