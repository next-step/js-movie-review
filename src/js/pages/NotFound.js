import { Header } from '../components/index.js';
import { Component } from '../core/index.js';
import { $ } from '../utils/selector.js';

class NotFound extends Component {
  setup() {}

  mounted() {
    new Header($('header'));
  }

  template() {
    return /* html */ `
      <header>
      </header>
      <main>
        <div class="not-found">
          404 NOT FOUND
        </div>
      </main>
    `;
  }
}

export default NotFound;
