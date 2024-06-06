import END_POINT from "../constants/api";

class Api {
  constructor() {
    this.baseUrl = process.env.API_URL;
    this.apiKey = process.env.API_ACCESS_TOKEN;
  }

  async get(endPoint) {
    const response = await fetch(this.baseUrl + endPoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error();
    }

    return await response.json();
  }

  async getMovies(page) {
    return await this.get(END_POINT.POPULAR_MOVIES(page));
  }
}

export default Api;
