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

    const hashQuery = url.hash.includes("?") ? url.hash.split("?")[1] : "";
    const hashParams = new URLSearchParams(hashQuery);

    const value = hashParams.get(this.getNamespacedKey(key));
    return value ? decodeURIComponent(value) : null;
  }

  setParams(params: Record<string, string>) {
    const url = new URL(window.location.href);
    const [hashPath, hashQuery] = url.hash.split("?");
    const hashParams = new URLSearchParams(hashQuery || "");

    Object.entries(params).forEach(([key, value]) => {
      const namespacedKey = this.getNamespacedKey(key);
      if (value) {
        hashParams.set(namespacedKey, value);
      }
    });

    url.hash = hashPath + "?" + hashParams.toString();
    window.history.replaceState({}, "", url);
  }
}
