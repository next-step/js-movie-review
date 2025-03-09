import { resetSearchInput, setSearchInput, updateTabContainer } from "./ui";

export function getCurrentMode(query?: string): "search" | "category" {
  if (query) {
    updateTabContainer("search");
    setSearchInput(query);
    return "search";
  } else {
    updateTabContainer("category");
    resetSearchInput();
    return "category";
  }
}
