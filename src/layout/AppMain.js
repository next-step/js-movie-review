import { state } from "../shared/state";
import { ThumbnailList } from "../widget/ThumbnailList";
import { getFavoriteMovies } from "../shared/api/get";
import { MainTabs } from "../widget/MainTabs";

export const AppMain = () => {
  const { value: mainState, subscribe } = state([]);
  const { value: pageState } = state(1);
  const container = document.createDocumentFragment();
  const div = document.createElement("div");
  container.appendChild(div);

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
  container.appendChild(button);

  // 초기 비동기 렌더링
  (async () => {
    const data = await getResponse(pageState.value);
    const { results } = data;
    mainState.value = results;
  })();

  const render = async () => {
    div.innerHTML = /* html */ `<div class="container">
    ${MainTabs()}
    <main>
      <section>
        <h2>지금 인기 있는 영화</h2>
        ${ThumbnailList({
          mainState,
        })}
      </section>
    </main>
  </div>`;
  };

  // 초기 렌더
  render();

  // value내 값이 변할 떄, render를 다시!
  subscribe(() => {
    render();
  });

  return container;
};
