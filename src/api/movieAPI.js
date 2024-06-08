class MovieAPI {
  #apiToken;
  #url;
  constructor() {
    this.#url = process.env.TDMB_URL;
    this.#apiToken = process.env.TDMB_AUTH_TOKEN;
  }
  async getMovies(pageNo) {
    const response = await fetch(`${this.#url + pageNo}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${this.#apiToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("다시 시도해주세요.");
    }

    return await response.json();
  }
}

export default MovieAPI;
