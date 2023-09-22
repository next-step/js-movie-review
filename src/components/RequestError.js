export default function ReqeustError({ $section }, errorMessage) {
  $section.innerHTML = "";

  const $errorContainer = document.createElement("div");
  $errorContainer.className = "error-container";

  $errorContainer.innerHTML = `
    <h1>${errorMessage}</h1>
    <button>재시도</button>
  `;

  $section.appendChild($errorContainer);
}
