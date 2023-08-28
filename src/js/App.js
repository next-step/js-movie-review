import { getPopularMovies } from './api/movies.js';
import { MovieList, Header } from './components/index.js';
import { Component } from './core/index.js';
import { movieStore } from './stores.js';

class App extends Component {
  setup() {
    this.$state = {
      page: 1,
    };
    movieStore.subscribe(this);
    movieStore.refetch(() => getPopularMovies(this.$state.page));
    this.addEvent('click', '.btn', () => this.getNextPage());
  }

  /**
   * 다음 페이지를 불러옵니다
   * @param {number} [increase]
   */
  getNextPage(increase = 1) {
    this.increasePage(increase);
    movieStore.accumulateData(() => getPopularMovies(this.$state.page));
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
    new Header(this.$target.querySelector('header'));
    new MovieList(this.$target.querySelector('.popular-movies'), {
      title: '지금 인기있는 영화',
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
