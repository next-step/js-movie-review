export function LoadMoreButton(movieContainer, onClick) {
  if (!movieContainer) {
    console.error("영화 컨테이너를 찾을 수 없습니다.");
    return null;
  }

  let buttonElement = null;

  function render() {
    if (buttonElement) return buttonElement;

    buttonElement = document.createElement("button");
    buttonElement.id = "load-more-btn";
    buttonElement.classList.add("primary");
    buttonElement.textContent = "더보기";
    buttonElement.addEventListener("click", onClick);

    movieContainer.after(buttonElement);
    return buttonElement;
  }

  function remove() {
    if (buttonElement) {
      buttonElement.remove();
      buttonElement = null;
    }
  }

  return { render, remove };
}
