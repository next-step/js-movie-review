import { updateBanner } from "./components/banner.js";
import { createMovieList } from "./components/movie-list.js";
import { createSkeleton, removeSkeleton } from "./components/skeleton.js";
import { ERROR_API_MESSAGE } from "./constants/movie-contants.js";
import { getPopularMovies } from "./services/movie-api.js";

addEventListener("load", async () => {
  const thumbnailList = document.querySelector("main .thumbnail-list");
  thumbnailList.appendChild(createSkeleton());

  let popularMovieListData;
  try {
    popularMovieListData = await getPopularMovies();
  } catch (error) {
    removeSkeleton();
    alert(ERROR_API_MESSAGE);
    return;
  }

  removeSkeleton();
  updateBanner(popularMovieListData.results[0]);

  const movieList = popularMovieListData.results;
  const pager = createPager();
  const popularMovieList = createMovieList(movieList);

  const moreButton = document.querySelector("main .more");
  setVisibililty(
    moreButton,
    popularMovieListData.total_pages > pager.getPage()
  );
  moreButton.addEventListener("click", async () => {
    moreButton.disabled = true;

    thumbnailList.appendChild(createSkeleton());

    let moreMovieListData;
    try {
      moreMovieListData = await getPopularMovies(pager.getNextPage());
    } catch (error) {
      removeSkeleton();
      alert(ERROR_API_MESSAGE);
      moreButton.disabled = false;
      return;
    }

    removeSkeleton();
    moreButton.disabled = false;

    setVisibililty(moreButton, moreMovieListData.total_pages > pager.getPage());

    const moreMovieList = createMovieList(moreMovieListData.results);

    thumbnailList.appendChild(moreMovieList);
  });

  thumbnailList.appendChild(popularMovieList);
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
