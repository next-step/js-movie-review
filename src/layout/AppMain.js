// import { state } from "../shared/state";
import { ThumbnailList } from "../widget/ThumbnailList";
import { getSearchMovie } from "../api/movieApiClient";
import { MainTabs } from "../widget/MainTabs";
import { toElement } from "../shared/ui";

export const AppMain = ({ inputState, inputStateSubscribe }) => {
  const { value: mainState } = state([]);
  // const { value: pageState } = state(1);

  // fetchData();

  const render = () =>
    toElement(`
      <main>
        ${MainTabs()}
        <h2>지금 인기 있는 영화</h2>  
        <section>
        ${ThumbnailList({
          mainState,
        })}
        </section>
        <button class="add-more">더보기</button>
      </main>`);

  inputStateSubscribe(async () => {
    const data = await getSearchMovie(inputState.value);
    mainState.value = data;
  });

  return render();
};
