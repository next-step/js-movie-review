export const toElement = ({ rootElementName = "div", domString }) => {
  const container = document.createDocumentFragment();
  const rootElement = document.createElement(rootElementName);
  container.appendChild(rootElement);

  const render = () => {
    rootElement.innerHTML = /* html */ domString;
  };

  // 초기 렌더
  render();

  return container;
};
