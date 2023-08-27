import Component from '../../core/component.js';

class MovieItem extends Component {
  mounted() {}

  template() {
    return /*html*/ `
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="${process.env.process.env.TMDB_API_URL}/${this.$props.poster}"
            loading="lazy"
            alt="${}"
          />
          <p class="item-title">${}</p>
          <p class="item-score"><img src="./star_filled.png" alt="별점" /> 6.5</p>
        </div>
      </a>
    `;
  }
}

export default MovieItem;
