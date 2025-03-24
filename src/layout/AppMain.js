// import { state } from "../shared/state";
import { ThumbnailList } from "../widget/ThumbnailList";
import {
  getFavoriteMovies,
  getSearchMovie,
  getTopRatedMovies,
} from "../api/movieApiClient";
import { toElement } from "../shared/ui";
import { eventEmitter, renderer } from "../shared/renderer";
import { options } from "../shared/intersection-observer";

export const AppMain = ({ inputState }) => {
  const [mainState, setState] = renderer.state("app-main", []);
  const [pageState, setPageState] = renderer.state("---", 1);

  const fetchData = async (page) => {
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
  
    const callback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          // Element is in view, do something
          console.log("Element is in view");
          if (inputState.value !== "" || pageState.value >= 3) {
            return;
          }
          setPageState(pageState.value + 1);
          fetchData(pageState.value);
        } else {
          // Element is out of view, do something
          console.log("Element is out of view");
        }
      });
    };

    const observer = new IntersectionObserver(callback, options)
    observer.observe(container.querySelector('.more'));


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
