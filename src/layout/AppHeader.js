import { state } from "../shared/state";

export const AppHeader = () => {
  const headerState = state(true);

  const handleClick = () => {
    headerState.value = 2;
  };

  const container = document.createDocumentFragment();
  const header = document.createElement("header");
  header.addEventListener("click", handleClick);
  header.innerHTML = headerState.value;
  container.appendChild(header);

  return container;
};
