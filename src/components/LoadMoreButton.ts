export function LoadMoreButton(
  movieContainer: HTMLElement,
  onClick: (event: MouseEvent) => void
) {
  let loadMoreBtn: HTMLButtonElement | null = null;

  function render(): void {
    const existingButton = document.getElementById("load-more-btn");
    if (existingButton) {
      existingButton.remove();
    }

    loadMoreBtn = document.createElement("button");
    loadMoreBtn.id = "load-more-btn";
    loadMoreBtn.classList.add("primary");
    loadMoreBtn.textContent = "더보기";
    loadMoreBtn.addEventListener("click", onClick);
    movieContainer.after(loadMoreBtn);
  }

  function remove(): void {
    if (loadMoreBtn) {
      loadMoreBtn.remove();
      loadMoreBtn = null;
    }
  }

  return { render, remove };
}
