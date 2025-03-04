export function createLoadMoreButton(
  movieContainer: HTMLElement,
  onClick: (event: MouseEvent) => void
): void {
  const existingButton = document.getElementById("load-more-btn");
  if (existingButton) return;

  const loadMoreBtn: HTMLButtonElement = document.createElement("button");
  loadMoreBtn.id = "load-more-btn";
  loadMoreBtn.classList.add("primary");
  loadMoreBtn.textContent = "더보기";
  loadMoreBtn.addEventListener("click", onClick);

  movieContainer.after(loadMoreBtn);
}

export function removeLoadMoreButton(): void {
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) loadMoreBtn.remove();
}
