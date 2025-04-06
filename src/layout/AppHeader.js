import { getTopRatedMovies } from "../api/movieApiClient";
import { eventEmitter, renderer } from "../shared/renderer";
import { replaceNewContainer } from "../shared/replace-container";
// import { state } from "../shared/state";
import { toElement } from "../shared/ui";

const TopRatedMoviePoster = (topRatedMovie) =>
  topRatedMovie
    ?.slice(0, 1)
    .map((result) => {
      const { poster_path: posterPath } = result;
      return /* html */ `<div class="overlay" aria-hidden="true"
        style="background-image:url('https://media.themoviedb.org/t/p/w1920_and_h1080_face${posterPath}')"
      ></div>`;
    })
    .join("");

const TopRatedMovieInfo = (topRatedMovie) =>
  topRatedMovie
    ?.slice(0, 1)
    .map((result) => {
      const { title, vote_average: voteAverage } = result;
      return /* html */ `<div class="rate">
    <img src="star_empty.png" class="star" />
    <span class="rate-value">${voteAverage}</span>
  </div>
  <div class="title">${title}</div>
  <button class="primary detail">자세히 보기</button>`;
    })
    .join("");

export const AppHeader = ({ setInputState }) => {
  const [headerState, setState] = renderer.state("app-header", []);

  const fetchData = async () => {
    const data = await getTopRatedMovies();
    setState(data);
  };

  fetchData();

  const render = () => {
    const container = toElement(
      `<header>
          <div class="background-container">
              ${TopRatedMoviePoster(headerState.value)}
              <div class="top-rated-container">
                <div class="logo-and-searchbox">
                  <h1 class="logo">
                    <img src="logo.png" alt="MovieList" />
                    </h1>
                    <div class="search-icon-box">
                      <input class="search" type="text"/>
                      <svg 
                        class="search-icon" 
                      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    </div>
                    <div></div>
                </div>
                  <div class="top-rated-movie">
                ${TopRatedMovieInfo(headerState.value)}
                </div>
              </div>
            </div>
        </header>`,
    );

    const handleKeyDown = (e) => {
      if (e.code === "Enter") {
        e.preventDefault();
        // eslint-disable-next-line no-param-reassign
        setInputState(e.target.value);
        console.log(e.target.value);
      }
    };

    const inputElement = container.querySelector(".search");
    inputElement.addEventListener("keydown", handleKeyDown);

    return container;
  };

  let rootContainer = render();

  eventEmitter.addEventListener("app-header", () => {
    const newContainer = render();
    rootContainer.replaceWith(newContainer); // 기존 <header>를 새로운 <header>로 교체
    rootContainer = newContainer;
  });

  return rootContainer;
};
