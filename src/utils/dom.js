export const $ = (selector, parent = document) =>
  parent.querySelector(selector);

export const $all = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];

export const createElement = (tagName) => {
  const element = document.createElement(tagName);
  return element;
};

export const removeElements = (parent, selectors) => {
  const filtered = Array.from(parent.children).filter((child) => {
    return !child.matches(selectors);
  });

  parent.innerHTML = "";
  parent.append(...filtered);
};
