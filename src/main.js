import { createHeader } from "src/shared/ui/header";
import { createFooter } from "src/shared/ui/footer";
import { createMovieListSection } from "src/pages/movie-list";

async function fetchPopularMovies() {
  try {
    const url =
      "https://api.themoviedb.org/3/movie/popular?language=ko-KO&page=1";
    const headers = {
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, { headers });
    const result = await response.json();

    return result;
  } catch (error) {
    console.error("영화 목록을 불러오는데 실패했습니다.", error);
  }
}

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  const data = await fetchPopularMovies();

  const header = createHeader();
  const footer = createFooter();
  const movieList = createMovieListSection(data.results);

  app.append(header, movieList, footer);
});
