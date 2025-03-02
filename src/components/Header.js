export function loadHeader({
  title = "기본 제목",
  rating = "0.0",
  backdrop = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
}) {
  const headerContainer = document.getElementById("header-container");
  if (!headerContainer) return;

  headerContainer.innerHTML = `
    <header style="background-image: url('${backdrop}');">
      <div class="background-container">
        <div class="overlay"></div>  
        <div class="top-rated-container">
          <h1 class="logo">
            <img src="./images/logo.png" alt="MovieList" />
          </h1>
          <div class="top-rated-movie">
            <div class="rate">
              <img src="./images/star_empty.png" class="star" />
              <span class="rate-value">${rating}</span>
            </div>
            <div class="title">${title}</div>
            <button class="primary detail">자세히 보기</button>
          </div>
        </div>
      </div>
    </header>
  `;
}
