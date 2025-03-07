import { state } from "../shared/state";
import { ThumbnailList } from "../widget/ThumbnailList";
import { getFavoriteMovies } from "../shared/api/get";

export const AppMain = ({ inputState, inputStateSubscribe }) => {
  const { value: mainState, subscribe } = state([]);
  const { value: pageState } = state(1);

  const container = document.createDocumentFragment();
  const div = document.createElement("div");
  div.classList.add("container");

  div.innerHTML = /* html */ `
    <main>
      <h2>지금 인기 있는 영화</h2>  
      <section>
          ${ThumbnailList({
            mainState,
          })}
      </section>
      <button class="add-more">더보기</button>
    </main>
  `;

  const getResponse = async (index) => {
    const data = await getFavoriteMovies(index);
    const { results } = data;
    return results;
  };

  const handleClick = async () => {
    pageState.value += 1;
    const data = await getResponse(pageState.value);
    mainState.value = [...mainState.value, ...data];
  };

  div.querySelector(".add-more").addEventListener("click", handleClick);

  container.appendChild(div);

  // 초기 비동기 렌더링
  (async () => {
    const data = await getResponse(pageState.value);
    mainState.value = data;
  })();

  const render = async () => {
    div.querySelector("section").innerHTML = /* html */ `
        ${ThumbnailList({
          mainState,
        })}
  `;
  };

  inputStateSubscribe(async () => {
    const data = await getResponse(1);
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
