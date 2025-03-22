// import { state } from "../shared/state";
import { ThumbnailList } from "../widget/ThumbnailList";
import {
  getFavoriteMovies,
  getSearchMovie,
  getTopRatedMovies,
} from "../api/movieApiClient";
import { toElement } from "../shared/ui";
import { eventEmitter, renderer } from "../shared/renderer";

export const AppMain = ({ inputState }) => {
  const [mainState, setState] = renderer.state("app-main", []);
  const [pageState, setPageState] = renderer.state("---", 1);

  const fetchData = async (page) => {
    const data = await getFavoriteMovies(page);
    setState([...data]);
  };

  fetchData(pageState.value);

  const render = () => {
    const container = toElement(`
      <main >
        <div class="container">
          <h2>지금 인기 있는 영화</h2>  
          <section>
          ${ThumbnailList(mainState.value)}
          </section>
          ${inputState.value === "" ? '<button class="add-more">더보기</button>' : ""}
        </div>
      </main>`);

    const handleClick = () => {
      if (pageState.value >= 3) {
        return;
      }
      setPageState(pageState.value + 1);
      fetchData(pageState.value);
    };

    const inputElement = container.querySelector(".add-more");
    inputElement?.addEventListener("click", handleClick);

    return container;
  };

  let rootContainer = render();

  eventEmitter.addEventListener("app-main", () => {
    console.log(mainState.value);
    const newContainer = render();
    rootContainer.replaceWith(newContainer);
    rootContainer = newContainer;
  });

  async function handleInputAsync() {
    await fetchData(1);

    const movies = [...mainState.value].filter((movie) =>
      movie.title.includes(inputState.value),
    );
    console.log("INPUT STATE : ", inputState.value, mainState.value, movies);

    setState([...movies]);
  }

  eventEmitter.addEventListener("app-input", () => {
    // const inputData = event.detail;
    handleInputAsync();
  });

  return rootContainer;
};
