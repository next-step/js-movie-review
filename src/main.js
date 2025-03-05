import { initializeMovieSection } from "./domain/MovieLoader";

addEventListener("load", async () => {
  await initializeMovieSection();
});
