import { Headers } from "./components/Headers";
import { initializeMovieSection } from './domain/MovieLoader';

addEventListener("load", async () => {
  const wrap = document.querySelector("#wrap");
  wrap.insertAdjacentHTML('afterbegin',Headers());

  await initializeMovieSection();
});
