import { Header } from "../components/Header";
import { TAB_ITEMS } from "../constants";
import { IMovieService } from "../types/type";

export const updateTabContainer = (mode: "category" | "search"): void => {
  const tabContainer = document.getElementById("tab-container");
  if (!tabContainer) return;
  tabContainer.style.display = mode === "search" ? "none" : "block";
};

export const resetSearchInput = (): void => {
  const inputEl = document.querySelector(
    ".search-input"
  ) as HTMLInputElement | null;
  if (inputEl) inputEl.value = "";
};

export const setSearchInput = (query: string): void => {
  const inputEl = document.querySelector(
    ".search-input"
  ) as HTMLInputElement | null;
  if (inputEl) inputEl.value = query;
};

export const updateHeader = (service: IMovieService): void => {
  const firstMovie = service.getFirstMovie();
  if (firstMovie) {
    Header()?.update({
      title: firstMovie.title,
      rating: firstMovie.getFormattedVote(),
      backdrop: firstMovie.getBackdropUrl(),
    });
  }
};

export function updateSectionTitle(
  mode: "search" | "category",
  queryOrCategory?: string
): void {
  const headerTitleEl = document.querySelector(".section-title");
  if (!headerTitleEl) return;

  if (mode === "search") {
    headerTitleEl.textContent =
      queryOrCategory && queryOrCategory.trim()
        ? `${queryOrCategory} 검색 결과`
        : "검색 결과";
  } else {
    const category = queryOrCategory as string | undefined;
    const tabItem = TAB_ITEMS.find((item) => item.category === category);
    const label = tabItem ? tabItem.label : "영화";
    headerTitleEl.textContent = `${label} 영화`;
  }
}
