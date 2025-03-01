export const MovieItem = (props) => {
  const { title, poster_path, vote_average } = props;

  const rate = vote_average.toFixed(1);

  return `
    <div class="item">
      <img
        class="thumbnail"
        src="https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}"
        alt="인사이드 아웃 2"
      />
      
      <div class="item-desc">
        <p class="rate">
          <img src="${import.meta.env.BASE_URL}assets/star_empty.png" class="star" /><span>${rate}</span>
        </p>
        <strong>${title}</strong>
      </div>
    </div>
  `;
};
