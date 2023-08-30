/**
 * @typedef {Object} Route
 * @property {string} path
 * @property {() => void} view
 */

/**
 * @param {*} path
 * @param {*} component
 * @returns {Route}
 */

const Route = (path, component) => ({
  path,
  view: () => {
    component();
  },
});

export default Route;
