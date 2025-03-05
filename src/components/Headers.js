export const Headers = (movie) => {
  const { title, backdrop_path, vote_average } = movie;
  const backdrop = `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path}`;
  const rate = vote_average.toFixed(1);

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
            <span class="rate-value">${rate}</span>
          </div>
          <div class="title">${title}</div>
          <button class="primary detail">자세히 보기</button>
        </div>
      </div>
    </div>
  </header>`;
};
