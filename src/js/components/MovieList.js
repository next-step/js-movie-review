/**
 * @param {string} title
 */
export const MovieList = title => {
  return `
    <section class="item-view">
      <h2>
        ${title}
      </h2>
      <ul class="item-list">      
      </ul>
      <button class="btn primary full-width" id="moreButton">더 보기</button>
    </section>`;
};
