import { ERROR, EVENT } from '../constants';

export class Fetcher {
  isLoading = false;
  eventListener = new EventTarget();

  async get(endpoint, config = {}) {
    const { method, headers } = config;

    this.#setLoading(true);

    const response = await fetch(endpoint, {
      method,
      headers,
    });

    if (!response.ok) throw new Error(ERROR.HTTP(response.status));

    this.#setLoading(false);

    return await response.json();
  }

  #setLoading(loadingState) {
    this.isLoading = loadingState;
    this.eventListener.dispatchEvent(new Event(EVENT.LOADING_STATE_CHANGE));
  }
}
