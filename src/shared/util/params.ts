export default class AbstractParamsManager {
  namespace;

  constructor(namespace: string) {
    this.namespace = namespace;
  }

  getNamespacedKey(key: string) {
    return `${this.namespace}_${key}`;
  }

  getParam(key: string) {
    const url = new URL(window.location.href);
    return url.searchParams.get(this.getNamespacedKey(key));
  }

  setParams(params: Record<string, string>) {
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
