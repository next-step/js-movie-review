import { refreshIcon } from "src/shared/icons/refreshIcon";

const createFallbackButton = (onRetry) => {
  const fallbackButton = document.createElement("button");
  fallbackButton.classList.add("fallback-button");

  fallbackButton.appendChild(refreshIcon(40, 40));

  fallbackButton.addEventListener("click", onRetry);

  return fallbackButton;
};

const createFallbackMessage = (message) => {
  const fallbackMessage = document.createElement("p");
  fallbackMessage.classList.add("fallback-message");
  fallbackMessage.textContent = message;
  return fallbackMessage;
};

const createFallbackContainer = () => {
  const fallbackContainer = document.createElement("div");
  fallbackContainer.classList.add("fallback");
  return fallbackContainer;
};

export const createFallback = ({
  onRetry,
  message = "데이터를 불러오는데 실패했습니다.",
}) => {
  const fallback = createFallbackContainer();
  const fallbackButton = createFallbackButton(onRetry);
  const fallbackMessage = createFallbackMessage(message);

  fallback.append(fallbackButton, fallbackMessage);

  return fallback;
};

export const createFallbackView = ({ onRetry, message }) => {
  const existingFallback = document.querySelector(".fallback");

  if (existingFallback) {
    existingFallback.remove();
  }

  const fallback = createFallback({ onRetry, message });
  return fallback;
};
