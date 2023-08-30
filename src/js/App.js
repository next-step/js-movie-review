import { MovieList, Header } from './components/index.js';
import MOVIE_LIST from './constants/movie-list-config.js';
import { Component } from './core/index.js';
import { movieStore } from './stores.js';
import { $ } from './utils/selector.js';

class App extends Component {
  setup() {
    this.$state = {
      page: 1,
    };
    movieStore.subscribe(this);
    movieStore.refetch(() => MOVIE_LIST.POPULAR.FETCH(this.$state.page));
    this.addEvent('click', '.btn', () => this.getNextPage());
  }

  /**
   * 다음 페이지를 불러옵니다
   * @param {number} [increase]
   */
  getNextPage(increase = 1) {
    this.increasePage(increase);
    movieStore.accumulateData(() => MOVIE_LIST.POPULAR.FETCH(this.$state.page));
  }

  /**
   * 페이지를 증가시킵니다.
   * @param {number} [increase]
   */
  increasePage(increase = 1) {
    this.setState({
      page: this.$state.page + increase,
    });
  }

  mounted() {
    const { data: movies, isLoading, isError, error } = this.$state[movieStore.key];
    new Header($('header'));
    new MovieList($('.popular-movies'), {
      title: MOVIE_LIST.POPULAR.TITLE,
      movies,
      isLoading,
      isError,
      error,
    });
  }

  template() {
    return /* html */ `
      <header>
      </header>
      <main>
        <div class="popular-movies">
        </div>
      </main>
    `;
  }
}

export default App;
