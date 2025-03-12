import { createLayout, updateLayoutContent } from "src/pages/layout";

import { popularMovies } from "src/pages/popular-movies";
import { searchResults } from "src/pages/search-results";

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  const layout = createLayout({
    onSearch: async () => {
      const searchList = await searchResults();
      updateLayoutContent(searchList);
    },
  });
  app.append(...layout);

  const movieList = await popularMovies();
  updateLayoutContent(movieList);
});
