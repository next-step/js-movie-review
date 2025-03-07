import { getTopRatedMovies } from "../api/movieApiClient";
import { state } from "../shared/state";

export const AppHeader = ({ inputState }) => {
  const { value: headerState, subscribe } = state([]);

  const fetchData = async () => {
    const data = await getTopRatedMovies();
    headerState.value = data;
  };

  const container = document.createDocumentFragment();
  const header = document.createElement("header");
  container.appendChild(header);

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      // eslint-disable-next-line no-param-reassign
      inputState.value = e.target.value;
    }
  };

  const render = () => {
    header.innerHTML = /* html */ `
    <div class="background-container">
    ${headerState.value
      ?.slice(0, 1)
      .map((result) => {
        const { poster_path: posterPath } = result;
        return /* html */ `<div class="overlay" aria-hidden="true"
          style="background-image:url('https://media.themoviedb.org/t/p/w1920_and_h1080_face${posterPath}')"
        ></div>`;
      })
      .join("")}

      <div class="top-rated-container">
        <div class="logo-and-searchbox">
          <h1 class="logo">
            <img src="logo.png" alt="MovieList" />
            </h1>
            <div class="search-icon-box">
              <input class="search" type="text"/>
              <svg 
                class="search-icon" 
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </div>
            <div></div>
        </div>
          <div class="top-rated-movie">
          
        ${headerState.value
          ?.slice(0, 1)
          .map((result) => {
            const { title, vote_average: voteAverage } = result;
            return /* html */ `<div class="rate">
          <img src="star_empty.png" class="star" />
          <span class="rate-value">${voteAverage}</span>
        </div>
        <div class="title">${title}</div>
        <button class="primary detail">자세히 보기</button>`;
          })
          .join("")}
        </div>
      </div>
    </div>
    `;

    const inputElement = header.querySelector(".search");
    inputElement.addEventListener("keydown", handleKeyDown);
  };

  fetchData();
  // 초기 렌더
  render();

  subscribe(() => {
    render();
  });

  return container;
};
