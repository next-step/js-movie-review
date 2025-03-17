import { AppFooter } from "./layout/AppFooter";
import { AppHeader } from "./layout/AppHeader";
import { AppMain } from "./layout/AppMain";
import Renderer from "./shared/renderer";
// import { state } from "./shared/state";
import { toElement } from "./shared/ui";

export const renderer = new Renderer();

window.addEventListener("load", () => {
  const app = document.querySelector("#app");

  // const { value: inputState, subscribe: inputStateSubscribe } = state("");
  
  
  // ${AppHeader({
  //   inputState,
  // }).outerHTML}
  const AppHeaderComponent = renderer.add(AppHeader({
    // inputState,
  }));

  if (app) {
    app.innerHTML = `
        ${AppHeaderComponent}
        `
    }
  });
  
  // ${AppMain({
  //   inputState,
  //   inputStateSubscribe,
  // }).outerHTML}
  // ${AppFooter().outerHTML}

  // ${AppMain({
  //   inputState,
  //   inputStateSubscribe,
  // })}
  // ${AppFooter()}