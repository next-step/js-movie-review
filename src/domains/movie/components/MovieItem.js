export const MovieItem = () => {
  return `
    <div class="item">
      <img
        class="thumbnail"
        src="https://media.themoviedb.org/t/p/w440_and_h660_face/pmemGuhr450DK8GiTT44mgwWCP7.jpg"
        alt="인사이드 아웃 2"
      />
      
      <div class="item-desc">
        <p class="rate">
          <img src="${import.meta.env.BASE_URL}assets/star_empty.png" class="star" /><span>7.7</span>
        </p>
        <strong>인사이드 아웃 2</strong>
      </div>
    </div>
  `;
};
