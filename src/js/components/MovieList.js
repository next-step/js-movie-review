import { createComponent, currentComponent } from "../createComponent";
import { fetchMovies } from "../fetch";
import { useState } from "../state";
import { MovieCard } from "./MovieCard";

export async function MovieList() {
  const [page, setPage] = useState(1);

  const movieData = await fetchMovies({ page });

  const [movies, setMovies] = useState([...movieData.results]);
  const [totalPage] = useState(movieData.total_page);

  const movieCards = await Promise.all(
    movies.map((movie, index) =>
      createComponent(MovieCard, {
        index,
        title: movie.title,
        score: movie.vote_average,
        thumbnailUrl: `https://image.tmdb.org/t/p/w200/${movie.poster_path}`,
      })
    )
  );

  const handleMoreButton = async () => {
    if (page >= totalPage) {
      return;
    }

    await setPage(page + 1);

    const movieData = await fetchMovies({ page: page + 1 });
    const newMovies = [...movies, ...movieData.results];

    await setMovies(newMovies);
  };

  const bindEvents = () => {
    movieCards.forEach((movieCard) => movieCard.bindEvents());

    const $moreButton = document.querySelector("#more-button");

    $moreButton.addEventListener("click", handleMoreButton);
  };

  return {
    element: /* html */ `
        <ul class="item-list">
            ${movieCards.map((movieCard) => movieCard.element).join("")}
        </ul>
        <button id="more-button" class="btn primary full-width">더 보기</button>
    `,
    bindEvents,
  };
}
