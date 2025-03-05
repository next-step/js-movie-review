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

    const buttonHTML = `
    <button id="load-more-btn" class="primary">더보기</button>
    `;
    movieContainer.insertAdjacentHTML("afterend", buttonHTML);

    loadMoreBtn = document.getElementById("load-more-btn") as HTMLButtonElement;
    loadMoreBtn.addEventListener("click", onClick);
  }

  function remove(): void {
    if (loadMoreBtn) {
      loadMoreBtn.remove();
      loadMoreBtn = null;
    }
  }

  return { render, remove };
}
