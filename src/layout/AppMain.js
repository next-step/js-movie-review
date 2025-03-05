import { state } from "../shared/state";
import { ThumbnailList } from "../widget/ThumbnailList";
import { getFavoriteMovies } from "../shared/api/get";
import { MainTabs } from "../widget/MainTabs";

export const AppMain = () => {
  const { value: mainState, subscribe } = state([]);
  const { value: pageState } = state(1);

  const container = document.createDocumentFragment();
  const div = document.createElement("div");
  div.classList.add("container");

  div.innerHTML = /* html */ `
    ${MainTabs()}
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
    const response = await getFavoriteMovies(index);
    return response;
  };

  const handleClick = async () => {
    pageState.value += 1;
    const data = await getResponse(pageState.value);
    const { results } = data;
    mainState.value = [...mainState.value, ...results];
  };

  const button = document.createElement("button");
  button.addEventListener("click", handleClick);
  button.innerHTML = "더 보기";
  div.querySelector("section").insertAdjacentElement("afterend", button);

  container.appendChild(div);

  // 초기 비동기 렌더링
  (async () => {
    const data = await getResponse(pageState.value);
    const { results } = data;
    mainState.value = results;
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

  // value내 값이 변할 떄, render를 다시!
  subscribe(() => {
    render();
  });

  return container;
};
