import { createLayout, updateLayoutContent } from "src/pages/layout";

import { matchRoute, navigate } from "src/shared/util/route";

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  const layout = createLayout({
    onSearch: async () => {
      const page = await navigate("/search");
      updateLayoutContent(page);
    },
  });

  app.append(...layout);

  const page = await matchRoute();
  updateLayoutContent(page);
});
