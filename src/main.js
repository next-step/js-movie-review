import { App } from './app';
import { globalStore } from './stores';
import './styles/index.css';

console.log('npm run dev 명령어를 통해 영화 리뷰 미션을 시작하세요');

console.log(
  '%c' +
    ' _____ ______   ________  ___      ___ ___  _______                \n' +
    '|\\   _ \\  _   \\|\\   __  \\|\\  \\    /  /|\\  \\|\\  ___ \\               \n' +
    '\\ \\  \\\\\\__\\ \\  \\ \\  \\|\\  \\ \\  \\  /  / | \\  \\ \\   __/|              \n' +
    ' \\ \\  \\\\|__| \\  \\ \\  \\\\\\  \\ \\  \\/  / / \\ \\  \\ \\  \\_|/__            \n' +
    '  \\ \\  \\    \\ \\  \\ \\  \\\\\\  \\ \\    / /   \\ \\  \\ \\  \\_|\\ \\           \n' +
    '   \\ \\__\\    \\ \\__\\ \\_______\\ \\__/ /     \\ \\__\\ \\_______\\          \n' +
    '    \\|__|     \\|__|\\|_______|\\|__|/       \\|__|\\|_______|          \n' +
    '                                                                   \n' +
    '                                                                   \n' +
    '                                                                   \n' +
    ' ________  _______   ___      ___ ___  _______   ___       __      \n' +
    '|\\   __  \\|\\  ___ \\ |\\  \\    /  /|\\  \\|\\  ___ \\ |\\  \\     |\\  \\    \n' +
    '\\ \\  \\|\\  \\ \\   __/|\\ \\  \\  /  / | \\  \\ \\   __/|\\ \\  \\    \\ \\  \\   \n' +
    ' \\ \\   _  _\\ \\  \\_|/_\\ \\  \\/  / / \\ \\  \\ \\  \\_|/_\\ \\  \\  __\\ \\  \\  \n' +
    '  \\ \\  \\\\  \\\\ \\  \\_|\\ \\ \\    / /   \\ \\  \\ \\  \\_|\\ \\ \\  \\|\\__\\_\\  \\ \n' +
    '   \\ \\__\\\\ _\\\\ \\_______\\ \\__/ /     \\ \\__\\ \\_______\\ \\____________\\\n' +
    '    \\|__|\\|__|\\|_______|\\|__|/       \\|__|\\|_______|\\|____________|',
  'color: #d81b60; font-size: 14px; font-weight: bold;',
);

const render = () => {
  const app = document.querySelector('#app');

  if (app) {
    app.innerHTML = App();
  }
};

render();

globalStore.subscribe(render);
