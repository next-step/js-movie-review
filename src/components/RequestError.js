export default function ReqeustError({ $target }, errorMessage) {
  const $errorContainer = document.createElement("div");
  $errorContainer.textContent = `${errorMessage}`;

  $target.appendChild($errorContainer);
}
