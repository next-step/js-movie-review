export class ApiClient {
  #baseUrl;

  constructor(baseUrl) {
    this.#baseUrl = baseUrl;
  }

  async get(endpoint, options) {
    try {
      const response = await fetch(`${this.#baseUrl}/${endpoint}`, options);
      return await response.json();
    } catch (error) {
      // FIXME: 네트워크 요청 실패에 대한 적절한 에러처리 필요
      console.log('적절한 에러 처리 필요');
    }
  }
}
