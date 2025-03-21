import { createSvgIcon } from "./lib";

const searchIconTemplate = (width = 24, height = 24) => {
  return /*html*/ `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${width}" height="${height}">
    <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2"></circle>
    <line x1="15.5" y1="15.5" x2="21" y2="21" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
  </svg>
`;
};

export const searchIcon = (width, height) =>
  createSvgIcon(searchIconTemplate(width, height));
