import { state } from "../shared/state";

export const AppHeader = () => {
  const { value: headerState, subscribe } = state(true);

  const handleClick = () => {
    headerState.value = !headerState.value;
  };

  const container = document.createDocumentFragment();
  const header = document.createElement("header");
  header.addEventListener("click", handleClick);
  // header.innerHTML = headerState.value;
  container.appendChild(header);

  const render = () => {
    header.innerHTML = headerState.value;
  };

  // 초기 렌더
  render();

  // value내 값이 변할 떄, render를 다시!
  subscribe(() => {
    // console.log(`🔔 Observer 패턴: ${key} 변경됨 -> ${value}`);
    render();
  });

  return container;
};
