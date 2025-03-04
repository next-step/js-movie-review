export const LoadMoreButton = (isVisible) => {
  if (!isVisible) return "";

  return /* html */ `
    <button class="primary" id="load-more-button">
        더 보기
    </button>
    `;
};
