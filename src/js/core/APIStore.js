import { Store } from './Store.js';

export class APIStore extends Store {
  static stores = new Map();

  /**
   * @param {any} initData
   * @param {string} key
   * @returns {APIStore}
   */
  static createStore(initData, key) {
    APIStore.stores.set(key, new APIStore(initData, key));
    return APIStore.stores.get(key);
  }

  state = {
    isLoading: true,
    isError: false,
    error: null,
    success: false,
    data: null,
  };

  constructor(initData, key) {
    super(initData, key);
    this.state.data = initData;
    this.key = key;
  }

  /**
   * 상태를 업데이트 합니다.
   * @param {function} fetchFunc
   */
  async refetch(fetchFunc) {
    try {
      const data = await fetchFunc();
      this.state.data = data;
      this.completeFetching();
    } catch (err) {
      this.occurError(err);
    }
  }

  async accumulateData(fetchFunc) {
    this.startFetching();
    try {
      const data = await fetchFunc();
      this.state.data.push(...data);
      this.completeFetching();
    } catch (err) {
      this.occurError(err);
    }
  }

  /**
   * 상태를 초기화합니다.
   */
  init() {
    this.state.isError = false;
    this.state.isLoading = false;
    this.state.success = false;
    this.state.error = null;
    this.notify();
  }

  /**
   * 상태를 요청 시작 상태로 설정합니다.
   */
  startFetching() {
    this.state.isError = false;
    this.state.isLoading = true;
    this.state.success = false;
    this.state.error = null;
    this.notify();
  }

  /**
   * 상태를 요청 성공 상태로 설정합니다.
   */
  completeFetching() {
    this.state.isError = false;
    this.state.isLoading = false;
    this.state.success = true;
    this.state.error = null;
    this.notify();
  }

  /**
   * 상태를 에러 발생 상태로 설정합니다.
   */
  occurError(err) {
    this.state.isError = true;
    this.state.isLoading = false;
    this.state.success = true;
    this.state.error = err;
    this.notify();
  }
}
