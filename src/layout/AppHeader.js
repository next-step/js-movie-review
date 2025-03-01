import { state } from "../shared/state";

export const AppHeader = () => {
  const headerState = state(true);

  const handleClick = () => {
    headerState.value = 2;
  };

  const render = () => {
    const container = document.createDocumentFragment();
    const header = document.createElement("header");
    header.addEventListener("click", handleClick);
    header.dataset.data = headerState.value;
    container.appendChild(header);
    return container;
  };

  return render();
};
