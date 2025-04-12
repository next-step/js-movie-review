import { getFavoriteMovies, getSearchMovie } from "../api/movieApiClient";
import { callback, options } from "../shared/intersection-observer";
import { eventEmitter, stateManager } from "../shared/state-manager";
import { replaceNewContainer } from "../shared/replace-container";
import { toElement } from "../shared/ui";
import { ThumbnailList } from "../widget/ThumbnailList";

export const AppMain = ({ inputState }) => {
  const [mainState, setState] = stateManager.state("app-main", []);
  const [pageState, setPageState] = stateManager.state("---", 1);

  const fetchData = async (page) => {
    if (inputState.value !== "") {
      const movies = await getSearchMovie(inputState.value, page);
      setState([...mainState.value, ...movies]);
      return;
    }
    const data = await getFavoriteMovies(page);
    setState([...mainState.value, ...data]);
  };

  fetchData(pageState.value);

  const render = () => {
    const container = toElement(`
      <main >
        <div class="container">
          <h2>지금 인기 있는 영화</h2>  
          <section>
          </section>
          <div class="more"></div>
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

    const sectionElement = container.querySelector("section");
    sectionElement.firstChild.replaceWith(ThumbnailList(mainState.value));

    const observerObject = new IntersectionObserver(
      (entries, observer) =>
        callback(entries, observer, () => {
          setPageState(pageState.value + 1);
          fetchData(pageState.value);
        }),
      options,
    );
    observerObject.observe(container.querySelector(".more"));

    return container;
  };

  let rootContainer = render();

  eventEmitter.addEventListener("app-main", () => {
    rootContainer = replaceNewContainer(rootContainer, render);
  });

  async function handleInputAsync() {
    const movies = await getSearchMovie(inputState.value);
    setState(movies);
  }

  eventEmitter.addEventListener("app-input", () => {
    handleInputAsync();
  });

  return rootContainer;
};
