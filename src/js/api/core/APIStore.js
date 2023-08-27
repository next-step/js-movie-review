class APIStore {
  state = {
    isLoading: true,
    isError: false,
    success: false,
    data: null,
  };

  key;

  observers = new Set();

  constructor(initData, key) {
    this.state.data = initData;
    this.key = key;
  }

  async setData(fetchFunc) {
    try {
      const data = await fetchFunc();
      this.state.data = data;
      this.completeFetching();
    } catch (err) {
      this.occurError();
    }
  }

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

  notify() {
    this.observers.forEach((observer) => {
      observer.setState({
        [this.key]: this.state,
      });
    });
  }

  init() {
    this.state.isError = false;
    this.state.isLoading = false;
    this.state.success = false;
    this.notify();
  }

  startFetching() {
    this.state.isError = false;
    this.state.isLoading = true;
    this.state.success = false;
    this.notify();
  }

  completeFetching() {
    this.state.isError = false;
    this.state.isLoading = false;
    this.state.success = true;
    this.notify();
  }

  occurError() {
    this.state.isError = true;
    this.state.isLoading = false;
    this.state.success = true;
    this.notify();
  }

  subscribe(observer) {
    this.observers.add(observer);
    const globalState = {
      [this.key]: this.state,
    };
    observer.setState(globalState);
  }

  unsubscribe(observer) {
    this.observers.delete(observer);
    Object.keys(this.state).forEach((key) => {
      delete observer.$state[key];
    });
  }

  resetSubscribe() {
    this.observers.forEach((observer) => {
      this.unsubscribe(observer);
    });
    this.observers.clear();
  }
}

export default APIStore;
