import { App } from "./components/App";
import { createComponent } from "./createComponent";

export async function render() {
  const $app = document.querySelector("#app");

  const app = await createComponent(App);

  $app.innerHTML = app.element;
  app.bindEvents();
}
