/**
 * 선택자에 맞는 DOM을 반환합니다.
 * @param {string} selector
 * @returns {Element | null}
 */
export const $ = (selector) => document.querySelector(selector);

/**
 * 선택자에 맞는 DOM을 모두 반환합니다.
 * @param {string} selector
 * @returns {Element[] | []}
 */
export const $All = (selector) => Array.from(document.querySelectorAll(selector));
