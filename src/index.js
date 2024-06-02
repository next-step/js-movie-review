import MovieController from "./controller/movieController.js";
import layout from "./components/layout.js";

addEventListener("DOMContentLoaded", async () => {
  layout();

  new MovieController();
});
