export const $ = (selector, parent = document) =>
  parent.querySelector(selector);

export const $all = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];

export const createElement = (tagName) => {
  const element = document.createElement(tagName);
  return element;
};
