export default class AbstractParamsManager {
  namespace;

  constructor(namespace) {
    this.namespace = namespace;
  }

  getNamespacedKey(key) {
    return `${this.namespace}_${key}`;
  }

  getParam(key) {
    const url = new URL(window.location.href);
    return url.searchParams.get(this.getNamespacedKey(key));
  }

  setParams(params) {
    const url = new URL(window.location.href);

    Object.entries(params).forEach(([key, value]) => {
      const namespacedKey = this.getNamespacedKey(key);

      if (value) {
        url.searchParams.set(namespacedKey, value);
      }
    });

    window.history.pushState({}, "", url);
  }
}
