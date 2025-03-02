export function showErrorUI(container, message) {
  const targetContainer =
    typeof container === "string"
      ? document.getElementById(container)
      : container;

  if (!targetContainer) {
    console.error(`'${container}' 요소를 찾을 수 없음`);
    return;
  }

  targetContainer.innerHTML = `<p class="error-message">${message}</p>`;
  targetContainer.style.display = "block";
}
