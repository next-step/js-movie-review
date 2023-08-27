import movieStore from './api/MovieStore.js';
import { getPopularMovies } from './api/movies.js';
import Header from './components/common/Header.js';
import MovieList from './components/movie/MovieList.js';
import Component from './core/component.js';

class App extends Component {
  setup() {
    this.$state = {
      page: 0,
    };
    movieStore.subscribe(this);
    this.getNextPage();
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
    const { data: movies, isLoading, isError } = this.$state[movieStore.key];
    new Header(this.$target.querySelector('header'));
    new MovieList(this.$target.querySelector('.popular-movies'), {
      title: '지금 인기있는 영화',
      movies,
      isLoading,
      isError,
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
