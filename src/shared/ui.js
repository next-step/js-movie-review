export const toElement = (htmlString) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString.trim();
  return div.firstChild; // 첫 번째 자식 요소 반환
};
