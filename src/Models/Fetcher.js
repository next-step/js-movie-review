import { ERROR } from '../constants';

export class Fetcher {
  #data = null;
  #isLoading = false;

  async get(endpoint, config = {}) {
    const { method, headers } = config;
    this.#isLoading = true;

    const response = await fetch(endpoint, {
      method,
      headers,
    });

    if (!response.ok) throw new Error(ERROR.HTTP(response.status));

    this.#isLoading = false;

    return await response.json();
  }
}
