export const MovieCard = ({ title, poster, score, icon }) => {
  const $el = document.createElement('li');

  $el.insertAdjacentHTML(
    'afterbegin',
    `
    <a href="#">
      <div class="item-card">
        <img
          class="item-thumbnail"
          src="${poster}"
          loading="lazy"
          alt="${title} 포스터"
          draggable="false"
        />
        <p class="item-title">${title}</p>
        <p class="item-score">${score}<img src="${icon}" alt="별점" /></p>
      </div>
    </a>
  `
  );

  return $el;
};
