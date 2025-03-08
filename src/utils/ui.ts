import { Header } from "../components/Header";
import { LoadMoreButton } from "../components/LoadMoreButton";
import { IMovieService } from "../types/type";

export function updateTabContainer(mode: "category" | "search"): void {
  const tabContainer = document.getElementById("tab-container");
  if (!tabContainer) return;
  tabContainer.style.display = mode === "search" ? "none" : "block";
}

export function resetSearchInput(): void {
  const inputEl = document.querySelector(
    ".search-input"
  ) as HTMLInputElement | null;
  if (inputEl) {
    inputEl.value = "";
  }
}

export function setSearchInput(query: string) {
  const inputEl = document.querySelector(
    ".search-input"
  ) as HTMLInputElement | null;
  if (inputEl) {
    inputEl.value = query;
  }
}

export interface LoadMoreOptions {
  hasMore: boolean;
  movieContainer: HTMLElement;
  renderNextBatch: () => void;
  loadMoreButtonComponent: ReturnType<typeof LoadMoreButton> | null;
}

export function addLoadMoreButton({
  hasMore,
  movieContainer,
  renderNextBatch,
  loadMoreButtonComponent,
}: LoadMoreOptions): ReturnType<typeof LoadMoreButton> | null {
  if (loadMoreButtonComponent) {
    return null;
  }

  if (hasMore) {
    loadMoreButtonComponent = LoadMoreButton(movieContainer, renderNextBatch);
    loadMoreButtonComponent.render();
  }

  return loadMoreButtonComponent;
}

export function updateHeader(service: IMovieService) {
  const firstMovie = service.getFirstMovie();
  if (firstMovie) {
    Header()?.update({
      title: firstMovie.title,
      rating: firstMovie.getFormattedVote(),
      backdrop: firstMovie.getBackdropUrl(),
    });
  }
}
