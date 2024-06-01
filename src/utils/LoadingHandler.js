export class LoadingHandler {
  #loading;
  constructor(initialValue) {
    this.#loading = initialValue;
  }

  start() {
    this.#loading = true;
  }

  end() {
    this.#loading = false;
  }

  isLoading() {
    return this.#loading;
  }
}
