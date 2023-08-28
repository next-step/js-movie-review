import { getPopularMovies } from './api/movies.js';
import Header from './components/common/Header.js';
import MovieList from './components/movie/MovieList.js';
import Component from './core/Component.js';
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

  getNextPage() {
    this.increasePage();
    movieStore.accumulateData(() => getPopularMovies(this.$state.page));
  }

  increasePage() {
    this.setState({
      page: this.$state.page + 1,
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
    return /*html*/ `
      <header>
      </header>
      <main>
        <div class="popular-movies">
        </div>
        <button class="btn primary full-width">더 보기</button>
      </main>
    `;
  }
}

export default App;
