import { MovieController } from './Models';

class App {
  #data;
  #movieController;

  constructor() {
    this.#movieController = new MovieController();
    this.#initial();
  }

  async #initial() {
    this.#data = await this.#movieController.getAllMovies();

    console.log(this.#data);
  }
}

const app = new App();
