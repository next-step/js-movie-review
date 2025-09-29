import { updateBanner } from "./components/banner.js";
import { createMovieList } from "./components/movie-list.js";
import { createSkeleton, removeSkeleton } from "./components/skeleton.js";
import { getPopularMovies } from "./services/movie-api.js";

addEventListener("load", async () => {
  const thumbnailList = document.querySelector("main .thumbnail-list");
  thumbnailList.appendChild(createSkeleton());

  const popularMovieListData = await getPopularMovies();
  removeSkeleton();

  updateBanner(popularMovieListData.results[0]);

  const movieList = popularMovieListData.results;
  const pager = createPager();
  const popularMovieList = createMovieList(movieList);

  const moreButton = document.querySelector("main .more");
  if (popularMovieListData.total_pages > pager.getPage()) {
    moreButton.classList.add("visible");
  } else {
    moreButton.classList.remove("visible");
  }
  moreButton.addEventListener("click", async () => {
    thumbnailList.appendChild(createSkeleton());

    const moreMovieListData = await getPopularMovies(pager.getNextPage());
    removeSkeleton();

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
