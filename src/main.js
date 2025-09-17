import { getPopularMovies } from "./apis/getPopularMovies.js";
import { createBanner } from "./components/Banner.js";
import {
  createMovieCard,
  createMovieCardSkeleton,
} from "./components/MovieCard.js";
import { getImageUrl } from "./domain/getImageUrl.js";

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  const wrap = document.createElement("div");
  wrap.id = "wrap";
  app.append(wrap);

  const header = document.createElement("header");
  wrap.append(header);

  const banner = createBanner();
  header.append(banner);

  const container = document.createElement("div");
  container.classList.add("container");
  wrap.append(container);

  const main = document.createElement("main");
  container.append(main);

  const section = document.createElement("section");
  main.append(section);

  const title = document.createElement("h2");
  title.textContent = "지금 인기 있는 영화";
  section.append(title);

  let page = 1;
  const response = await getPopularMovies({ page });

  const ul = document.createElement("ul");
  ul.classList.add("thumbnail-list");
  section.append(ul);

  const cards = response.results.map(({ title, posterPath, voteAverage }) =>
    createMovieCard({ title, imageFileName: posterPath, rate: voteAverage })
  );

  const firstMoviePosterPath = response.results[0].posterPath;
  header.style.backgroundImage = `url(${getImageUrl(firstMoviePosterPath)})`;
  ul.append(...cards);

  const loadMoreButton = document.createElement("button");
  loadMoreButton.textContent = "더 보기";
  loadMoreButton.classList.add("load-more-button");
  loadMoreButton.addEventListener("click", async () => {
    const cardSkeleton = Array.from({ length: ITEM_PER_PAGE }, () =>
      createMovieCardSkeleton()
    );
    ul.append(...cardSkeleton);

    page = page + 1;
    const response = await getPopularMovies({
      language: "ko-KR",
      page,
    });

    if (response.total_pages === page) {
      loadMoreButton.classList.add("hide");
    }

    const cards = response.results.map(({ title, posterPath, voteAverage }) =>
      createMovieCard({ title, imageFileName: posterPath, rate: voteAverage })
    );

    ul.querySelectorAll(".card-skeleton").forEach((el) => el.remove());

    ul.append(...cards);
  });

  section.append(loadMoreButton);
});

const ITEM_PER_PAGE = 20;
