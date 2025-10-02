import { updateBanner } from "./components/banner.js";
import { createMovieList } from "./components/movie-list.js";
import { createSkeleton, removeSkeleton } from "./components/skeleton.js";
import { ERROR_MESSAGES } from "./constants/error.constants.js";
import { getPopularMovies } from "./services/movie-api.js";

addEventListener("load", async () => {
  const thumbnailList = document.querySelector("main .thumbnail-list");
  const moreButton = document.querySelector("main .more");
  const pager = createPager();

  loadPopularMovies({
    container: thumbnailList,
    page: pager.getPage(),
    moreButton: moreButton,
  });

  moreButton.addEventListener("click", () => {
    handleMoreButtonClick({
      container: thumbnailList,
      page: pager.getNextPage(),
      moreButton: moreButton,
    });
  });
});

const createPager = () => {
  let currentPage = 1;

  return {
    getPage: () => currentPage,
    getNextPage: () => ++currentPage,
  };
};

const setVisibililty = (element, isVisible) => {
  element.classList.toggle("visible", isVisible);
};

const handleMoreButtonClick = async ({ container, page, moreButton }) => {
  moreButton.disabled = true;

  showSkeleton(container);

  try {
    const moreMovieListData = await getPopularMovies(page);
    hideSkeleton();
    moreButton.disabled = false;

    setVisibililty(moreButton, moreMovieListData.total_pages > page);

    const moreMovieList = createMovieList(moreMovieListData.results);

    container.appendChild(moreMovieList);
  } catch (error) {
    hideSkeleton();
    alert(ERROR_MESSAGES.API);
    moreButton.disabled = false;
    return;
  }
};

const loadPopularMovies = async ({ container, page, moreButton }) => {
  showSkeleton(container);

  try {
    const popularMovieListData = await getPopularMovies();
    hideSkeleton();

    updateBanner(popularMovieListData.results[0]);

    setVisibililty(
      moreButton,
      popularMovieListData.total_pages > page
    );

    const popularMovieList = createMovieList(popularMovieListData.results);

    container.appendChild(popularMovieList);
  } catch (error) {
    hideSkeleton();
    alert(ERROR_MESSAGES.API);
    return;
  }
};

const showSkeleton = (container) => container.appendChild(createSkeleton());
const hideSkeleton = () => removeSkeleton();
