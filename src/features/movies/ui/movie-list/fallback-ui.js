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

export const createFallbackView = (
  message = "데이터를 불러오지 못했습니다. 다시 시도해 주세요."
) => {
  const fallback = createFallbackContainer();
  const fallbackMessage = createFallbackMessage(message);

  fallback.append(fallbackMessage);

  return fallback;
};

export const hiddenFallbackView = () => {
  const fallback = document.querySelector(".fallback");
  fallback?.remove();
};
