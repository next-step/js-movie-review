import { resetSearchInput, setSearchInput, updateTabContainer } from "./ui";

export const getCurrentMode = (query?: string): "search" | "category" => {
  if (query) {
    updateTabContainer("search");
    setSearchInput(query);
    return "search";
  } else {
    updateTabContainer("category");
    resetSearchInput();
    return "category";
  }
};
