export function createLoadMoreButton(movieContainer, onClick) {
  const existingButton = document.getElementById("load-more-btn");
  if (existingButton) return;

  const loadMoreBtn = document.createElement("button");
  loadMoreBtn.id = "load-more-btn";
  loadMoreBtn.textContent = "더보기";
  loadMoreBtn.addEventListener("click", onClick);

  movieContainer.after(loadMoreBtn);
}

export function removeLoadMoreButton() {
  const loadMoreBtn = document.getElementById("load-more-btn");
  if (loadMoreBtn) loadMoreBtn.remove();
}
