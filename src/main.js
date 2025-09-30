import { updateBanner } from "./components/banner.js";
import { createMovieList } from "./components/movie-list.js";
import { createSkeleton, removeSkeleton } from "./components/skeleton.js";
import { ERROR_MESSAGES } from "./constants/error.constants.js";
import { getPopularMovies } from "./services/movie-api.js";

addEventListener("load", async () => {
  const thumbnailList = document.querySelector("main .thumbnail-list");
  const moreButton = document.querySelector("main .more");
  const pager = createPager();

  thumbnailList.appendChild(createSkeleton());

  try {
    const popularMovieListData = await getPopularMovies();

    removeSkeleton();
    updateBanner(popularMovieListData.results[0]);

    const movieList = popularMovieListData.results;
    const popularMovieList = createMovieList(movieList);

    setVisibililty(
      moreButton,
      popularMovieListData.total_pages > pager.getPage()
    );

    thumbnailList.appendChild(popularMovieList);
  } catch (error) {
    removeSkeleton();
    alert(ERROR_MESSAGES.API);
    return;
  }

  moreButton.addEventListener("click", async () => {
    moreButton.disabled = true;

    thumbnailList.appendChild(createSkeleton());

    try {
      const moreMovieListData = await getPopularMovies(pager.getNextPage());
      removeSkeleton();
      moreButton.disabled = false;

      setVisibililty(
        moreButton,
        moreMovieListData.total_pages > pager.getPage()
      );

      const moreMovieList = createMovieList(moreMovieListData.results);

      thumbnailList.appendChild(moreMovieList);
    } catch (error) {
      removeSkeleton();
      alert(ERROR_MESSAGES.API);
      moreButton.disabled = false;
      return;
    }
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
