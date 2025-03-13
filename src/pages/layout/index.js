import { createHeader, addTopBar } from "src/shared/ui/header";
import { createSearchBar } from "src/shared/ui/search-bar";
import { createFooter } from "src/shared/ui/footer";

import { searchParamsManager } from "src/features/search/models/params";

export const createLayout = ({ onSearch }) => {
  const header = createHeader({ title: "인사이드 아웃2", rate: 9.5 });

  const searchBar = createSearchBar({
    onSubmit: (event) => {
      onSearch();
      const query = event.target.querySelector("input").value;
      searchParamsManager.setKeyword(query);
    },
  });

  addTopBar(header, searchBar);

  const content = document.createElement("div");
  content.classList.add("layout-content");

  const footer = createFooter();

  return [header, content, footer];
};

export const updateLayoutContent = (page) => {
  const content = document.querySelector(".layout-content");
  content.replaceChildren();
  content.append(page);
};
