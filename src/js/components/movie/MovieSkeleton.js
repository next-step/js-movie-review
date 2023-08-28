/**
 * @param {number} [count]
 * @returns {MovieSkeleton}
 */
const MovieSkeleton = (count = 1) => {
  return /*html*/ `
    <li>
      <a href="#">
        <div class="item-card" data-cy="movie-skeleton">
          <div class="item-thumbnail skeleton"></div>
          <div class="item-title skeleton"></div>
          <div class="item-score skeleton"></div>
        </div>
      </a>
    </li>
  `.repeat(count);
};

export default MovieSkeleton;