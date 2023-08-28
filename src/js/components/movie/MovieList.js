import Component from '../../core/Component.js';
import '../../types.js';
import Error from '../common/Error.js';
import MovieItem from './MovieItem.js';
import MovieSkeleton from './MovieSkeleton.js';

class MovieList extends Component {
  template() {
    return /*html*/ `
      <div class="item-view">
        <h2>
          ${this.$props.title}
        </h2>
        <ul class="item-list">
          ${this.$props.movies ? this.$props.movies.map(MovieItem).join('') : ''}
          ${this.$props.isLoading ? MovieSkeleton(20) : ''}
          ${this.$props.isError ? Error(this.$props.error) : ''}
        </ul>
      </div>
    `;
  }
}

export default MovieList;
