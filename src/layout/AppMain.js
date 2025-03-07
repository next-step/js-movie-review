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

  const button = document.createElement("button");
  button.addEventListener("click", handleClick);
  button.innerHTML = "더 보기";
  div.querySelector("section").insertAdjacentElement("afterend", button);

  container.appendChild(div);

  // 초기 비동기 렌더링
  (async () => {
    const data = await getResponse(pageState.value);
    mainState.value = data;
  })();

  const render = async () => {
    if (pageState.value >= 2 && div.querySelector("button")) {
      div.querySelector("main").removeChild(button);
    }
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
