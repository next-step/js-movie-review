import { state } from "../shared/state";
import { Box } from "../widget/Box";

export const AppMain = () => {
  const { value: mainState, subscribe } = state(true);

  const handleClick = () => {
    mainState.value = !mainState.value;
  };

  const container = document.createDocumentFragment();
  const div = document.createElement("div");
  div.addEventListener("click", handleClick);
  // header.innerHTML = headerState.value;
  container.appendChild(div);

  const render = () => {
    div.innerHTML = /* html */ `${mainState.value}`;
    div.appendChild(Box());
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
