import renderMoreButton from "./view/renderMoreButton";
import renderMovieList from "./view/renderMovieList";
import Page from "./domain/Page";
import { removeSkeleton, renderSkeleton } from "./view/renderSkeleton";

const App = async (rootElement) => {
  const ul = rootElement.querySelector(".item-list");
  const sectionElement = rootElement.querySelector(".item-view");

  const page = new Page();

  const init = async () => {
    //
    renderSkeleton(ul);
    await page.load();

    removeSkeleton(ul);
    renderMovieList(ul, page.movieList);

    renderMoreButton(sectionElement, async () => {
      const newMovies = await page.load();
      renderMovieList(ul, newMovies);
    });
  };

  init();
};

export default App;
