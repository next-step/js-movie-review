import { state } from "../shared/state";
import { ThumbnailList } from "../widget/ThumbnailList";
import { getFavoriteMovies } from "../api/movieApiClient";
import { MainTabs } from "../widget/MainTabs";

export const AppMain = ({ inputState, inputStateSubscribe }) => {
  const { value: mainState, subscribe } = state([]);
  const { value: pageState } = state(1);

  const container = document.createDocumentFragment();
  const div = document.createElement("div");
  div.classList.add("container");

  div.innerHTML = /* html */ `
    <main>
      <div class="main-tabs">
      </div>
      <h2>지금 인기 있는 영화</h2>  
      <section>
          ${ThumbnailList({
            mainState,
          })}
      </section>
      <button class="add-more">더보기</button>
    </main>
  `;

  const fetchNextPage = async () => {
    pageState.value += 1;
    const data = await getFavoriteMovies(pageState.value);
    mainState.value = [...mainState.value, ...data];
  };

  div.querySelector(".main-tabs").appendChild(MainTabs());
  div.querySelector(".add-more").addEventListener("click", fetchNextPage);

  container.appendChild(div);

  // 초기 비동기 렌더링
  const fetchData = async () => {
    const data = await getFavoriteMovies(pageState.value);
    mainState.value = data;
  };

  fetchData();

  const render = async () => {
    div.querySelector("section").innerHTML = /* html */ `
        ${ThumbnailList({
          mainState,
        })}
  `;
  };

  inputStateSubscribe(async () => {
    const data = await getFavoriteMovies(1);
    mainState.value = [...data].filter((movieData) => {
      const { title } = movieData;
      return title.includes(inputState.value);
    });
  });

  subscribe(() => {
    render();
  });

  return container;
};
