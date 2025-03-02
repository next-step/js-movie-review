export const Box = () => {
  const container = document.createDocumentFragment();
  const div = document.createElement("div");
  //   header.addEventListener("click", handleClick);
  // header.innerHTML = headerState.value;
  container.appendChild(div);

  const render = () => {
    div.innerHTML = /* html */ `BOX`;
  };

  // 초기 렌더
  render();

  return container;
};
