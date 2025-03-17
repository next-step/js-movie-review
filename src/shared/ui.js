export const toElement = (domString) => {

  const container = document.createDocumentFragment();
  const div = document.createElement('div');

  const render = () => {
    div.innerHTML = /* html */ domString;
  };

  // 초기 렌더
  render();

  container.appendChild(div)

  return container.firstChild;
};
