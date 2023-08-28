import { Component } from '../../core/index.js';
import '../../types.js';
import { Error } from '../common/Error.js';
import { MovieItem } from './MovieItem.js';
import { MovieSkeleton } from './MovieSkeleton.js';

export class MovieList extends Component {
  template() {
    return /* html */ `
      <div class="item-view">
        <h2>
          ${this.$props.title}
        </h2>
        <ul class="item-list">
          ${this.$props.movies ? this.$props.movies.map(MovieItem).join('') : ''}
          ${this.$props.isLoading ? MovieSkeleton(20) : ''}
          ${this.$props.isError ? Error(this.$props.error) : ''}
        </ul>
        ${!this.$props.isLoading ? '<button class="btn primary full-width">더 보기</button>' : ''}
      </div>
    `;
  }
}
