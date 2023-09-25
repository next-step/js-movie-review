/**
 * @param {num} el
 * @param {Node []} children
 * @returns {Element}
 */
export const $createElement = (tagName, children) => {
  const $element = document.createElement(tagName);

  if (children) $element.innerHTML = children;

  return $element;
};
