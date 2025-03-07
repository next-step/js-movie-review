import { getTopRatedMovies } from "../shared/api/get";
import { state } from "../shared/state";

export const AppHeader = ({ inputState }) => {
  const { value: headerState, subscribe } = state([]);

  const getResponse = async () => {
    const response = await getTopRatedMovies();
    return response;
  };

  // 초기 비동기 렌더링
  (async () => {
    const data = await getResponse();
    const { results } = data;
    headerState.value = results;
  })();

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
          <input class="search" type="text"/>
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

  // 초기 렌더
  render();

  subscribe(() => {
    render();
  });

  return container;
};
