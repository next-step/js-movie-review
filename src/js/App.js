import { getMovies } from './api/getMovies.js';
import Header from './components/common/Header.js';
import MovieList from './components/movie/MovieList.js';
import Component from './core/component.js';

class App extends Component {
  mounted() {
    new Header(this.$target.querySelector('header'));
    new MovieList(this.$target.querySelector('main'), {
      title: '지금 인기있는 영화',
    });
  }

  template() {
    return /*html*/ `
      <header>
      </header>
      <main>
      </main>
    `;
  }
}

export default App;
