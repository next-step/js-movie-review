import './styles/index.css';
import logo from './assets/logo.png';
import { MovieController } from './Controller/MovieController';

class App {
  #movieController;

  constructor() {
    this.#movieController = new MovieController();
  }
}

const app = new App();

document.querySelector("img[src='./src/assets/logo.png']").src = logo;
