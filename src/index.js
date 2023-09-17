import { MovieController } from './Models';

class App {
  #movieController;

  constructor() {
    this.#movieController = new MovieController();
  }
}

const app = new App();
