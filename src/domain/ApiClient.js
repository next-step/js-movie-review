export class ApiClient {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async get(endpoint, options) {
    return await fetch.get(`${this.#baseUrl}/${endpoint}`, options);
  }
}
