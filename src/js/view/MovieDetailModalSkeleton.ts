const MovieDetailModalSkeleton = {
  generateTemplate() {
    return /* html */ `
      <div
        class="movie-thumbnail skeleton"
      ></div>

      <div class="movie-info">
        <p class="movie-header skeleton"></p>
        <p class="movie-overview skeleton"></p>

        <div class="user-rating skeleton">
        </div>
      </div>
    `;
  },
};

export default MovieDetailModalSkeleton;
