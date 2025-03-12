import {
  createLayout,
  updateLayoutContent,
} from "src/features/movies/ui/layout";

import { popularMovies } from "src/pages/popular-movies";
import { searchResults } from "src/pages/search-results";

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  const layout = createLayout({
    onSearch: async (query) => {
      const movieList = await searchResults({ query });
      updateLayoutContent(movieList);
    },
  });
  app.append(...layout);

  const movieList = await popularMovies();
  updateLayoutContent(movieList);
});
