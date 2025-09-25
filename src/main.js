import { createMovieList } from "./components/movie-list.js";
import { getPopularMovies } from "./services/movie-api.js";

addEventListener("load", async () => {
  const popularMovieListData = await getPopularMovies();
  const popularMovieList = createMovieList(popularMovieListData.results);

  const thumbnailList = document.querySelector("main .thumbnail-list");
  thumbnailList.classList.add("thumbnail-list");
  thumbnailList.appendChild(popularMovieList);
});
