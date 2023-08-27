import Header from './components/common/Header.js';
import Component from './core/component.js';

class App extends Component {
  mounted() {
    new Header(this.$target.querySelector('header'));
  }

  template() {
    return /*html*/ `
      <header>
      </header>
    `;
  }
}

export default App;
