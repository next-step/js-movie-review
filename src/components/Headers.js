export const Headers = () => {
  const backdrop =
    "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg";

  return /*html*/ `<header>
    <div class="background-container">
      <div class="overlay" aria-hidden="true" style="background-image: url('${backdrop}');"></div>
      <div class="top-rated-container">
        <h1 class="logo">
          <img src="./images/logo.png" alt="MovieList" />
        </h1>
        <div class="top-rated-movie">
          <div class="rate">
            <img src="./images/star_empty.png" class="star" />
            <span class="rate-value">9.5</span>
          </div>
          <div class="title">인사이드 아웃2</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
  </header>`;
};
