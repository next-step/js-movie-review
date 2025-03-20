export default class URLParamsManager {
  paramsStore;

  constructor(paramsStore: string) {
    this.paramsStore = paramsStore;
  }

  getParamsStoreKey(key: string) {
    return `${this.paramsStore}_${key}`;
  }

  getParam(key: string) {
    const url = new URL(window.location.href);

    const hashQuery = url.hash.includes("?") ? url.hash.split("?")[1] : "";
    const hashParams = new URLSearchParams(hashQuery);

    const value = hashParams.get(this.getParamsStoreKey(key));
    return value ? decodeURIComponent(value) : null;
  }

  setParams(params: Record<string, string>) {
    const url = new URL(window.location.href);
    const [hashPath, hashQuery] = url.hash.split("?");
    const hashParams = new URLSearchParams(hashQuery || "");

    Object.entries(params).forEach(([key, value]) => {
      const paramsStoreKey = this.getParamsStoreKey(key);
      if (value) {
        hashParams.set(paramsStoreKey, value);
      }
    });

    url.hash = hashPath + "?" + hashParams.toString();
    window.history.replaceState({}, "", url);
  }
}
