import { App } from "./components/App";

export function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = App().element;
}
