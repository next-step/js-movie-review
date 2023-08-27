class App {
  #data;

  constructor() {
    this.#initial();
  }

  async #initial() {
    this.#data = await this.#getMovies();
  }

  async #getMovies() {
    const url =
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const headers = {
      Authorization: `Bearer ${process.env.MOVIE_API_KEY}`,
      accept: 'application/json',
    };

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (!response.ok)
        throw new Error(`HTTP Error | Status ${response.status}`);

      this.#data = await response.json();
    } catch (error) {
      console.error(error.message);
    }
  }
}

const app = new App();
