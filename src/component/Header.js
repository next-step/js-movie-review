import { starImage } from "../Image";

export function initHeader(movieInstance) {
  const header = document.querySelector("header");

  const starImagePath =
    movieInstance.voteAverage === "0.0"
      ? starImage["empty"]
      : starImage["filled"];

  header.innerHTML = /*html*/ `
    <div class="background-container" style="background-image: url('${movieInstance.backdropPath}'); background-size: cover; background-position: center;">
        <div class="overlay" aria-hidden="true"></div>
            <div class="top-rated-container">
                <div class="top-bar">
                    <h1 class="logo">
                        <img src="logo.png" alt="MovieList" />
                    </h1>
                    <div class="search-container">
                    <input
                        class="search-input"
                        type="search"
                        placeholder="검색어를 입력하세요."
                    />
                    <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50">
                        <path d="M 21 3 C 11.622998 3 4 10.623005 4 20 C 4 29.376995 11.622998 37 21 37 C 24.712383 37 28.139151 35.791079 30.9375 33.765625 L 44.085938 46.914062 L 46.914062 44.085938 L 33.886719 31.058594 C 36.443536 28.083 38 24.223631 38 20 C 38 10.623005 30.377002 3 21 3 z M 21 5 C 29.296122 5 36 11.703883 36 20 C 36 28.296117 29.296122 35 21 35 C 12.703878 35 6 28.296117 6 20 C 6 11.703883 12.703878 5 21 5 z"></path>
                    </svg>
                    </div>
                </div>
                
                <div class="top-rated-movie">
                <div class="rate">
                    <img src="${starImagePath}" class="star" />
                    <span class="rate-value">${movieInstance.voteAverage}</span>
                </div>
                <div class="title">${movieInstance.title}</div>
                <button class="primary detail">자세히 보기</button>
            </div>
        </div>s
    </div>
  `;
}
