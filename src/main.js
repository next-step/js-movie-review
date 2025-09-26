import { createMovieList } from "./components/movie-list.js";
import { getPopularMovies } from "./services/movie-api.js";

addEventListener("load", async () => {
  const popularMovieListData = await getPopularMovies();
  const movieList = popularMovieListData.results;
  const popularMovieList = createMovieList(movieList);

  const moreButton = document.querySelector("main .more");
  if (popularMovieListData.total_pages > popularMovieListData.page) {
    moreButton.classList.add("visible");
  } else {
    moreButton.classList.remove("visible");
  }
  moreButton.addEventListener("click", async () => {
    const moreMovieListData = await getPopularMovies(
      popularMovieListData.page + 1
    );
    const moreMovieList = createMovieList(moreMovieListData.results);

    thumbnailList.appendChild(moreMovieList);
  });

  const thumbnailList = document.querySelector("main .thumbnail-list");
  thumbnailList.classList.add("thumbnail-list");
  thumbnailList.appendChild(popularMovieList);
});
