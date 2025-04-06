// import { state } from "../shared/state";
import { ThumbnailList } from "../widget/ThumbnailList";
import {
  getFavoriteMovies,
  getSearchMovie,
  getTopRatedMovies,
} from "../api/movieApiClient";
import { toElement } from "../shared/ui";
import { eventEmitter, renderer } from "../shared/renderer";
import { callback, options } from "../shared/intersection-observer";
import { replaceNewContainer } from "../shared/replace-container";

export const AppMain = ({ inputState }) => {
  const [mainState, setState] = renderer.state("app-main", []);
  const [pageState, setPageState] = renderer.state("---", 1);

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
    sectionElement.firstChild.replaceWith(ThumbnailList(mainState.value))    

    const observer = new IntersectionObserver(
      (entries, observer) => callback(
        entries, observer,
        () => {
          setPageState(pageState.value + 1);
          fetchData(pageState.value);
        }), 
        options)
    observer.observe(container.querySelector('.more'));

    return container;
  };

  let rootContainer = render();

  eventEmitter.addEventListener("app-main", () => {
    rootContainer = replaceNewContainer(rootContainer, render)
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
