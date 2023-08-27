class APIStore {
  state = {
    isLoading: true,
    isError: false,
    success: false,
    data: null,
  };

  key;

  observers = new Set();

  /**
   * 초기 데이터와 전역 상태 키를 입력합니다.
   * @param {any} initData
   * @param {string} key
   */
  constructor(initData, key) {
    this.state.data = initData;
    this.key = key;
    this.init();
  }

  /**
   * 상태를 업데이트 합니다.
   * @param {function} fetchFunc
   */
  async setData(fetchFunc) {
    try {
      const data = await fetchFunc();
      this.state.data = data;
      this.completeFetching();
    } catch (err) {
      this.occurError();
    }
  }

  /**
   * 상태를 누적하여 업데이트 합니다.
   * @param {function} fetchFunc
   */
  async accumulateData(fetchFunc) {
    this.startFetching();
    try {
      const data = await fetchFunc();
      this.state.data.push(...data);
      this.completeFetching();
    } catch (err) {
      this.occurError();
    }
  }

  /**
   * 구독된 옵저버들에게 상태 변화를 알립니다.
   */
  notify() {
    this.observers.forEach((observer) => {
      observer.setState({
        [this.key]: this.state,
      });
    });
  }

  /**
   * 상태를 초기화합니다.
   */
  init() {
    this.state.isError = false;
    this.state.isLoading = false;
    this.state.success = false;
    this.notify();
  }

  /**
   * 상태를 요청 시작 상태로 설정합니다.
   */
  startFetching() {
    this.state.isError = false;
    this.state.isLoading = true;
    this.state.success = false;
    this.notify();
  }

  /**
   * 상태를 요청 성공 상태로 설정합니다.
   */
  completeFetching() {
    this.state.isError = false;
    this.state.isLoading = false;
    this.state.success = true;
    this.notify();
  }

  /**
   * 상태를 에러 발생 상태로 설정합니다.
   */
  occurError() {
    this.state.isError = true;
    this.state.isLoading = false;
    this.state.success = true;
    this.notify();
  }

  /**
   * 옵저버를 추가합니다.
   * @param {object} observer
   */
  subscribe(observer) {
    this.observers.add(observer);
    const globalState = {
      [this.key]: this.state,
    };
    observer.setState(globalState);
  }

  /**
   * 옵저버를 제거합니다.
   * @param {object} observer
   */
  unsubscribe(observer) {
    this.observers.delete(observer);
    Object.keys(this.state).forEach((key) => {
      delete observer.$state[key];
    });
  }

  /**
   * 옵저버를 초기화합니다.
   */
  resetSubscribe() {
    this.observers.forEach((observer) => {
      this.unsubscribe(observer);
    });
    this.observers.clear();
  }
}

export default APIStore;
