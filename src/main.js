import { createMovieList } from "./components/movie-list.js";
import { createSkeleton, removeSkeleton } from "./components/skeleton.js";
import { getPopularMovies } from "./services/movie-api.js";

addEventListener("load", async () => {
  const thumbnailList = document.querySelector("main .thumbnail-list");
  thumbnailList.appendChild(createSkeleton());

  const popularMovieListData = await getPopularMovies();
  await new Promise((resolve) => setTimeout(resolve, 500));
  removeSkeleton();

  const movieList = popularMovieListData.results;
  const popularMovieList = createMovieList(movieList);

  const moreButton = document.querySelector("main .more");
  if (popularMovieListData.total_pages > popularMovieListData.page) {
    moreButton.classList.add("visible");
  } else {
    moreButton.classList.remove("visible");
  }
  moreButton.addEventListener("click", async () => {
    thumbnailList.appendChild(createSkeleton());

    const moreMovieListData = await getPopularMovies(
      popularMovieListData.page + 1
    );
    await new Promise((resolve) => setTimeout(resolve, 500));
    removeSkeleton();

    const moreMovieList = createMovieList(moreMovieListData.results);

    thumbnailList.appendChild(moreMovieList);
  });

  thumbnailList.classList.add("thumbnail-list");
  thumbnailList.appendChild(popularMovieList);
});
