import { ERROR } from '../constants';

export const Fetcher = {
  async get(endpoint, config = {}) {
    const { method, headers } = config;
    const response = await fetch(endpoint, {
      method,
      headers,
    });

    if (!response.ok) throw new Error(ERROR.HTTP(response.status));

    return await response.json();
  },
};
